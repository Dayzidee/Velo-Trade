import { useState, useEffect, useRef } from 'react';

export interface Candle {
  time: number; // seconds for lightweight-charts
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface TickerData {
  currentPrice: number;
  priceChange24h: number;
  priceChangePercent24h: number;
  high24h: number;
  low24h: number;
  volume24h: number;
}

export interface MarketData {
  candles: Candle[];
  ticker: TickerData;
  isConnected: boolean;
}

// Map Binance symbols to KuCoin (BTCUSDT -> BTC-USDT)
const toKuCoinSymbol = (s: string) => {
  if (s === 'BTCUSDT') return 'BTC-USDT';
  if (s === 'ETHUSDT') return 'ETH-USDT';
  if (s.endsWith('USDT')) return s.replace('USDT', '-USDT');
  return s;
};

function generateMockCandles(basePrice: number): Candle[] {
  const candles: Candle[] = [];
  const now = Math.floor(Date.now() / 1000);
  let lastClose = basePrice;
  
  for (let i = 0; i < 150; i++) {
    const time = now - (150 - i) * 60;
    const change = (Math.random() - 0.5) * (basePrice * 0.002);
    const open = lastClose;
    const close = open + change;
    const high = Math.max(open, close) + Math.random() * (basePrice * 0.001);
    const low = Math.min(open, close) - Math.random() * (basePrice * 0.001);
    const volume = Math.random() * 1000 + 500;
    
    candles.push({ time, open, high, low, close, volume });
    lastClose = close;
  }
  return candles;
}

export function useMarketData(symbol: string = 'BTCUSDT'): MarketData {
  const [candles, setCandles] = useState<Candle[]>([]);
  const [ticker, setTicker] = useState<TickerData>({
    currentPrice: 0,
    priceChange24h: 0,
    priceChangePercent24h: 0,
    high24h: 0,
    low24h: 0,
    volume24h: 0,
  });
  const [isConnected, setIsConnected] = useState(false);

  const wsRef = useRef<WebSocket | null>(null);
  const mockIntervalRef = useRef<any>(null);

  const isBinanceAsset = (s: string) => {
    return s.endsWith('USDT') || s.endsWith('BTC') || s.endsWith('ETH');
  };

  useEffect(() => {
    let cancelled = false;
    let disposed = false;
    
    // Cleanup previous
    if (wsRef.current) wsRef.current.close();
    if (mockIntervalRef.current) clearInterval(mockIntervalRef.current);
    setCandles([]);
    setTicker(prev => ({ ...prev, currentPrice: 0 }));
    setIsConnected(false);

    const isSimulation = !isBinanceAsset(symbol);

    const startSimulation = (initialPrice: number) => {
      if (mockIntervalRef.current) clearInterval(mockIntervalRef.current);
      
      const initial = generateMockCandles(initialPrice);
      setCandles(initial);
      setTicker(t => ({
        ...t,
        currentPrice: initial[initial.length - 1].close,
        priceChange24h: (Math.random() - 0.5) * (initialPrice * 0.02),
        priceChangePercent24h: (Math.random() - 0.5) * 2,
        high24h: initialPrice * 1.05,
        low24h: initialPrice * 0.95,
        volume24h: 1250000
      }));
      setIsConnected(true);

      mockIntervalRef.current = setInterval(() => {
        setCandles(prev => {
          if (prev.length === 0) return prev;
          const last = prev[prev.length - 1];
          const now = Math.floor(Date.now() / 1000);
          
          if (now >= last.time + 60) {
            const newCandle = {
              time: last.time + 60,
              open: last.close,
              high: last.close,
              low: last.close,
              close: last.close,
              volume: Math.random() * 1000 + 500
            };
            return [...prev.slice(1), newCandle];
          } else {
            const change = (Math.random() - 0.5) * (last.close * 0.0005);
            const newClose = last.close + change;
            const updated = {
              ...last,
              close: newClose,
              high: Math.max(last.high, newClose),
              low: Math.min(last.low, newClose)
            };
            setTicker(t => ({ ...t, currentPrice: newClose }));
            return [...prev.slice(0, -1), updated];
          }
        });
      }, 2000);
    };

    if (isSimulation) {
      const basePrices: Record<string, number> = {
        'EURUSD': 1.0891,
        'GBPUSD': 1.2734,
        'USDJPY': 151.42,
        'AAPL': 178.72,
        'TSLA': 245.30
      };
      startSimulation(basePrices[symbol] || 100);
      return () => {
        disposed = true;
        clearInterval(mockIntervalRef.current);
      };
    }

    // KuCoin Implementation
    const kucoinSymbol = toKuCoinSymbol(symbol);
    
    async function initKuCoin() {
      try {
        // 1. Fetch History
        const histRes = await fetch(`https://api.kucoin.com/api/v1/market/candles?symbol=${kucoinSymbol}&type=1min`);
        const histData = await histRes.json();
        if (histData.code === '200000' && !cancelled) {
          const raw = histData.data.reverse();
          const parsed = raw.map((r: any) => ({
            time: parseInt(r[0]),
            open: parseFloat(r[1]),
            close: parseFloat(r[2]),
            high: parseFloat(r[3]),
            low: parseFloat(r[4]),
            volume: parseFloat(r[5])
          }));
          setCandles(parsed);
          setTicker(t => ({ ...t, currentPrice: parsed[parsed.length - 1].close }));
        }

        // 2. Fetch Ticker for 24h stats
        const tickerRes = await fetch(`https://api.kucoin.com/api/v1/market/stats?symbol=${kucoinSymbol}`);
        const tData = await tickerRes.json();
        if (tData.code === '200000' && !cancelled) {
          const s = tData.data;
          setTicker({
            currentPrice: parseFloat(s.last),
            priceChange24h: parseFloat(s.changePrice),
            priceChangePercent24h: parseFloat(s.changeRate) * 100,
            high24h: parseFloat(s.high),
            low24h: parseFloat(s.low),
            volume24h: parseFloat(s.vol)
          });
        }

        // 3. Connect WebSocket
        const tokenRes = await fetch('https://api.kucoin.com/api/v1/bullet-public', { method: 'POST' });
        const tokenData = await tokenRes.json();
        if (tokenData.code === '200000' && !disposed) {
          const { token, instanceServers } = tokenData.data;
          const endpoint = instanceServers[0].endpoint;
          const ws = new WebSocket(`${endpoint}?token=${token}`);
          wsRef.current = ws;

          ws.onopen = () => {
            setIsConnected(true);
            ws.send(JSON.stringify({
              id: Date.now(),
              type: 'subscribe',
              topic: `/market/ticker:${kucoinSymbol}`,
              privateChannel: false,
              response: true
            }));
            ws.send(JSON.stringify({
              id: Date.now() + 1,
              type: 'subscribe',
              topic: `/market/candles:${kucoinSymbol}_1min`,
              privateChannel: false,
              response: true
            }));
          };

          ws.onmessage = (event) => {
            const msg = JSON.parse(event.data);
            if (msg.subject === 'ticker') {
              const d = msg.data;
              setTicker(prev => ({
                ...prev,
                currentPrice: parseFloat(d.price),
              }));
            } else if (msg.subject === 'trade.candles.update') {
              const k = msg.data.candles;
              const candle: Candle = {
                time: parseInt(k[0]),
                open: parseFloat(k[1]),
                close: parseFloat(k[2]),
                high: parseFloat(k[3]),
                low: parseFloat(k[4]),
                volume: parseFloat(k[5])
              };
              setCandles(prev => {
                const updated = [...prev];
                const last = updated[updated.length - 1];
                if (last && last.time === candle.time) {
                  updated[updated.length - 1] = candle;
                } else {
                  updated.push(candle);
                  if (updated.length > 300) updated.shift();
                }
                return updated;
              });
            }
          };

          ws.onclose = () => {
            setIsConnected(false);
            if (!disposed) setTimeout(initKuCoin, 3000);
          };
        } else {
           // Token fetch failed, fallback
           startSimulation(symbol === 'BTCUSDT' ? 67000 : 3500);
        }
      } catch (err) {
        console.error('[useMarketData] KuCoin Init Failed:', err);
        if (!cancelled) {
           startSimulation(symbol === 'BTCUSDT' ? 67000 : 3500);
        }
      }
    }

    initKuCoin();

    return () => {
      cancelled = true;
      disposed = true;
      if (wsRef.current) wsRef.current.close();
      if (mockIntervalRef.current) clearInterval(mockIntervalRef.current);
    };
  }, [symbol]);

  return { candles, ticker, isConnected };
}

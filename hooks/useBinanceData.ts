import { useState, useEffect, useRef } from 'react';

export interface Candle {
  time: number;
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

export interface BinanceData {
  candles: Candle[];
  ticker: TickerData;
  isConnected: boolean;
}

const SYMBOL = 'btcusdt';
const REST_URL = `https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1m&limit=100`;
const WS_KLINE_URL = `wss://stream.binance.com:9443/ws/${SYMBOL}@kline_1m`;
const WS_TICKER_URL = `wss://stream.binance.com:9443/ws/${SYMBOL}@ticker`;

function parseRestCandle(raw: (string | number)[]): Candle {
  return {
    time: Number(raw[0]),
    open: parseFloat(String(raw[1])),
    high: parseFloat(String(raw[2])),
    low: parseFloat(String(raw[3])),
    close: parseFloat(String(raw[4])),
    volume: parseFloat(String(raw[5])),
  };
}

export function useBinanceData(): BinanceData {
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

  const klineWsRef = useRef<WebSocket | null>(null);
  const tickerWsRef = useRef<WebSocket | null>(null);

  // Fetch historical candles on mount
  useEffect(() => {
    let cancelled = false;
    async function fetchHistory() {
      try {
        const res = await fetch(REST_URL);
        if (!res.ok) return;
        const data = await res.json();
        if (!cancelled) {
          setCandles(data.map(parseRestCandle));
        }
      } catch {
        // Silently fail — WebSocket will fill in data
      }
    }
    fetchHistory();
    return () => { cancelled = true; };
  }, []);

  // Kline WebSocket with reconnection
  useEffect(() => {
    let reconnectTimer: ReturnType<typeof setTimeout> | null = null;
    let disposed = false;

    function connect() {
      if (disposed) return;
      const ws = new WebSocket(WS_KLINE_URL);
      klineWsRef.current = ws;

      ws.onopen = () => setIsConnected(true);

      ws.onmessage = (event) => {
        try {
          const msg = JSON.parse(event.data);
          const k = msg.k;
          if (!k) return;

          const candle: Candle = {
            time: k.t,
            open: parseFloat(k.o),
            high: parseFloat(k.h),
            low: parseFloat(k.l),
            close: parseFloat(k.c),
            volume: parseFloat(k.v),
          };

          setCandles(prev => {
            if (prev.length === 0) return [candle];
            const updated = [...prev];
            const lastIdx = updated.length - 1;

            if (updated[lastIdx].time === candle.time) {
              updated[lastIdx] = candle;
            } else {
              updated.push(candle);
              if (updated.length > 200) updated.shift();
            }
            return updated;
          });
        } catch {
          // Ignore parse errors
        }
      };

      ws.onclose = () => {
        setIsConnected(false);
        if (!disposed) {
          reconnectTimer = setTimeout(connect, 3000);
        }
      };

      ws.onerror = () => ws.close();
    }

    connect();

    return () => {
      disposed = true;
      if (reconnectTimer) clearTimeout(reconnectTimer);
      klineWsRef.current?.close();
    };
  }, []);

  // Ticker WebSocket with reconnection
  useEffect(() => {
    let reconnectTimer: ReturnType<typeof setTimeout> | null = null;
    let disposed = false;

    function connect() {
      if (disposed) return;
      const ws = new WebSocket(WS_TICKER_URL);
      tickerWsRef.current = ws;

      ws.onmessage = (event) => {
        try {
          const msg = JSON.parse(event.data);
          setTicker({
            currentPrice: parseFloat(msg.c),
            priceChange24h: parseFloat(msg.p),
            priceChangePercent24h: parseFloat(msg.P),
            high24h: parseFloat(msg.h),
            low24h: parseFloat(msg.l),
            volume24h: parseFloat(msg.v),
          });
        } catch {
          // Ignore parse errors
        }
      };

      ws.onclose = () => {
        if (!disposed) {
          reconnectTimer = setTimeout(connect, 3000);
        }
      };

      ws.onerror = () => ws.close();
    }

    connect();

    return () => {
      disposed = true;
      if (reconnectTimer) clearTimeout(reconnectTimer);
      tickerWsRef.current?.close();
    };
  }, []);

  return { candles, ticker, isConnected };
}

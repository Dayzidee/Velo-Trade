import React, { useState } from 'react';
import { TickerData } from '../../hooks/useMarketData';
import OrderBook from './OrderBook';

interface RightPanelProps {
  ticker: TickerData;
  symbol: string;
  isOpen: boolean;
  onToggle: () => void;
}

const RightPanel: React.FC<RightPanelProps> = ({ ticker, symbol, isOpen, onToggle }) => {
  const [activeTab, setActiveTab] = useState<'info' | 'orders'>('orders');
  const priceUp = ticker.priceChangePercent24h >= 0;

  const formatPrice = (p: number) => {
    if (p === 0) return '—';
    return p.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const formatVolume = (v: number) => {
    if (v >= 1_000_000) return (v / 1_000_000).toFixed(2) + 'M';
    if (v >= 1_000) return (v / 1_000).toFixed(2) + 'K';
    return v.toFixed(2);
  };

  return (
    <>
      {/* Toggle button — visible on tablet/desktop when panel is closed */}
      {!isOpen && (
        <button
          onClick={onToggle}
          className="hidden md:flex fixed right-0 top-1/2 -translate-y-1/2 z-40 w-8 h-16 bg-zinc-900/90 border border-zinc-800 border-r-0 rounded-l-xl items-center justify-center text-zinc-500 hover:text-white transition-all"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
        </button>
      )}

      {/* Mobile overlay backdrop */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 bg-black/60 z-40" onClick={onToggle} />
      )}

      {/* Panel */}
      <div className={`
        fixed md:relative right-0 top-0 h-full z-50 md:z-auto
        w-[320px] md:w-[340px] border-l border-zinc-900 bg-zinc-950/95 md:bg-zinc-950/80 backdrop-blur-xl md:backdrop-blur-none
        flex flex-col transition-transform duration-300 ease-out
        ${isOpen ? 'translate-x-0' : 'translate-x-full md:hidden'}
      `}>
        {/* Header with Tabs */}
        <div className="h-16 border-b border-zinc-900 flex items-center justify-between px-2 shrink-0">
          <div className="flex bg-zinc-900/50 rounded-lg p-1 ml-2">
            <button 
              onClick={() => setActiveTab('orders')}
              className={`px-3 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-md transition-all ${activeTab === 'orders' ? 'bg-zinc-800 text-white shadow-lg' : 'text-zinc-500 hover:text-zinc-300'}`}
            >
              Orders
            </button>
            <button 
              onClick={() => setActiveTab('info')}
              className={`px-3 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-md transition-all ${activeTab === 'info' ? 'bg-zinc-800 text-white shadow-lg' : 'text-zinc-500 hover:text-zinc-300'}`}
            >
              Info
            </button>
          </div>
          <button onClick={onToggle} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-zinc-900 text-zinc-500 hover:text-white transition-all mr-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden flex flex-col">
          {activeTab === 'orders' ? (
            <OrderBook currentPrice={ticker.currentPrice} />
          ) : (
            <>
              {/* Quick Stats */}
              <div className="p-5 border-b border-zinc-900 space-y-3 shrink-0">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Price</span>
                  <span className={`text-sm font-black ${priceUp ? 'text-emerald-400' : 'text-rose-400'}`}>${formatPrice(ticker.currentPrice)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">24h Change</span>
                  <span className={`text-sm font-black ${priceUp ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {priceUp ? '+' : ''}{ticker.priceChange24h.toFixed(2)} ({priceUp ? '+' : ''}{ticker.priceChangePercent24h.toFixed(2)}%)
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">High</span>
                  <span className="text-sm font-black text-white">${formatPrice(ticker.high24h)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Low</span>
                  <span className="text-sm font-black text-white">${formatPrice(ticker.low24h)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Volume</span>
                  <span className="text-sm font-black text-white">{formatVolume(ticker.volume24h)} BTC</span>
                </div>
              </div>

              {/* Market Description placeholder */}
              <div className="flex-1 overflow-y-auto p-6 flex flex-col text-left">
                <h4 className="text-white font-black uppercase tracking-widest text-[10px] mb-3 italic">About {symbol}</h4>
                <p className="text-zinc-500 text-[10px] font-medium leading-relaxed">
                  {symbol} is a prominent digital asset in the global financial ecosystem. Market participants monitor price action closely for volatility and liquidity patterns.
                </p>
                
                <div className="mt-8 space-y-4">
                  <div className="p-3 bg-zinc-900/40 border border-zinc-800 rounded-xl">
                    <span className="text-[9px] font-black text-zinc-600 uppercase tracking-widest block mb-1">Volatilty Index</span>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1 bg-zinc-800 rounded-full overflow-hidden">
                        <div className="h-full bg-amber-500" style={{ width: '65%' }} />
                      </div>
                      <span className="text-[9px] font-black text-white">Moderate</span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Market Sentiment */}
        <div className="p-5 border-t border-zinc-900 bg-zinc-950 shrink-0">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-black uppercase text-zinc-600 tracking-widest">Market Sentiment</span>
            <span className={`text-[10px] font-black uppercase tracking-widest ${priceUp ? 'text-emerald-500' : 'text-rose-500'}`}>
              {priceUp ? 'Bullish' : 'Bearish'}
            </span>
          </div>
          <div className="h-2 w-full bg-zinc-900 rounded-full overflow-hidden flex">
            <div className="h-full bg-emerald-500 transition-all duration-1000" style={{ width: `${Math.max(5, Math.min(95, 50 + ticker.priceChangePercent24h * 2))}%` }} />
            <div className="h-full bg-rose-500 flex-1" />
          </div>
        </div>
      </div>
    </>
  );
};

export default RightPanel;

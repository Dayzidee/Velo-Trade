import React, { useState } from 'react';

export type OrderType = 'market' | 'limit' | 'stop';

interface OrderPanelProps {
  investment: number;
  setInvestment: (fn: (prev: number) => number) => void;
  duration: string;
  currentPrice: number;
}

const OrderPanel: React.FC<OrderPanelProps> = ({ investment, setInvestment, duration, currentPrice }) => {
  const [orderType, setOrderType] = useState<OrderType>('market');
  const [limitPrice, setLimitPrice] = useState('');
  const [stopPrice, setStopPrice] = useState('');
  const [takeProfitPrice, setTakeProfitPrice] = useState('');

  const formatDisplayPrice = (p: number) => {
    if (p === 0) return '—';
    return p.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  return (
    <div className="p-3 md:p-6 flex flex-col items-center gap-3 md:gap-4 bg-zinc-950/60 backdrop-blur-md border-t border-zinc-900">

      {/* Order Type Tabs */}
      <div className="flex w-full max-w-lg bg-zinc-900/60 rounded-xl p-1 gap-1">
        {([
          { id: 'market' as const, label: 'Market' },
          { id: 'limit' as const, label: 'Limit' },
          { id: 'stop' as const, label: 'Stop-Loss / TP' },
        ]).map(type => (
          <button
            key={type.id}
            onClick={() => setOrderType(type.id)}
            className={`flex-1 py-2 rounded-lg text-[9px] md:text-[10px] font-black uppercase tracking-widest transition-all ${
              orderType === type.id
                ? 'bg-zinc-800 text-cyan-400 shadow-lg'
                : 'text-zinc-600 hover:text-zinc-400'
            }`}
          >
            {type.label}
          </button>
        ))}
      </div>

      {/* Investment & Duration */}
      <div className="flex items-center gap-3 md:gap-4 w-full max-w-lg">
        <div className="flex-1 flex items-center bg-zinc-900/80 border border-zinc-800 rounded-2xl h-12 md:h-14 overflow-hidden">
          <button onClick={() => setInvestment(prev => Math.max(1, prev - 1))} className="w-12 md:w-14 h-full flex items-center justify-center hover:bg-zinc-800 text-zinc-500 transition-all text-lg">−</button>
          <div className="flex-1 flex flex-col items-center justify-center">
            <span className="text-[9px] md:text-[10px] font-bold text-zinc-500 uppercase tracking-widest leading-none">Investment</span>
            <span className="text-lg md:text-xl font-black text-white leading-none mt-0.5">${investment}</span>
          </div>
          <button onClick={() => setInvestment(prev => prev + 1)} className="w-12 md:w-14 h-full flex items-center justify-center hover:bg-zinc-800 text-zinc-500 transition-all text-lg">+</button>
        </div>
        <div className="flex-1 flex items-center bg-zinc-900/80 border border-zinc-800 rounded-2xl h-12 md:h-14 overflow-hidden">
          <button className="w-12 md:w-14 h-full flex items-center justify-center hover:bg-zinc-800 text-zinc-500 transition-all text-lg">−</button>
          <div className="flex-1 flex flex-col items-center justify-center">
            <span className="text-[9px] md:text-[10px] font-bold text-zinc-500 uppercase tracking-widest leading-none">Auto Close</span>
            <span className="text-lg md:text-xl font-black text-white leading-none mt-0.5">{duration}</span>
          </div>
          <button className="w-12 md:w-14 h-full flex items-center justify-center hover:bg-zinc-800 text-zinc-500 transition-all text-lg">+</button>
        </div>
      </div>

      {/* Conditional: Limit Price + Stop Price fields */}
      {orderType !== 'market' && (
        <div className="flex items-center gap-3 md:gap-4 w-full max-w-lg">
          {orderType === 'limit' && (
            <div className="flex-1">
              <label className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest block mb-1.5 px-1">Limit Price</label>
              <input
                type="text"
                value={limitPrice}
                onChange={e => setLimitPrice(e.target.value)}
                placeholder={formatDisplayPrice(currentPrice)}
                className="w-full bg-zinc-900/80 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm font-black text-white placeholder-zinc-700 focus:outline-none focus:border-indigo-500/50 transition-all"
              />
            </div>
          )}
          {orderType === 'stop' && (
            <>
              <div className="flex-1">
                <label className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest block mb-1.5 px-1">Stop Loss</label>
                <input
                  type="text"
                  value={stopPrice}
                  onChange={e => setStopPrice(e.target.value)}
                  placeholder={formatDisplayPrice(currentPrice * 0.97)}
                  className="w-full bg-zinc-900/80 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm font-black text-white placeholder-zinc-700 focus:outline-none focus:border-rose-500/50 transition-all"
                />
              </div>
              <div className="flex-1">
                <label className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest block mb-1.5 px-1">Take Profit</label>
                <input
                  type="text"
                  value={takeProfitPrice}
                  onChange={e => setTakeProfitPrice(e.target.value)}
                  placeholder={formatDisplayPrice(currentPrice * 1.05)}
                  className="w-full bg-zinc-900/80 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm font-black text-white placeholder-zinc-700 focus:outline-none focus:border-emerald-500/50 transition-all"
                />
              </div>
            </>
          )}
        </div>
      )}

      {/* Buy / Sell Buttons */}
      <div className="flex gap-3 md:gap-4 w-full max-w-lg h-14 md:h-16">
        <button className="flex-1 relative group overflow-hidden bg-rose-500 rounded-2xl flex items-center justify-center shadow-xl shadow-rose-500/20 active:scale-95 transition-all hover:bg-rose-400">
          <div className="flex items-center gap-2 md:gap-3 z-10">
            <svg className="w-5 h-5 md:w-6 md:h-6 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
            <div className="flex flex-col items-start">
              <span className="text-lg md:text-xl font-black text-white tracking-tighter italic">SELL</span>
              <span className="text-[9px] md:text-[10px] font-bold text-white/70">
                {orderType === 'market' ? 'Market' : orderType === 'limit' ? 'Limit' : 'SL/TP'}
              </span>
            </div>
          </div>
        </button>
        <button className="flex-1 relative group overflow-hidden bg-emerald-500 rounded-2xl flex items-center justify-center shadow-xl shadow-emerald-500/20 active:scale-95 transition-all hover:bg-emerald-400">
          <div className="flex flex-row-reverse items-center gap-2 md:gap-3 z-10">
            <svg className="w-5 h-5 md:w-6 md:h-6 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
            <div className="flex flex-col items-end">
              <span className="text-lg md:text-xl font-black text-white tracking-tighter italic">BUY</span>
              <span className="text-[9px] md:text-[10px] font-bold text-white/70">
                {orderType === 'market' ? 'Market' : orderType === 'limit' ? 'Limit' : 'SL/TP'}
              </span>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};

export default OrderPanel;

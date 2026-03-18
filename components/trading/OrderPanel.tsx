import React, { useState } from 'react';
import { useTrades } from '../../hooks/useTrades';

export type OrderType = 'market' | 'limit' | 'stop';

interface OrderPanelProps {
  investment: number;
  setInvestment: (fn: (prev: number) => number) => void;
  duration: string;
  currentPrice: number;
  symbol: string;
  accountType: 'demo' | 'real';
  isExpanded?: boolean;
  onToggleExpand?: () => void;
}

const OrderPanel: React.FC<OrderPanelProps> = ({ 
  investment, setInvestment, duration, currentPrice, symbol, accountType,
  isExpanded = true, onToggleExpand
}) => {
  const { placeTrade } = useTrades();
  const [isPlacing, setIsPlacing] = useState(false);
  const [orderType, setOrderType] = useState<OrderType>('market');
  const [limitPrice, setLimitPrice] = useState('');
  const [stopPrice, setStopPrice] = useState('');
  const [takeProfitPrice, setTakeProfitPrice] = useState('');

  const handleTrade = async (type: 'buy' | 'sell') => {
    if (isPlacing || currentPrice === 0) return;
    
    setIsPlacing(true);
    try {
      await placeTrade({
        symbol,
        type,
        entryPrice: currentPrice,
        amount: investment,
        duration,
        accountType
      });
    } catch (error) {
      console.error("Trade failed:", error);
    } finally {
      setIsPlacing(false);
    }
  };

  const formatDisplayPrice = (p: number) => {
    if (p === 0) return '—';
    return p.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  return (
    <div className={`flex flex-col bg-zinc-950/90 backdrop-blur-xl border-t border-zinc-900 shrink-0 transition-all duration-300 ${isExpanded ? 'p-2 md:p-3 pb-[calc(1.5rem+env(safe-area-inset-bottom))]' : 'p-2 pt-1 pb-safe'}`}>
      
      {/* Toggle Header (Mobile Only) */}
      <div 
        onClick={onToggleExpand}
        className="md:hidden flex items-center justify-between w-full px-2 py-1.5 mb-1 cursor-pointer group"
      >
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-400">
            {isExpanded ? 'Trading Options' : 'Quick Trade'}
          </span>
          {!isExpanded && (
            <div className="flex items-center gap-2 px-2 py-0.5 bg-zinc-900 rounded-full">
              <span className="text-[9px] font-bold text-zinc-500">${investment}</span>
              <span className="text-[9px] font-bold text-zinc-500">{duration}</span>
            </div>
          )}
        </div>
        <div className={`w-6 h-6 flex items-center justify-center rounded-full bg-zinc-900 group-hover:bg-zinc-800 transition-colors ${isExpanded ? 'rotate-180' : ''}`}>
          <svg className="w-3.5 h-3.5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 15l7-7 7 7" />
          </svg>
        </div>
      </div>

      {isExpanded ? (
        <div className="flex flex-col items-center gap-2 md:gap-3">
          {/* Order Type Tabs */}
          <div className="flex w-full max-w-lg bg-zinc-900/60 rounded-lg p-0.5 gap-0.5">
            {([
              { id: 'market' as const, label: 'Market' },
              { id: 'limit' as const, label: 'Limit' },
              { id: 'stop' as const, label: 'SL/TP' },
            ]).map(type => (
              <button
                key={type.id}
                onClick={() => setOrderType(type.id)}
                className={`flex-1 py-1.5 rounded-md text-[8px] md:text-[9px] font-black uppercase tracking-widest transition-all ${
                  orderType === type.id
                    ? 'bg-zinc-800 text-cyan-400 shadow-md'
                    : 'text-zinc-600 hover:text-zinc-400'
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>

          {/* Investment & Duration */}
          <div className="flex items-center gap-2 md:gap-3 w-full max-w-lg">
            <div className="flex-1 flex items-center bg-zinc-900/80 border border-zinc-800 rounded-xl h-10 md:h-11 overflow-hidden">
              <button onClick={() => setInvestment(prev => Math.max(1, prev - 1))} className="w-10 md:w-11 h-full flex items-center justify-center hover:bg-zinc-800 text-zinc-500 transition-all text-base">−</button>
              <div className="flex-1 flex flex-col items-center justify-center">
                <span className="text-[7px] md:text-[8px] font-bold text-zinc-600 uppercase tracking-widest leading-none">Investment</span>
                <span className="text-sm md:text-base font-black text-white leading-none mt-0.5">${investment}</span>
              </div>
              <button onClick={() => setInvestment(prev => prev + 1)} className="w-10 md:w-11 h-full flex items-center justify-center hover:bg-zinc-800 text-zinc-500 transition-all text-base">+</button>
            </div>
            <div className="flex-1 flex items-center bg-zinc-900/80 border border-zinc-800 rounded-xl h-10 md:h-11 overflow-hidden">
              <button className="w-10 md:w-11 h-full flex items-center justify-center hover:bg-zinc-800 text-zinc-500 transition-all text-base">−</button>
              <div className="flex-1 flex flex-col items-center justify-center">
                <span className="text-[7px] md:text-[8px] font-bold text-zinc-600 uppercase tracking-widest leading-none">Duration</span>
                <span className="text-sm md:text-base font-black text-white leading-none mt-0.5">{duration}</span>
              </div>
              <button className="w-10 md:w-11 h-full flex items-center justify-center hover:bg-zinc-800 text-zinc-500 transition-all text-base">+</button>
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

          <div className="flex gap-2 md:gap-3 w-full max-w-lg h-11 md:h-12">
            <button 
              onClick={() => handleTrade('sell')}
              disabled={isPlacing || currentPrice === 0}
              className={`flex-1 relative group overflow-hidden bg-rose-500 rounded-xl flex items-center justify-center shadow-lg shadow-rose-500/10 active:scale-95 transition-all hover:bg-rose-400 ${isPlacing ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <div className="flex items-center gap-2 z-10">
                {isPlacing ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <svg className="w-4 h-4 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
                )}
                <div className="flex flex-col items-start leading-tight">
                  <span className="text-sm md:text-base font-black text-white tracking-tighter italic leading-none">SELL</span>
                  <span className="text-[7px] md:text-[8px] font-bold text-white/50 uppercase leading-none">Market</span>
                </div>
              </div>
            </button>
            <button 
              onClick={() => handleTrade('buy')}
              disabled={isPlacing || currentPrice === 0}
              className={`flex-1 relative group overflow-hidden bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/10 active:scale-95 transition-all hover:bg-emerald-400 ${isPlacing ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <div className="flex flex-row-reverse items-center gap-2 z-10">
                {isPlacing ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <svg className="w-4 h-4 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
                )}
                <div className="flex flex-col items-end leading-tight text-right">
                  <span className="text-sm md:text-base font-black text-white tracking-tighter italic leading-none">BUY</span>
                  <span className="text-[7px] md:text-[8px] font-bold text-white/50 uppercase leading-none">Market</span>
                </div>
              </div>
            </button>
          </div>
        </div>
      ) : (
        <div className="flex gap-2 w-full max-w-lg h-10">
          <button 
            onClick={(e) => { e.stopPropagation(); handleTrade('sell'); }} 
            className="flex-1 bg-rose-500/20 text-rose-500 rounded-lg text-[10px] font-black uppercase tracking-widest border border-rose-500/30 active:scale-95 transition-all"
          >
            Sell
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); handleTrade('buy'); }} 
            className="flex-1 bg-emerald-500/20 text-emerald-500 rounded-lg text-[10px] font-black uppercase tracking-widest border border-emerald-500/30 active:scale-95 transition-all"
          >
            Buy
          </button>
        </div>
      )}
    </div>
  );
};

export default OrderPanel;

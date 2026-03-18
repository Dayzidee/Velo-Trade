import React, { useState } from 'react';
import { useTrades, Trade } from '../../hooks/useTrades';

type PositionTab = 'active' | 'history';

interface PositionsPanelProps {
  isExpanded: boolean;
  onToggle: () => void;
  currentPrice: number;
  symbol: string;
}

const PositionsPanel: React.FC<PositionsPanelProps> = ({ isExpanded, onToggle, currentPrice, symbol }) => {
  const [activeTab, setActiveTab] = useState<PositionTab>('active');
  const { trades, loading } = useTrades();

  const getFilteredTrades = () => {
    if (activeTab === 'active') return trades.filter(t => t.status === 'open');
    return trades.filter(t => t.status === 'closed');
  };

  const filteredTrades = getFilteredTrades();
  
  const activeTrades = trades.filter(t => t.status === 'open');
  
  const calculatePnl = (trade: Trade) => {
    if (trade.status === 'closed') return trade.payout || 0;
    
    // For simplicity, we only calculate live P&L if the trade symbol matches the active one
    if (trade.symbol !== symbol) return 0;

    const isProfit = trade.type === 'buy' 
      ? currentPrice > trade.entryPrice 
      : currentPrice < trade.entryPrice;
    
    return isProfit ? (trade.amount * 0.85) : -trade.amount; // 85% payout simulation
  };

  const totalPnl = activeTrades.reduce((sum, t) => sum + calculatePnl(t), 0);

  return (
    <div className={`border-t border-zinc-800 bg-zinc-950/90 backdrop-blur-md transition-all duration-300 ${isExpanded ? 'max-h-[350px]' : 'max-h-[36px]'} overflow-hidden shrink-0`}>
      {/* Header — always visible */}
      <button onClick={onToggle} className="w-full h-9 flex items-center justify-between px-3 hover:bg-zinc-900/40 transition-all">
        <div className="flex items-center gap-2">
          <span className="text-[9px] font-black text-white uppercase tracking-widest italic">Positions</span>
          <span className="text-[8px] font-bold text-zinc-600 bg-zinc-900 px-1.5 py-0.5 rounded">
            {activeTrades.length} open
          </span>
          <span className={`text-[9px] font-black ${totalPnl >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
            {totalPnl >= 0 ? '+' : ''}{totalPnl.toFixed(2)} USD
          </span>
        </div>
        <div className="flex items-center gap-2">
          {isExpanded && (
            <button
              onClick={e => { e.stopPropagation(); }}
              className="text-[9px] font-black uppercase tracking-widest text-rose-400 hover:text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 px-3 py-1 rounded-lg transition-all"
            >
              Close All
            </button>
          )}
          <svg className={`w-3.5 h-3.5 text-zinc-600 transition-transform ${isExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
          </svg>
        </div>
      </button>

      <div className="flex px-3 gap-1 border-b border-zinc-900">
        {([
          { id: 'active' as const, label: 'Active', count: activeTrades.length },
          { id: 'history' as const, label: 'History', count: trades.filter(t => t.status === 'closed').length },
        ]).map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-2 py-1.5 text-[8px] font-black uppercase tracking-widest transition-all border-b-2 ${
              activeTab === tab.id
                ? 'text-cyan-400 border-cyan-400'
                : 'text-zinc-600 border-transparent hover:text-zinc-400'
            }`}
          >
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-x-auto overflow-y-auto max-h-[280px]">
        <table className="w-full min-w-[600px]">
          <thead>
            <tr className="border-b border-zinc-900/50">
              {['Pair', 'Type', 'Entry', 'Current', 'Amount', 'P&L', 'ROI', 'Time', ''].map(h => (
                <th key={h} className="px-3 py-2 text-left text-[9px] font-black text-zinc-600 uppercase tracking-widest">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={9} className="px-3 py-8 text-center text-[10px] font-bold text-zinc-700 uppercase tracking-widest">
                  Loading trades...
                </td>
              </tr>
            ) : filteredTrades.length === 0 ? (
              <tr>
                <td colSpan={9} className="px-3 py-8 text-center text-[10px] font-bold text-zinc-700 uppercase tracking-widest">
                  No {activeTab} trades
                </td>
              </tr>
            ) : filteredTrades.map(trade => {
              const livePnl = calculatePnl(trade);
              const liveRoi = (livePnl / trade.amount) * 100;
              const displayPrice = trade.symbol === symbol ? currentPrice : trade.entryPrice;

              return (
                <tr key={trade.id} className="border-b border-zinc-900/30 hover:bg-zinc-900/30 transition-all">
                  <td className="px-3 py-1.5 text-xs font-black text-white">{trade.symbol}</td>
                  <td className="px-3 py-1.5">
                    <span className={`text-[9px] font-black px-1.5 py-0.5 rounded ${trade.type === 'buy' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
                      {trade.type.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-3 py-1.5 text-[10px] font-bold text-zinc-400">${trade.entryPrice.toLocaleString()}</td>
                  <td className="px-3 py-1.5 text-[10px] font-bold text-white">${displayPrice.toLocaleString()}</td>
                  <td className="px-3 py-1.5 text-[10px] font-bold text-zinc-400">${trade.amount}</td>
                  <td className={`px-3 py-1.5 text-[10px] font-black ${livePnl >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {livePnl === 0 ? '—' : `${livePnl >= 0 ? '+' : ''}$${livePnl.toFixed(2)}`}
                  </td>
                  <td className={`px-3 py-1.5 text-[10px] font-black ${liveRoi >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {liveRoi === 0 ? '—' : `${liveRoi >= 0 ? '+' : ''}${liveRoi.toFixed(2)}%`}
                  </td>
                  <td className="px-3 py-1.5 text-[9px] font-medium text-zinc-600">
                    {trade.status === 'open' ? 'Active' : 'Closed'}
                  </td>
                  <td className="px-3 py-2.5">
                    {trade.status === 'open' && (
                      <button className="text-[9px] font-black uppercase text-zinc-500 hover:text-rose-400 px-2 py-1 rounded hover:bg-rose-500/10 transition-all">
                        Close
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PositionsPanel;

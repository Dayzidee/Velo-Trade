import React, { useState } from 'react';

type PositionTab = 'active' | 'pending' | 'history';

interface MockTrade {
  id: string;
  pair: string;
  type: 'BUY' | 'SELL';
  entry: number;
  current: number;
  amount: number;
  pnl: number;
  roi: number;
  time: string;
  status: 'open' | 'pending' | 'closed' | 'cancelled';
}

const MOCK_ACTIVE: MockTrade[] = [
  { id: 'T001', pair: 'BTC/USDT', type: 'BUY', entry: 66890.50, current: 67432.50, amount: 100, pnl: 8.10, roi: 8.10, time: '2m ago', status: 'open' },
  { id: 'T002', pair: 'ETH/USDT', type: 'SELL', entry: 3555.20, current: 3521.80, amount: 50, pnl: 4.71, roi: 9.42, time: '5m ago', status: 'open' },
  { id: 'T003', pair: 'SOL/USDT', type: 'BUY', entry: 180.40, current: 178.25, amount: 25, pnl: -2.98, roi: -11.93, time: '12m ago', status: 'open' },
];

const MOCK_PENDING: MockTrade[] = [
  { id: 'P001', pair: 'BNB/USDT', type: 'BUY', entry: 590.00, current: 598.40, amount: 75, pnl: 0, roi: 0, time: 'Limit @ $590', status: 'pending' },
  { id: 'P002', pair: 'AVAX/USDT', type: 'SELL', entry: 42.00, current: 38.92, amount: 30, pnl: 0, roi: 0, time: 'Stop @ $42', status: 'pending' },
];

const MOCK_HISTORY: MockTrade[] = [
  { id: 'H001', pair: 'BTC/USDT', type: 'BUY', entry: 65200.00, current: 66500.00, amount: 200, pnl: 39.88, roi: 19.94, time: '1h ago', status: 'closed' },
  { id: 'H002', pair: 'DOGE/USDT', type: 'SELL', entry: 0.1280, current: 0.1234, amount: 15, pnl: 5.39, roi: 35.94, time: '2h ago', status: 'closed' },
  { id: 'H003', pair: 'XRP/USDT', type: 'BUY', entry: 0.6400, current: 0.6234, amount: 50, pnl: -12.97, roi: -25.94, time: '3h ago', status: 'closed' },
  { id: 'H004', pair: 'LINK/USDT', type: 'BUY', entry: 14.20, current: 14.56, amount: 40, pnl: 10.14, roi: 25.35, time: '5h ago', status: 'closed' },
  { id: 'H005', pair: 'ETH/USDT', type: 'SELL', entry: 3600.00, current: 3521.80, amount: 100, pnl: 21.72, roi: 21.72, time: '1d ago', status: 'closed' },
];

interface PositionsPanelProps {
  isExpanded: boolean;
  onToggle: () => void;
}

const PositionsPanel: React.FC<PositionsPanelProps> = ({ isExpanded, onToggle }) => {
  const [activeTab, setActiveTab] = useState<PositionTab>('active');

  const getTradesForTab = (): MockTrade[] => {
    switch (activeTab) {
      case 'active': return MOCK_ACTIVE;
      case 'pending': return MOCK_PENDING;
      case 'history': return MOCK_HISTORY;
    }
  };

  const trades = getTradesForTab();

  const totalPnl = MOCK_ACTIVE.reduce((sum, t) => sum + t.pnl, 0);

  return (
    <div className={`border-t border-zinc-800 bg-zinc-950/90 backdrop-blur-md transition-all duration-300 ${isExpanded ? 'max-h-[400px]' : 'max-h-[44px]'} overflow-hidden`}>
      {/* Header — always visible */}
      <button onClick={onToggle} className="w-full h-11 flex items-center justify-between px-4 hover:bg-zinc-900/40 transition-all">
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-black text-white uppercase tracking-widest">Positions</span>
          <span className="text-[9px] font-bold text-zinc-600 bg-zinc-900 px-2 py-0.5 rounded-md">
            {MOCK_ACTIVE.length} open
          </span>
          <span className={`text-[10px] font-black ${totalPnl >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
            {totalPnl >= 0 ? '+' : ''}{totalPnl.toFixed(2)} USD
          </span>
        </div>
        <div className="flex items-center gap-3">
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

      {/* Tabs */}
      <div className="flex px-3 gap-1 border-b border-zinc-900">
        {([
          { id: 'active' as const, label: 'Active', count: MOCK_ACTIVE.length },
          { id: 'pending' as const, label: 'Pending', count: MOCK_PENDING.length },
          { id: 'history' as const, label: 'History', count: MOCK_HISTORY.length },
        ]).map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-3 py-2 text-[9px] font-black uppercase tracking-widest transition-all border-b-2 ${
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
              {['Pair', 'Type', 'Entry', activeTab === 'pending' ? 'Trigger' : 'Current', 'Amount', 'P&L', 'ROI', 'Time', ''].map(h => (
                <th key={h} className="px-3 py-2 text-left text-[9px] font-black text-zinc-600 uppercase tracking-widest">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {trades.map(trade => (
              <tr key={trade.id} className="border-b border-zinc-900/30 hover:bg-zinc-900/30 transition-all">
                <td className="px-3 py-2.5 text-xs font-black text-white">{trade.pair}</td>
                <td className="px-3 py-2.5">
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded ${trade.type === 'BUY' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
                    {trade.type}
                  </span>
                </td>
                <td className="px-3 py-2.5 text-xs font-bold text-zinc-400">${trade.entry < 1 ? trade.entry.toFixed(4) : trade.entry.toLocaleString()}</td>
                <td className="px-3 py-2.5 text-xs font-bold text-white">${trade.current < 1 ? trade.current.toFixed(4) : trade.current.toLocaleString()}</td>
                <td className="px-3 py-2.5 text-xs font-bold text-zinc-400">${trade.amount}</td>
                <td className={`px-3 py-2.5 text-xs font-black ${trade.pnl >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {trade.pnl === 0 ? '—' : `${trade.pnl >= 0 ? '+' : ''}$${trade.pnl.toFixed(2)}`}
                </td>
                <td className={`px-3 py-2.5 text-xs font-black ${trade.roi >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {trade.roi === 0 ? '—' : `${trade.roi >= 0 ? '+' : ''}${trade.roi.toFixed(2)}%`}
                </td>
                <td className="px-3 py-2.5 text-[10px] font-medium text-zinc-600">{trade.time}</td>
                <td className="px-3 py-2.5">
                  {trade.status === 'open' && (
                    <button className="text-[9px] font-black uppercase text-zinc-500 hover:text-rose-400 px-2 py-1 rounded hover:bg-rose-500/10 transition-all">
                      Close
                    </button>
                  )}
                  {trade.status === 'pending' && (
                    <button className="text-[9px] font-black uppercase text-zinc-500 hover:text-rose-400 px-2 py-1 rounded hover:bg-rose-500/10 transition-all">
                      Cancel
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PositionsPanel;

import React, { useState } from 'react';

interface MasterTrader {
  id: string;
  name: string;
  avatar: string;
  roi: number;
  winRate: number;
  followers: number;
  totalTrades: number;
  riskLevel: 'Low' | 'Medium' | 'High';
  bio: string;
  isFollowing: boolean;
}

const MOCK_TRADERS: MasterTrader[] = [
  { id: 'MT001', name: 'CryptoKing', avatar: '👑', roi: 342.5, winRate: 78, followers: 12450, totalTrades: 2841, riskLevel: 'Medium', bio: 'Full-time crypto trader. BTC/ETH specialist.', isFollowing: false },
  { id: 'MT002', name: 'AlphaWolf', avatar: '🐺', roi: 218.3, winRate: 82, followers: 8920, totalTrades: 1567, riskLevel: 'Low', bio: 'Conservative strategies, consistent returns.', isFollowing: true },
  { id: 'MT003', name: 'MoonShot', avatar: '🚀', roi: 567.1, winRate: 65, followers: 23100, totalTrades: 4210, riskLevel: 'High', bio: 'High-risk, high-reward. Alt-coin focused.', isFollowing: false },
  { id: 'MT004', name: 'SteadyEdge', avatar: '🎯', roi: 156.8, winRate: 88, followers: 5670, totalTrades: 980, riskLevel: 'Low', bio: 'Algorithmic trading. Data-driven decisions.', isFollowing: false },
  { id: 'MT005', name: 'NightOwl', avatar: '🦉', roi: 289.4, winRate: 74, followers: 7340, totalTrades: 3120, riskLevel: 'Medium', bio: 'Asian session specialist. 24/7 coverage.', isFollowing: false },
  { id: 'MT006', name: 'DiamondHands', avatar: '💎', roi: 412.7, winRate: 71, followers: 15800, totalTrades: 1890, riskLevel: 'High', bio: 'Long-term positions. Never panic sell.', isFollowing: true },
  { id: 'MT007', name: 'ScalpMaster', avatar: '⚡', roi: 198.2, winRate: 85, followers: 4210, totalTrades: 8940, riskLevel: 'Medium', bio: 'Quick in, quick out. 100+ trades/day.', isFollowing: false },
  { id: 'MT008', name: 'WhaleWatch', avatar: '🐋', roi: 445.9, winRate: 69, followers: 19500, totalTrades: 560, riskLevel: 'High', bio: 'Following institutional money flows.', isFollowing: false },
  { id: 'MT009', name: 'TechAnalyst', avatar: '📐', roi: 178.6, winRate: 80, followers: 6780, totalTrades: 2340, riskLevel: 'Low', bio: 'Pure technical analysis. No emotions.', isFollowing: false },
  { id: 'MT010', name: 'GreenCandle', avatar: '🟢', roi: 324.3, winRate: 76, followers: 11200, totalTrades: 3670, riskLevel: 'Medium', bio: 'Trend follower. Momentum trader.', isFollowing: false },
];

interface CopyTradingHubProps {
  onBack: () => void;
}

const CopyTradingHub: React.FC<CopyTradingHubProps> = ({ onBack }) => {
  const [search, setSearch] = useState('');
  const [riskFilter, setRiskFilter] = useState<'all' | 'Low' | 'Medium' | 'High'>('all');
  const [riskMultiplier, setRiskMultiplier] = useState(10);
  const [showCopies, setShowCopies] = useState(false);

  const filtered = MOCK_TRADERS.filter(t => {
    const matchSearch = t.name.toLowerCase().includes(search.toLowerCase());
    const matchRisk = riskFilter === 'all' || t.riskLevel === riskFilter;
    return matchSearch && matchRisk;
  });

  const activeCopies = MOCK_TRADERS.filter(t => t.isFollowing);

  return (
    <div className="flex-1 flex flex-col bg-zinc-950 overflow-hidden">
      {/* Header */}
      <div className="h-14 md:h-16 border-b border-zinc-900 flex items-center justify-between px-4 md:px-6 shrink-0">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-zinc-900 text-zinc-500 hover:text-white transition-all">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
          </button>
          <h2 className="text-sm font-black text-white uppercase tracking-widest italic">Copy Trading</h2>
        </div>
        <button
          onClick={() => setShowCopies(!showCopies)}
          className={`text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-xl transition-all ${showCopies ? 'bg-cyan-500/10 text-cyan-400' : 'bg-zinc-900 text-zinc-500 hover:text-white'}`}
        >
          Following ({activeCopies.length})
        </button>
      </div>

      {/* Risk Multiplier */}
      <div className="px-4 md:px-6 py-3 border-b border-zinc-900 bg-zinc-900/30 shrink-0">
        <div className="flex items-center justify-between max-w-2xl mx-auto">
          <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Risk Multiplier</span>
          <div className="flex items-center gap-3">
            <input
              type="range" min="1" max="100" value={riskMultiplier}
              onChange={e => setRiskMultiplier(Number(e.target.value))}
              className="w-32 md:w-48 accent-cyan-500"
            />
            <span className="text-xs font-black text-white w-12 text-right">{riskMultiplier}%</span>
          </div>
        </div>
        <p className="text-[9px] text-zinc-600 text-center mt-1 max-w-2xl mx-auto">
          If a master trades $100, you trade ${(100 * riskMultiplier / 100).toFixed(0)}
        </p>
      </div>

      {/* Search & Filter */}
      <div className="px-4 md:px-6 py-3 border-b border-zinc-900 flex items-center gap-3 shrink-0">
        <div className="relative flex-1 max-w-sm">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text" value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search traders..."
            className="w-full bg-zinc-900/80 border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-indigo-500/50 transition-all"
          />
        </div>
        <div className="flex gap-1">
          {(['all', 'Low', 'Medium', 'High'] as const).map(r => (
            <button key={r} onClick={() => setRiskFilter(r)}
              className={`px-3 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${
                riskFilter === r ? 'bg-zinc-800 text-cyan-400' : 'text-zinc-600 hover:text-zinc-400'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Trader Grid */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {(showCopies ? activeCopies : filtered).map(trader => (
            <div key={trader.id} className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-5 hover:border-zinc-700 transition-all">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-2xl">
                  {trader.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-black text-white truncate">{trader.name}</h4>
                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded ${
                    trader.riskLevel === 'Low' ? 'bg-emerald-500/10 text-emerald-400' :
                    trader.riskLevel === 'Medium' ? 'bg-amber-500/10 text-amber-400' :
                    'bg-rose-500/10 text-rose-400'
                  }`}>
                    {trader.riskLevel} Risk
                  </span>
                </div>
              </div>
              <p className="text-[10px] text-zinc-600 mb-4 leading-relaxed">{trader.bio}</p>
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div>
                  <span className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest block">ROI</span>
                  <span className="text-sm font-black text-emerald-400">+{trader.roi.toFixed(1)}%</span>
                </div>
                <div>
                  <span className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest block">Win Rate</span>
                  <span className="text-sm font-black text-white">{trader.winRate}%</span>
                </div>
                <div>
                  <span className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest block">Followers</span>
                  <span className="text-sm font-black text-white">{trader.followers.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest block">Trades</span>
                  <span className="text-sm font-black text-white">{trader.totalTrades.toLocaleString()}</span>
                </div>
              </div>
              <button className={`w-full py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                trader.isFollowing
                  ? 'bg-zinc-800 text-zinc-400 hover:text-rose-400 hover:bg-rose-500/10'
                  : 'velo-gradient text-white hover:scale-[1.02] active:scale-95'
              }`}>
                {trader.isFollowing ? 'Unfollow' : 'Copy Trader'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CopyTradingHub;

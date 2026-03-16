
import React, { useState } from 'react';

const Markets: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'crypto' | 'commodities' | 'stocks'>('crypto');

  const assets = {
    crypto: [
      { name: 'Bitcoin', symbol: 'BTC', price: '$64,120.50', change: '+1.2%', trend: 'up' },
      { name: 'Ethereum', symbol: 'ETH', price: '$3,410.12', change: '+0.8%', trend: 'up' },
      { name: 'Solana', symbol: 'SOL', price: '$142.89', change: '-2.4%', trend: 'down' },
      { name: 'Ripple', symbol: 'XRP', price: '$0.62', change: '+5.1%', trend: 'up' },
    ],
    commodities: [
      { name: 'Gold', symbol: 'XAU', price: '$2,150.40', change: '+0.4%', trend: 'up' },
      { name: 'Silver', symbol: 'XAG', price: '$24.12', change: '-1.2%', trend: 'down' },
      { name: 'Crude Oil', symbol: 'WTI', price: '$78.45', change: '+1.5%', trend: 'up' },
    ],
    stocks: [
      { name: 'Apple', symbol: 'AAPL', price: '$182.40', change: '+0.2%', trend: 'up' },
      { name: 'Tesla', symbol: 'TSLA', price: '$175.12', change: '-3.4%', trend: 'down' },
      { name: 'Nvidia', symbol: 'NVDA', price: '$890.45', change: '+2.1%', trend: 'up' },
    ]
  };

  return (
    <section id="markets" className="py-24 bg-zinc-950 relative border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6 uppercase italic pr-8">
            Live <span className="velo-text-gradient inline-block mr-2">Markets</span>
          </h2>
          <div className="flex justify-center gap-4">
            {(['crypto', 'commodities', 'stocks'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all ${
                  activeTab === tab 
                  ? 'velo-gradient text-white' 
                  : 'bg-zinc-900 text-zinc-500 hover:text-white border border-zinc-800'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-zinc-900/30 rounded-[2rem] border border-zinc-800/50 overflow-hidden backdrop-blur-sm">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-zinc-800/50">
                <th className="px-8 py-6 text-xs font-bold text-zinc-500 uppercase tracking-widest">Asset</th>
                <th className="px-8 py-6 text-xs font-bold text-zinc-500 uppercase tracking-widest">Price</th>
                <th className="px-8 py-6 text-xs font-bold text-zinc-500 uppercase tracking-widest text-right">24h Change</th>
              </tr>
            </thead>
            <tbody>
              {assets[activeTab].map((asset, idx) => (
                <tr key={idx} className="hover:bg-zinc-800/20 transition-colors group cursor-pointer">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-center font-black text-zinc-500 group-hover:text-cyan-400 transition-colors">
                        {asset.symbol[0]}
                      </div>
                      <div>
                        <div className="text-sm font-black text-white uppercase">{asset.name}</div>
                        <div className="text-[10px] font-bold text-zinc-600">{asset.symbol}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-sm font-black text-white">{asset.price}</td>
                  <td className={`px-8 py-6 text-right font-bold text-sm ${asset.trend === 'up' ? 'text-emerald-500' : 'text-rose-500'}`}>
                    {asset.change}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default Markets;

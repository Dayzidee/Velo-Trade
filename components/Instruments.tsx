
import React from 'react';
import { View } from '../App';

interface InstrumentsProps {
  navigateTo: (view: View) => void;
}

const Instruments: React.FC<InstrumentsProps> = ({ navigateTo }) => {
  const assets = [
    { name: 'Bitcoin', symbol: 'BTC/USD', price: '$64,231.50', change: '+2.45%', trend: 'up' },
    { name: 'Ethereum', symbol: 'ETH/USD', price: '$3,452.12', change: '+1.82%', trend: 'up' },
    { name: 'Solana', symbol: 'SOL/USD', price: '$145.89', change: '-0.95%', trend: 'down' },
    { name: 'Cardano', symbol: 'ADA/USD', price: '$0.452', change: '+5.12%', trend: 'up' },
    { name: 'Avalanche', symbol: 'AVAX/USD', price: '$34.21', change: '-2.10%', trend: 'down' },
    { name: 'Polkadot', symbol: 'DOT/USD', price: '$7.24', change: '+0.45%', trend: 'up' },
  ];

  return (
    <section className="py-24 bg-zinc-950 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-12">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight uppercase italic pr-8">
              Global <span className="velo-text-gradient inline-block mr-2">Instruments</span>
            </h2>
            <p className="text-zinc-400 text-lg font-medium">
              Trade over 250+ digital assets, commodities, and indices with the tightest spreads in the industry.
            </p>
          </div>
          <button 
            onClick={() => navigateTo('register')}
            className="group flex items-center gap-3 text-sm font-black uppercase tracking-widest text-cyan-400 hover:text-white transition-colors"
          >
            View All Assets
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {assets.map((asset, idx) => (
            <div 
              key={idx} 
              className="group p-6 rounded-[2rem] bg-zinc-900/30 border border-zinc-800/50 hover:border-zinc-700/80 hover:bg-zinc-900/50 transition-all duration-500 hover:-translate-y-1"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-zinc-950 flex items-center justify-center border border-zinc-800 group-hover:border-indigo-500/50 transition-colors">
                    <span className="text-lg font-black text-zinc-500 group-hover:text-cyan-400 transition-colors">
                      {asset.symbol[0]}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-white font-black uppercase tracking-tight">{asset.name}</h4>
                    <span className="text-xs font-bold text-zinc-600 tracking-widest uppercase">{asset.symbol}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-sm font-bold ${asset.trend === 'up' ? 'text-emerald-500' : 'text-rose-500'}`}>
                    {asset.change}
                  </div>
                </div>
              </div>

              <div className="flex items-end justify-between">
                <div>
                  <span className="block text-[10px] font-bold text-zinc-600 uppercase tracking-[0.2em] mb-1">Current Price</span>
                  <span className="text-2xl font-black text-white tracking-tighter">{asset.price}</span>
                </div>
                <button 
                  onClick={() => navigateTo('register')}
                  className="px-5 py-2.5 bg-zinc-950 hover:bg-cyan-500 text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-white border border-zinc-800 hover:border-cyan-500 rounded-xl transition-all"
                >
                  Trade
                </button>
              </div>

              {/* Mock Sparkline Decor */}
              <div className="mt-6 h-8 w-full overflow-hidden opacity-20 group-hover:opacity-40 transition-opacity">
                <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 20">
                  <path 
                    d={asset.trend === 'up' ? "M0 15 L10 12 L20 16 L30 10 L40 14 L50 8 L60 12 L70 5 L80 9 L90 2 L100 6" : "M0 5 L10 8 L20 4 L30 12 L40 9 L50 15 L60 11 L70 18 L80 14 L90 19 L100 15"} 
                    fill="none" 
                    stroke={asset.trend === 'up' ? "#10b981" : "#f43f5e"} 
                    strokeWidth="2"
                  />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Instruments;

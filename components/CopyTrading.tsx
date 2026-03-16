
import React from 'react';

const CopyTrading: React.FC = () => {
  const experts = [
    { name: 'Alex Rivers', roi: '+248%', risk: 'Medium', followers: '12.4k', img: 'A' },
    { name: 'Sarah Chen', roi: '+412%', risk: 'High', followers: '8.2k', img: 'S' },
    { name: 'Marco Velo', roi: '+124%', risk: 'Low', followers: '25.1k', img: 'M' },
  ];

  return (
    <section id="copytrading" className="py-24 bg-zinc-950 relative overflow-hidden border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-8">
          <div className="max-w-2xl text-center md:text-left">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6 uppercase italic pr-8">
              Elite <span className="velo-text-gradient inline-block mr-2">Copy Trading</span>
            </h2>
            <p className="text-zinc-400 text-lg font-medium leading-relaxed">
              Skip the learning curve. Follow verified experts and replicate their trades automatically in real-time.
            </p>
          </div>
          <button className="px-8 py-4 bg-zinc-900 border border-zinc-800 rounded-2xl text-xs font-black text-white uppercase tracking-widest hover:bg-zinc-800 transition-all">
            Become a Master
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {experts.map((expert, idx) => (
            <div key={idx} className="group p-8 rounded-[2.5rem] bg-zinc-900/20 border border-zinc-800/50 hover:border-indigo-500/30 transition-all duration-500">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 rounded-2xl velo-gradient flex items-center justify-center text-2xl font-black text-white shadow-xl">
                  {expert.img}
                </div>
                <div>
                  <h4 className="text-xl font-black text-white uppercase tracking-tight">{expert.name}</h4>
                  <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">{expert.followers} Followers</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="p-4 rounded-2xl bg-zinc-950/50 border border-zinc-800">
                  <span className="block text-[10px] font-bold text-zinc-600 uppercase mb-1">Total ROI</span>
                  <span className="text-xl font-black text-emerald-400">{expert.roi}</span>
                </div>
                <div className="p-4 rounded-2xl bg-zinc-950/50 border border-zinc-800">
                  <span className="block text-[10px] font-bold text-zinc-600 uppercase mb-1">Risk Level</span>
                  <span className={`text-xl font-black ${expert.risk === 'High' ? 'text-rose-400' : expert.risk === 'Medium' ? 'text-amber-400' : 'text-cyan-400'}`}>
                    {expert.risk}
                  </span>
                </div>
              </div>

              <button className="w-full py-4 rounded-xl bg-zinc-800 text-white font-black uppercase text-xs tracking-widest group-hover:bg-indigo-600 transition-all">
                Copy Trades
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CopyTrading;

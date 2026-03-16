
import React from 'react';

const Features: React.FC = () => {
  const features = [
    {
      title: "Industry-Leading Zero Fees",
      description: "Keep 100% of your gains. Our platform is built to provide free access to the most lucrative crypto markets with no hidden commissions.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.5-7 3 3 3 6 1 9 2-2 5-3 5-3s0 3-2 5z" />
        </svg>
      ),
      glow: "group-hover:shadow-orange-500/20"
    },
    {
      title: "Elite Copy-Trading Engine",
      description: "Don't know how to trade? Simply select one of our top-performing experts and automatically replicate their winning strategies in real-time.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      glow: "group-hover:shadow-indigo-500/20"
    },
    {
      title: "No Fees on Deposit",
      description: "We believe in accessible trading for everyone, everywhere. That's why we have completely waived all fees on your crypto deposits.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
        </svg>
      ),
      glow: "group-hover:shadow-cyan-500/20"
    },
    {
      title: "No Minimum Account Size",
      description: "Unlike traditional brokers requiring thousands of dollars, Velo has zero minimums. Start your wealth-building journey with any amount.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      glow: "group-hover:shadow-emerald-500/20"
    }
  ];

  return (
    <section className="py-24 bg-zinc-950 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-from)_0%,_transparent_70%)] from-indigo-500/5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight uppercase italic pr-8">
              Why <span className="velo-text-gradient inline-block mr-2">Velo?</span>
            </h2>
            <div className="text-zinc-400 text-lg md:text-xl font-medium leading-relaxed">
              Our vision is to make it easier, faster, and cheaper for everyone around the globe to trade the world’s crypto markets without the fear of technical barriers.
            </div>
          </div>
          <div className="hidden md:block">
             <div className="w-24 h-1 velo-gradient rounded-full mb-2"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <div 
              key={idx} 
              className={`group relative p-8 rounded-3xl bg-zinc-900/40 border border-zinc-800/50 hover:border-zinc-700 transition-all duration-500 hover:-translate-y-2 shadow-xl ${feature.glow}`}
            >
              <div className="mb-6 inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-zinc-800 text-cyan-400 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500">
                {feature.icon}
              </div>
              
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-indigo-400 transition-colors">
                {feature.title}
              </h3>
              
              <p className="text-zinc-500 text-sm leading-relaxed group-hover:text-zinc-400 transition-colors">
                {feature.description}
              </p>

              {/* Decorative accent for card */}
              <div className="absolute bottom-4 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                 <svg className="w-5 h-5 text-indigo-500/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                 </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;

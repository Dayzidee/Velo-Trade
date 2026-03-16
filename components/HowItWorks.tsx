
import React from 'react';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      number: "01",
      title: "Enter Details",
      description: "Fill in your personal details in our secure, encrypted online application. It takes less than 5 minutes.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    },
    {
      number: "02",
      title: "Connect Wallet",
      description: "Link your favorite Web3 wallet (MetaMask, Phantom, or Trust) to securely manage your assets and trade.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      )
    },
    {
      number: "03",
      title: "Start Trading",
      description: "Choose a top-tier expert to copy or trade 250+ instruments manually with zero fees.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      )
    }
  ];

  return (
    <section className="py-24 bg-zinc-950/50 border-t border-zinc-900 relative overflow-hidden">
      {/* Decorative background lines */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-white to-transparent" />
        <div className="absolute top-0 left-2/4 w-px h-full bg-gradient-to-b from-transparent via-white to-transparent" />
        <div className="absolute top-0 left-3/4 w-px h-full bg-gradient-to-b from-transparent via-white to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight uppercase italic pr-8">
            How It <span className="velo-text-gradient inline-block mr-2">Works</span>
          </h2>
          <p className="text-zinc-500 text-lg md:text-xl max-w-2xl mx-auto font-medium">
            Starting your wealth-building journey with Velo is designed to be as frictionless as possible.
          </p>
        </div>

        <div className="relative flex flex-col md:flex-row items-start justify-between gap-12 lg:gap-24">
          {/* Connector Line (Desktop) */}
          <div className="hidden md:block absolute top-[45px] left-[10%] right-[10%] h-[2px] bg-zinc-900 z-0">
            <div className="absolute top-0 left-0 h-full w-1/2 velo-gradient opacity-30 animate-pulse" />
          </div>

          {steps.map((step, idx) => (
            <div key={idx} className="relative z-10 flex-1 flex flex-col items-center md:items-start text-center md:text-left group">
              <div className="relative mb-8">
                {/* Step Circle */}
                <div className="w-24 h-24 rounded-3xl bg-zinc-900 border-2 border-zinc-800 flex items-center justify-center transition-all duration-500 group-hover:border-indigo-500 group-hover:bg-zinc-800 shadow-2xl relative">
                  <div className="text-cyan-400 group-hover:text-white transition-colors">
                    {step.icon}
                  </div>
                  {/* Badge Number */}
                  <div className="absolute -top-3 -right-3 w-10 h-10 rounded-full velo-gradient flex items-center justify-center text-white text-xs font-black shadow-lg">
                    {step.number}
                  </div>
                </div>
              </div>

              <h4 className="text-2xl font-black text-white mb-4 uppercase tracking-tight group-hover:text-indigo-400 transition-colors">
                {step.title}
              </h4>
              
              <p className="text-zinc-500 font-medium leading-relaxed max-w-[280px]">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-indigo-500/5 border border-indigo-500/10 text-indigo-400 text-sm font-bold animate-bounce">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
            Scroll to see instruments
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

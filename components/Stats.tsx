
import React from 'react';

const Stats: React.FC = () => {
  const stats = [
    { label: 'Trading Volume', value: '$1.2B+', accent: 'text-purple-400' },
    { label: 'Active Experts', value: '450+', accent: 'text-indigo-400' },
    { label: 'Happy Users', value: '520k+', accent: 'text-cyan-400' },
    { label: 'Trading Fees', value: '$0', accent: 'text-emerald-400' },
  ];

  return (
    <section className="py-20 border-y border-zinc-900 bg-zinc-950/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center group">
              <p className={`text-3xl md:text-5xl font-black mb-2 transition-transform duration-500 group-hover:scale-110 ${stat.accent}`}>
                {stat.value}
              </p>
              <p className="text-zinc-500 text-sm md:text-base font-medium uppercase tracking-widest">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;

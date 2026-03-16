
import React from 'react';

const Education: React.FC = () => {
  const topics = [
    { title: 'Crypto Basics', duration: '15 mins', category: 'Beginner' },
    { title: 'Copy Trading 101', duration: '25 mins', category: 'Intermediate' },
    { title: 'Risk Management', duration: '20 mins', category: 'Essential' },
  ];

  return (
    <section id="education" className="py-24 bg-zinc-950 relative border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6 uppercase italic pr-8">
            Velo <span className="velo-text-gradient inline-block mr-2">Academy</span>
          </h2>
          <p className="text-zinc-500 max-w-xl mx-auto font-medium">
            Learn how to build wealth from scratch with our professional-grade educational resources.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {topics.map((topic, idx) => (
            <div key={idx} className="group relative overflow-hidden p-8 rounded-3xl bg-zinc-900/30 border border-zinc-800/50 hover:bg-zinc-900/50 transition-all">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity">
                 <svg className="w-24 h-24 text-indigo-500" fill="currentColor" viewBox="0 0 20 20">
                   <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0z" />
                 </svg>
              </div>
              <span className="inline-block px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-[10px] font-black uppercase tracking-widest mb-4">
                {topic.category}
              </span>
              <h4 className="text-2xl font-black text-white uppercase italic mb-2 tracking-tight">{topic.title}</h4>
              <p className="text-zinc-500 text-sm mb-6">Master the art of {topic.title.toLowerCase()} in just {topic.duration}.</p>
              <button className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-cyan-400 group-hover:text-white transition-colors">
                Start Lesson
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;

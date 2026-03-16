
import React, { useState, useEffect, useRef } from 'react';
import { View } from '../App';

interface TradingProps {
  navigateTo: (view: View) => void;
}

const Trading: React.FC<TradingProps> = ({ navigateTo }) => {
  const [activeSideTab, setActiveSideTab] = useState('trade');
  const [activeRightTab, setActiveRightTab] = useState('deals');
  const [investment, setInvestment] = useState(10);
  const [duration, setDuration] = useState('00:01:00');
  const [balance, setBalance] = useState(10000.00);
  const [priceData, setPriceData] = useState<number[]>([]);
  const chartRef = useRef<HTMLDivElement>(null);

  // Simulate live price action
  useEffect(() => {
    const initialData = Array.from({ length: 100 }, () => 1.090500 + Math.random() * 0.000100);
    setPriceData(initialData);

    const interval = setInterval(() => {
      setPriceData(prev => {
        const last = prev[prev.length - 1];
        const next = last + (Math.random() - 0.5) * 0.000020;
        return [...prev.slice(1), next];
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const currentPrice = priceData.length > 0 ? priceData[priceData.length - 1].toFixed(6) : "1.090565";

  return (
    <div className="fixed inset-0 bg-zinc-950 flex flex-col overflow-hidden text-zinc-300 font-sans select-none">
      
      {/* Top Header Panel */}
      <div className="h-16 border-b border-zinc-900 flex items-center justify-between px-4 z-50 bg-zinc-950/80 backdrop-blur-xl">
        <div className="flex items-center gap-6">
          <button onClick={() => navigateTo('home')} className="flex items-center gap-2 group">
            <div className="w-8 h-8 velo-gradient rounded-lg flex items-center justify-center">
              <span className="text-white font-black text-sm italic">V</span>
            </div>
            <span className="text-xl font-black italic text-white hidden md:block">VELO<span className="text-cyan-400">.</span></span>
          </button>
          
          <div className="h-8 w-px bg-zinc-900" />
          
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center">
                <img src="https://static.expertoption.finance/asset-icons/png/squared/EURUSD.png" alt="EURUSD" className="w-5 h-5" />
             </div>
             <div className="flex flex-col">
                <span className="text-xs font-black text-white uppercase leading-none">EUR / USD</span>
                <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest leading-none mt-1">83% Payout</span>
             </div>
             <svg className="w-3 h-3 text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" />
             </svg>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden lg:flex flex-col items-end mr-4">
            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Real Balance</span>
            <span className="text-lg font-black text-white leading-none">${balance.toFixed(2)}</span>
          </div>
          
          <button className="px-6 py-2.5 velo-gradient rounded-xl text-xs font-black text-white uppercase tracking-widest shadow-lg shadow-indigo-500/20 border border-white/10 hover:scale-105 active:scale-95 transition-all">
            Deposit
          </button>

          <div className="h-10 w-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center group cursor-pointer overflow-hidden">
             <div className="w-full h-full velo-gradient flex items-center justify-center font-black text-white">S</div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Side Navigation */}
        <div className="w-20 border-r border-zinc-900 flex flex-col items-center py-6 gap-6 bg-zinc-950/50">
          {[
            { id: 'trade', icon: '', label: 'Trade' },
            { id: 'finances', icon: '', label: 'Cash' },
            { id: 'social', icon: '', label: 'Social' },
            { id: 'profile', icon: '', label: 'User' },
            { id: 'education', icon: '', label: 'Learn' },
            { id: 'help', icon: '', label: 'Help' }
          ].map((tab) => (
            <button 
              key={tab.id}
              onClick={() => setActiveSideTab(tab.id)}
              className={`flex flex-col items-center gap-1 group transition-all ${activeSideTab === tab.id ? 'text-cyan-400' : 'text-zinc-600 hover:text-white'}`}
            >
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl transition-all border ${activeSideTab === tab.id ? 'bg-zinc-900 border-indigo-500/50 shadow-lg shadow-indigo-500/10' : 'border-transparent group-hover:bg-zinc-900'}`} style={{ fontFamily: 'eo-appearance-icomoon' }}>
                {tab.icon}
              </div>
              <span className="text-[9px] font-black uppercase tracking-widest opacity-60 group-hover:opacity-100">{tab.label}</span>
            </button>
          ))}
          <div className="mt-auto flex flex-col items-center gap-4">
            <button className="text-zinc-600 hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            </button>
          </div>
        </div>

        {/* Main Chart Workspace */}
        <div className="flex-1 relative bg-[#0d1017] flex flex-col">
          
          {/* Price Visualization - Mock Chart */}
          <div className="flex-1 relative overflow-hidden flex items-center justify-center">
            <div className="absolute inset-0 flex items-center justify-center opacity-5">
               <span className="text-[300px] font-black italic select-none">VELO</span>
            </div>

            {/* Simulated Live Chart Area */}
            <div className="absolute inset-0 p-8" ref={chartRef}>
              <svg className="w-full h-full overflow-visible" viewBox="0 0 1000 500">
                <defs>
                   <linearGradient id="chartGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="#4f46e5" stopOpacity="0" />
                   </linearGradient>
                </defs>
                {/* Horizontal Grid Lines */}
                {[0, 100, 200, 300, 400, 500].map(y => (
                  <line key={y} x1="0" y1={y} x2="1000" y2={y} stroke="#1e293b" strokeWidth="1" strokeDasharray="4 4" />
                ))}
                {/* Vertical Grid Lines */}
                {Array.from({length: 10}).map((_, i) => (
                  <line key={i} x1={i * 100} y1="0" x2={i * 100} y2="500" stroke="#1e293b" strokeWidth="1" strokeDasharray="4 4" />
                ))}

                {/* The Price Line */}
                <path 
                  d={`M ${priceData.map((p, i) => `${i * 10},${250 - (p - 1.090500) * 1000000}`).join(' L ')}`}
                  fill="none" 
                  stroke="#4f46e5" 
                  strokeWidth="3"
                  className="transition-all duration-1000"
                />
                
                {/* Area under the line */}
                <path 
                  d={`M 0,500 L ${priceData.map((p, i) => `${i * 10},${250 - (p - 1.090500) * 1000000}`).join(' L ')} L 1000,500 Z`}
                  fill="url(#chartGrad)"
                  className="transition-all duration-1000"
                />

                {/* Current Price Marker */}
                <g transform={`translate(1000, ${250 - (priceData[priceData.length-1] - 1.090500) * 1000000})`}>
                   <rect x="-80" y="-12" width="80" height="24" rx="6" fill="#06b6d4" />
                   <text x="-40" y="4" textAnchor="middle" fill="white" className="text-[10px] font-bold">{currentPrice}</text>
                   <line x1="-1000" y1="0" x2="-80" y2="0" stroke="#06b6d4" strokeWidth="1" strokeDasharray="4 4" />
                </g>
              </svg>
            </div>

            {/* Trading Tool Icons */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 p-1 bg-zinc-900/60 backdrop-blur-xl border border-zinc-800 rounded-2xl shadow-2xl z-20">
               {['', '', '', '', '', '', ''].map((icon, i) => (
                 <button key={i} className="w-10 h-10 flex items-center justify-center text-zinc-400 hover:text-cyan-400 hover:bg-zinc-800 rounded-xl transition-all" style={{fontFamily: 'eo-appearance-icomoon'}}>{icon}</button>
               ))}
               <div className="h-6 w-px bg-zinc-800 mx-1" />
               <button className="w-10 h-10 flex items-center justify-center text-zinc-400 hover:text-white transition-all"></button>
               <button className="w-10 h-10 flex items-center justify-center text-zinc-400 hover:text-white transition-all"></button>
            </div>
          </div>

          {/* Bottom Interaction Panel */}
          <div className="p-8 flex flex-col items-center gap-6 bg-zinc-950/40 backdrop-blur-md border-t border-zinc-900">
             <div className="flex items-center gap-4 w-full max-w-lg">
                <div className="flex-1 flex items-center bg-zinc-900/80 border border-zinc-800 rounded-2xl h-14 overflow-hidden">
                   <button onClick={() => setInvestment(prev => Math.max(1, prev - 1))} className="w-14 h-full flex items-center justify-center hover:bg-zinc-800 text-zinc-500 transition-all"></button>
                   <div className="flex-1 flex flex-col items-center justify-center">
                      <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest leading-none">Investment</span>
                      <span className="text-xl font-black text-white leading-none mt-1">${investment}</span>
                   </div>
                   <button onClick={() => setInvestment(prev => prev + 1)} className="w-14 h-full flex items-center justify-center hover:bg-zinc-800 text-zinc-500 transition-all"></button>
                </div>
                <div className="flex-1 flex items-center bg-zinc-900/80 border border-zinc-800 rounded-2xl h-14 overflow-hidden">
                   <button className="w-14 h-full flex items-center justify-center hover:bg-zinc-800 text-zinc-500 transition-all"></button>
                   <div className="flex-1 flex flex-col items-center justify-center">
                      <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest leading-none">Auto Close</span>
                      <span className="text-xl font-black text-white leading-none mt-1">{duration}</span>
                   </div>
                   <button className="w-14 h-full flex items-center justify-center hover:bg-zinc-800 text-zinc-500 transition-all"></button>
                </div>
             </div>

             <div className="flex gap-4 w-full max-w-lg h-20">
                <button className="flex-1 relative group overflow-hidden bg-rose-500 rounded-3xl flex items-center justify-center shadow-xl shadow-rose-500/20 active:scale-95 transition-all">
                   <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                   <div className="flex items-center gap-4 z-10">
                      <div className="text-5xl opacity-30 transform -rotate-12" style={{fontFamily: 'eo-appearance-icomoon'}}></div>
                      <div className="flex flex-col items-start">
                         <span className="text-2xl font-black text-white tracking-tighter italic">SELL</span>
                         <span className="text-xs font-bold text-white/70">Payout 83%</span>
                      </div>
                   </div>
                </button>
                <button className="flex-1 relative group overflow-hidden bg-emerald-500 rounded-3xl flex items-center justify-center shadow-xl shadow-emerald-500/20 active:scale-95 transition-all">
                   <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                   <div className="flex flex-row-reverse items-center gap-4 z-10">
                      <div className="text-5xl opacity-30 transform rotate-12" style={{fontFamily: 'eo-appearance-icomoon'}}></div>
                      <div className="flex flex-col items-end">
                         <span className="text-2xl font-black text-white tracking-tighter italic">BUY</span>
                         <span className="text-xs font-bold text-white/70">Payout 83%</span>
                      </div>
                   </div>
                </button>
             </div>
          </div>
        </div>

        {/* Right Side Info Panel */}
        <div className="w-[375px] border-l border-zinc-900 bg-zinc-950/80 flex flex-col">
          <div className="h-16 border-b border-zinc-900 flex items-center px-6">
             <h3 className="text-sm font-black text-white uppercase tracking-[0.2em] italic">Recent Activity</h3>
          </div>
          
          <div className="flex border-b border-zinc-900 p-2 gap-1">
             {[
               {id: 'deals', label: 'Deals'},
               {id: 'trends', label: 'Trends'},
               {id: 'social', label: 'Social'},
               {id: 'tips', label: 'Tips'}
             ].map(tab => (
               <button 
                 key={tab.id}
                 onClick={() => setActiveRightTab(tab.id)}
                 className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeRightTab === tab.id ? 'bg-zinc-900 text-cyan-400' : 'text-zinc-600 hover:text-zinc-400'}`}
               >
                 {tab.label}
               </button>
             ))}
          </div>

          <div className="flex-1 overflow-y-auto p-6 flex flex-col items-center justify-center text-center group">
             <div className="w-24 h-24 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-6 group-hover:border-cyan-500 transition-colors duration-500">
                <span className="text-5xl text-zinc-800 group-hover:text-cyan-400 transition-colors duration-500" style={{fontFamily: 'eo-appearance-icomoon'}}></span>
             </div>
             <h4 className="text-white font-black uppercase tracking-widest text-xs mb-2 italic">The list is empty</h4>
             <p className="text-zinc-600 text-xs font-medium leading-relaxed max-w-[200px]">
                You haven't made any trades yet. Start your journey by predicting the market direction.
             </p>
             <button className="mt-8 px-10 py-4 bg-zinc-900 border border-zinc-800 rounded-2xl text-[10px] font-black text-white uppercase tracking-[0.2em] hover:bg-zinc-800 hover:border-zinc-700 transition-all shadow-xl">
                Start Trading
             </button>
          </div>

          <div className="p-6 border-t border-zinc-900 bg-zinc-950">
             <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-black uppercase text-zinc-600 tracking-widest">Global Sentiment</span>
                <span className="text-[10px] font-black uppercase text-emerald-500 tracking-widest">Bullish</span>
             </div>
             <div className="h-2 w-full bg-zinc-900 rounded-full overflow-hidden flex">
                <div className="h-full bg-emerald-500 w-[65%]" />
                <div className="h-full bg-rose-500 w-[35%]" />
             </div>
          </div>
        </div>
      </div>

      {/* Styles for the custom icomoon font mapping used in reference */}
      <style>{`
        @font-face {
          font-family: 'eo-appearance-icomoon';
          src: url('https://static.expertoption.finance/fonts/appearance/icomoon.ttf?v=12') format('truetype');
          font-weight: normal;
          font-style: normal;
          font-display: block;
        }
      `}</style>
    </div>
  );
};

export default Trading;


import React, { useState } from 'react';
import { View } from '../App';

interface HeaderProps {
  isScrolled: boolean;
  navigateTo: (view: View) => void;
  currentView: View;
}

const Header: React.FC<HeaderProps> = ({ isScrolled, navigateTo, currentView }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    if (currentView !== 'home') {
      navigateTo('home');
      setTimeout(() => {
        const element = document.getElementById(id);
        element?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const element = document.getElementById(id);
      element?.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ease-in-out ${
        isScrolled || currentView !== 'home'
          ? 'bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-900 py-3' 
          : 'bg-transparent border-b border-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between relative">
        
        {/* Left Section: Menu & Utilities */}
        <div className="flex items-center gap-4 z-10">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 transition-all group lg:hidden"
            aria-label="Menu"
          >
            <div className="w-5 h-4 flex flex-col justify-between overflow-hidden">
              <span className={`block h-0.5 w-full bg-zinc-400 group-hover:bg-white transition-all ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
              <span className={`block h-0.5 w-full bg-zinc-400 group-hover:bg-white transition-all ${isMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`block h-0.5 w-full bg-zinc-400 group-hover:bg-white transition-all ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
            </div>
            <span className="hidden sm:inline-block text-[10px] font-black uppercase tracking-widest text-zinc-400 group-hover:text-white transition-colors">Menu</span>
          </button>

          <nav className="hidden lg:flex items-center gap-8">
            <button onClick={() => scrollToSection('markets')} className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 hover:text-cyan-400 transition-colors">Markets</button>
            <button onClick={() => scrollToSection('copytrading')} className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 hover:text-cyan-400 transition-colors">Copy Trading</button>
            <button onClick={() => scrollToSection('education')} className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 hover:text-cyan-400 transition-colors">Education</button>
          </nav>
        </div>

        {/* Center Section: Logo */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
          <button onClick={() => navigateTo('home')} className="flex items-center gap-3 group" aria-label="Velo Home">
            <div className="relative w-10 h-10 flex items-center justify-center float-animation">
              <svg viewBox="0 0 1024 1024" className="w-full h-full drop-shadow-[0_0_15px_rgba(124,58,237,0.3)]">
                <defs>
                  <linearGradient id="logoGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#7c3aed" />
                    <stop offset="100%" stopColor="#06b6d4" />
                  </linearGradient>
                </defs>
                <path d="M280.5 320.5C280.5 320.5 450.5 680.5 460.5 690.5C470.5 700.5 420.5 580.5 420.5 580.5L340.5 380.5C340.5 380.5 280.5 320.5 280.5 320.5Z" fill="url(#logoGrad)"/>
                <path d="M210.5 450.5C210.5 450.5 230.5 680.5 450.5 780.5C670.5 880.5 820.5 520.5 820.5 520.5L780.5 480.5L880.5 320.5L980.5 550.5L980.5 550.5L940.5 510.5C940.5 510.5 850.5 980.5 480.5 850.5C110.5 720.5 210.5 450.5 210.5 450.5Z" fill="url(#logoGrad)"/>
              </svg>
            </div>
            <span className="hidden sm:block text-2xl font-black tracking-tighter text-white group-hover:text-cyan-400 transition-colors italic">
              VELO<span className="text-cyan-400">.</span>
            </span>
          </button>
        </div>

        {/* Right Section: Auth */}
        <div className="flex items-center gap-3 z-10">
          <button 
            onClick={() => navigateTo('login')}
            className="hidden sm:block text-[10px] font-black px-4 py-2 transition-colors uppercase tracking-widest ${currentView === 'login' ? 'text-white' : 'text-zinc-500 hover:text-white'}"
          >
            Login
          </button>
          <button 
            onClick={() => navigateTo('register')}
            className="velo-gradient px-6 py-2.5 rounded-xl text-[10px] font-black text-white shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 hover:scale-105 active:scale-95 transition-all uppercase tracking-widest border border-white/10"
          >
            Join
          </button>
        </div>

      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden fixed inset-0 top-0 bg-zinc-950/98 backdrop-blur-3xl transition-all duration-700 ease-expo z-[90] ${isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
        <div className="p-20 flex flex-col items-center gap-12 text-center h-full justify-center">
          <button onClick={() => {navigateTo('home'); setIsMenuOpen(false);}} className="text-5xl font-black text-zinc-700 hover:text-white transition-all uppercase italic">Home</button>
          <button onClick={() => scrollToSection('markets')} className="text-5xl font-black text-zinc-700 hover:text-white transition-all uppercase italic">Markets</button>
          <button onClick={() => scrollToSection('copytrading')} className="text-5xl font-black text-zinc-700 hover:text-white transition-all uppercase italic">Copy Trade</button>
          <button onClick={() => scrollToSection('education')} className="text-5xl font-black text-zinc-700 hover:text-white transition-all uppercase italic">Academy</button>
          <div className="flex gap-4 mt-8">
             <button onClick={() => navigateTo('login')} className="px-8 py-3 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-black uppercase tracking-widest">Login</button>
             <button onClick={() => navigateTo('register')} className="px-8 py-3 rounded-full velo-gradient text-xs font-black uppercase tracking-widest">Register</button>
          </div>
        </div>
        {/* Close Button Mobile */}
        <button onClick={() => setIsMenuOpen(false)} className="absolute top-8 right-8 w-12 h-12 flex items-center justify-center rounded-full bg-zinc-900 border border-zinc-800 text-white">
           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </div>
    </header>
  );
};

export default Header;

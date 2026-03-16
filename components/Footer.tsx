
import React from 'react';
import { View } from '../App';

interface FooterProps {
  navigateTo: (view: View) => void;
}

const Footer: React.FC<FooterProps> = ({ navigateTo }) => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigateTo('home');
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <footer className="bg-zinc-950 border-t border-zinc-900 pt-24 pb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
          
          {/* Logo and Intro */}
          <div className="lg:col-span-4 space-y-6">
            <button onClick={() => navigateTo('home')} className="flex items-center gap-3 group">
              <span className="text-3xl font-black tracking-tighter text-white group-hover:text-cyan-400 transition-colors italic">
                VELO<span className="text-cyan-400">.</span>
              </span>
            </button>
            <p className="text-zinc-500 text-sm leading-relaxed max-w-sm font-medium">
              Velo is the premier zero-fee crypto copy-trading ecosystem. We empower the next generation of traders by bridging the gap between expert strategies and beginner portfolios.
            </p>
            <div className="flex gap-4 pt-4">
              <div className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500 hover:text-white hover:border-indigo-500 transition-all cursor-pointer">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </div>
              <div className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500 hover:text-white hover:border-indigo-500 transition-all cursor-pointer">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069z"/></svg>
              </div>
              <div className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500 hover:text-white hover:border-indigo-500 transition-all cursor-pointer">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.84 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8">
            <div className="space-y-4">
              <h5 className="text-xs font-black uppercase tracking-[0.2em] text-white">Home</h5>
              <ul className="space-y-3 text-sm font-medium text-zinc-500">
                <li><button onClick={() => navigateTo('home')} className="hover:text-cyan-400 transition-colors">Free Demo</button></li>
                <li><button onClick={() => navigateTo('login')} className="hover:text-cyan-400 transition-colors">Login</button></li>
                <li><button onClick={() => navigateTo('register')} className="hover:text-cyan-400 transition-colors">Register</button></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h5 className="text-xs font-black uppercase tracking-[0.2em] text-white">Trading</h5>
              <ul className="space-y-3 text-sm font-medium text-zinc-500">
                <li><button onClick={() => scrollToSection('markets')} className="hover:text-cyan-400 transition-colors text-left">Account Types</button></li>
                <li><button onClick={() => scrollToSection('copytrading')} className="hover:text-cyan-400 transition-colors text-left">Social Trading</button></li>
                <li><button onClick={() => navigateTo('faq')} className="hover:text-cyan-400 transition-colors text-left">FAQ</button></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h5 className="text-xs font-black uppercase tracking-[0.2em] text-white">Education</h5>
              <ul className="space-y-3 text-sm font-medium text-zinc-500">
                <li><button onClick={() => scrollToSection('education')} className="hover:text-cyan-400 transition-colors text-left">How to Trade</button></li>
                <li><button onClick={() => scrollToSection('education')} className="hover:text-cyan-400 transition-colors text-left">Strategies</button></li>
                <li><button className="hover:text-cyan-400 transition-colors text-left">Skill Development</button></li>
                <li><button className="hover:text-cyan-400 transition-colors text-left">Blog</button></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h5 className="text-xs font-black uppercase tracking-[0.2em] text-white">Company</h5>
              <ul className="space-y-3 text-sm font-medium text-zinc-500">
                <li><button onClick={() => navigateTo('terms')} className="hover:text-cyan-400 transition-colors text-left">Terms</button></li>
                <li><button onClick={() => navigateTo('privacy')} className="hover:text-cyan-400 transition-colors text-left">Privacy Policy</button></li>
                <li><button className="hover:text-cyan-400 transition-colors text-left">AML & KYC</button></li>
                <li><button onClick={() => navigateTo('regulation')} className="hover:text-cyan-400 transition-colors text-left">Regulation</button></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Partners & Payment Methods Placeholder */}
        <div className="flex flex-col md:flex-row items-center justify-between py-12 border-y border-zinc-900 gap-8">
          <div className="flex flex-col gap-4 items-center md:items-start">
            <h5 className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Traders & Partners</h5>
            <div className="flex flex-wrap justify-center md:justify-start gap-8 opacity-40 grayscale group-hover:grayscale-0 transition-all">
              <div className="h-6 w-24 bg-zinc-800 rounded animate-pulse" />
              <div className="h-6 w-32 bg-zinc-800 rounded animate-pulse" />
              <div className="h-6 w-20 bg-zinc-800 rounded animate-pulse" />
            </div>
          </div>
          <div className="flex flex-col gap-4 items-center md:items-end">
            <h5 className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Secure Payments</h5>
            <div className="flex flex-wrap justify-center md:justify-end gap-6 opacity-30">
               <div className="h-8 w-12 bg-zinc-800 rounded" />
               <div className="h-8 w-12 bg-zinc-800 rounded" />
               <div className="h-8 w-12 bg-zinc-800 rounded" />
               <div className="h-8 w-12 bg-zinc-800 rounded" />
            </div>
          </div>
        </div>

        {/* Risk Disclaimer */}
        <div className="py-12">
          <p className="text-[11px] leading-relaxed text-zinc-600 text-center font-medium max-w-5xl mx-auto uppercase tracking-tighter">
            Risk Warning: Trading and investing involves significant level of risk and is not suitable and/or appropriate for all clients. Please make sure you carefully consider your investment objectives, level of experience and risk appetite before buying or selling. Buying or selling entails financial risks and could result in a partial or complete loss of your funds, therefore, you should not invest funds you cannot afford to lose. You should be aware of and fully understand all the risks associated with trading and investing, and seek advice from an independent financial advisor if you have any doubts. All IP contained in this site is granted for personal use only.
          </p>
          <p className="text-[10px] text-zinc-700 text-center mt-6 font-bold tracking-widest uppercase italic">
            VELO LABS LLC, Company No 377 LLC 2024. Kingstown, St. Vincent and the Grenadines.
          </p>
        </div>

        {/* Final Copyright Row */}
        <div className="flex flex-col md:flex-row items-center justify-between border-t border-zinc-900/50 pt-10 gap-6">
          <div className="text-[10px] font-black uppercase tracking-widest text-zinc-500">
            © 2014–2026 VELO TRADING GROUP. ALL RIGHTS RESERVED.
          </div>
          <div className="flex gap-8">
            <button onClick={() => navigateTo('privacy')} className="text-[10px] font-black text-zinc-700 hover:text-white uppercase tracking-widest transition-colors">Privacy</button>
            <button className="text-[10px] font-black text-zinc-700 hover:text-white uppercase tracking-widest transition-colors">Cookies</button>
            <button onClick={() => navigateTo('terms')} className="text-[10px] font-black text-zinc-700 hover:text-white uppercase tracking-widest transition-colors">Terms</button>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;

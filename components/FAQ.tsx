import React, { useState } from 'react';

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "What is Velo Trading?",
      a: "Velo is a cutting-edge social trading platform that allows beginners to copy the trades of experienced crypto experts with zero commissions or hidden fees."
    },
    {
      q: "Is it really free to trade?",
      a: "Yes. Velo charges $0 in commissions for crypto trades. We earn revenue through institutional partnerships and premium feature sets, ensuring the core trading experience remains accessible to everyone."
    },
    {
      q: "How does Copy Trading work?",
      a: "Copy trading allows you to automatically mirror the positions taken by a master trader. When they buy or sell, your account executes the same trade proportionally based on your allocated funds."
    },
    {
      q: "What assets can I trade?",
      a: "You can trade over 250 assets, including major cryptocurrencies like Bitcoin and Ethereum, as well as high-growth altcoins, commodities, and global indices."
    },
    {
      q: "How do I withdraw my profits?",
      a: "Withdrawals are processed instantly through your connected Web3 wallet. Simply navigate to your dashboard and click 'Withdraw' to move funds back to your personal wallet."
    },
    {
      q: "Is my data secure?",
      a: "Absolutely. We use industry-standard encryption and non-custodial wallet connections, meaning we never have direct access to your private keys. Your assets stay in your control."
    }
  ];

  return (
    <div className="pt-32 pb-24 px-4 min-h-screen bg-zinc-950">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase italic tracking-tighter">
            Frequent <span className="velo-text-gradient">Questions</span>
          </h1>
          <p className="text-zinc-500 font-medium">Everything you need to know about the Velo ecosystem.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div 
              key={idx} 
              className="group rounded-3xl bg-zinc-900/40 border border-zinc-800 overflow-hidden transition-all duration-300"
            >
              <button 
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full flex items-center justify-between p-6 md:p-8 text-left focus:outline-none"
              >
                <span className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors uppercase tracking-tight">
                  {faq.q}
                </span>
                <div className={`w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center transition-transform duration-300 ${openIndex === idx ? 'rotate-180 bg-indigo-600' : ''}`}>
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>
              
              <div className={`transition-all duration-300 ease-in-out ${openIndex === idx ? 'max-h-[300px] opacity-100 pb-8 px-8' : 'max-h-0 opacity-0 pointer-events-none'}`}>
                <p className="text-zinc-400 font-medium leading-relaxed">
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 p-10 rounded-[2.5rem] velo-gradient text-center">
          <h3 className="text-2xl font-black text-white mb-4 uppercase italic">Still have questions?</h3>
          <p className="text-white/80 font-medium mb-8">Our support team is available 24/7 to help you with anything you need.</p>
          <button className="px-8 py-4 bg-white text-zinc-900 font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-zinc-100 transition-all">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default FAQ;

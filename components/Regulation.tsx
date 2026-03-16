
import React from 'react';
import { View } from '../App';

interface RegulationProps {
  navigateTo: (view: View) => void;
}

const Regulation: React.FC<RegulationProps> = ({ navigateTo }) => {
  return (
    <div className="pt-32 pb-24 px-4 min-h-screen bg-zinc-950">
      <div className="max-w-4xl mx-auto">
        <div className="mb-16">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase italic tracking-tighter">
            Legal & <span className="velo-text-gradient">Regulation</span>
          </h1>
          <p className="text-zinc-500 font-medium">Compliance Framework Overview</p>
        </div>

        <div className="space-y-12 text-zinc-400 font-medium leading-relaxed">
          <section className="space-y-6">
            <h2 className="text-2xl font-black text-white uppercase tracking-tight italic">Company Status</h2>
            <p>Velo Labs LLC is a registered entity in St. Vincent and the Grenadines (Company No 377 LLC 2024). We operate as a technology provider facilitating digital asset interactions.</p>
            <div className="p-8 rounded-3xl bg-zinc-900/50 border border-zinc-800">
               <h3 className="text-white font-bold mb-2">Registered Address:</h3>
               <p className="text-zinc-500 text-sm">First Floor, First St. Vincent Bank Ltd., James Street, PO Box 1574, Kingstown, VC0100.</p>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-black text-white uppercase tracking-tight italic">Regulatory Compliance</h2>
            <p>While the digital asset landscape is evolving, Velo is committed to maintaining high standards of internal compliance and transparency.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-zinc-900/30 border border-zinc-800">
                <h4 className="text-cyan-400 font-black text-xs uppercase tracking-widest mb-3">AML Policy</h4>
                <p className="text-xs text-zinc-500 leading-relaxed">We utilize sophisticated blockchain analysis tools to monitor and prevent illicit fund flows within our ecosystem.</p>
              </div>
              <div className="p-6 rounded-2xl bg-zinc-900/30 border border-zinc-800">
                <h4 className="text-cyan-400 font-black text-xs uppercase tracking-widest mb-3">KYC Framework</h4>
                <p className="text-xs text-zinc-500 leading-relaxed">Identity verification is required for high-volume traders to ensure a secure and compliant trading environment.</p>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-black text-white uppercase tracking-tight italic">Security Standards</h2>
            <p>Our platform undergoes regular third-party security audits to ensure our smart contracts and infrastructure meet the highest industry standards for asset safety.</p>
          </section>
        </div>

        <div className="mt-20 pt-12 border-t border-zinc-900 text-center">
          <button 
            onClick={() => navigateTo('home')}
            className="text-xs font-black uppercase tracking-widest text-cyan-400 hover:text-white transition-colors"
          >
            Back to Homepage
          </button>
        </div>
      </div>
    </div>
  );
};

export default Regulation;


import React from 'react';
import { View } from '../App';

interface TermsProps {
  navigateTo: (view: View) => void;
}

const Terms: React.FC<TermsProps> = ({ navigateTo }) => {
  return (
    <div className="pt-32 pb-24 px-4 min-h-screen bg-zinc-950">
      <div className="max-w-4xl mx-auto">
        <div className="mb-16">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase italic tracking-tighter">
            Terms of <span className="velo-text-gradient">Service</span>
          </h1>
          <p className="text-zinc-500 font-medium">Last updated: May 2024</p>
        </div>

        <div className="space-y-12 text-zinc-400 font-medium leading-relaxed">
          <section className="space-y-4">
            <h2 className="text-2xl font-black text-white uppercase tracking-tight italic">1. Introduction</h2>
            <p>Welcome to Velo. By accessing or using our platform, you agree to comply with and be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-black text-white uppercase tracking-tight italic">2. Use of Services</h2>
            <p>Our platform is designed for educational and social trading purposes. You represent that you are at least 18 years of age and have the legal capacity to enter into agreements.</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Account Responsibility: You are responsible for maintaining the confidentiality of your account credentials.</li>
              <li>Prohibited Activities: You agree not to use the platform for any illegal activities, including money laundering or fraudulent trading.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-black text-white uppercase tracking-tight italic">3. Zero-Fee Policy</h2>
            <p>Velo provides trading services with no direct commission fees. However, network fees (gas) associated with blockchain transactions are the sole responsibility of the user.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-black text-white uppercase tracking-tight italic">4. Risk Disclosure</h2>
            <p>Trading cryptocurrencies carries a high level of risk. Historical performance of expert traders is not indicative of future results. You should only invest capital that you can afford to lose.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-black text-white uppercase tracking-tight italic">5. Limitation of Liability</h2>
            <p>In no event shall Velo Labs LLC be liable for any indirect, incidental, special, consequential or punitive damages resulting from your use of the platform.</p>
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

export default Terms;

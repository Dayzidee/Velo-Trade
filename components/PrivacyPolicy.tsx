
import React from 'react';
import { View } from '../App';

interface PrivacyPolicyProps {
  navigateTo: (view: View) => void;
}

const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ navigateTo }) => {
  return (
    <div className="pt-32 pb-24 px-4 min-h-screen bg-zinc-950">
      <div className="max-w-4xl mx-auto">
        <div className="mb-16">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase italic tracking-tighter">
            Privacy <span className="velo-text-gradient">Policy</span>
          </h1>
          <p className="text-zinc-500 font-medium">Last updated: May 2024</p>
        </div>

        <div className="space-y-12 text-zinc-400 font-medium leading-relaxed">
          <section className="space-y-4">
            <h2 className="text-2xl font-black text-white uppercase tracking-tight italic">1. Information Collection</h2>
            <p>We collect minimal data required to provide our services. This includes public wallet addresses and voluntarily provided email addresses for account notifications.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-black text-white uppercase tracking-tight italic">2. Use of Information</h2>
            <p>Your information is used solely to facilitate trading operations, improve platform performance, and communicate essential security updates.</p>
            <p>We do not sell your personal data to third parties.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-black text-white uppercase tracking-tight italic">3. Data Security</h2>
            <p>We implement robust security measures including end-to-end encryption and non-custodial architecture. We do not store private keys or sensitive personal documents on our primary servers.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-black text-white uppercase tracking-tight italic">4. Cookies</h2>
            <p>We use essential cookies to maintain session states and security. You can manage cookie preferences through your browser settings.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-black text-white uppercase tracking-tight italic">5. Your Rights</h2>
            <p>You have the right to request access to your data, correction of inaccuracies, or deletion of your account. Contact our privacy team for any such requests.</p>
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

export default PrivacyPolicy;

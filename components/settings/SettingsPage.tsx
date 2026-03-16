import React, { useState } from 'react';

interface SettingsPageProps {
  onBack: () => void;
}

const SettingsPage: React.FC<SettingsPageProps> = ({ onBack }) => {
  const [email, setEmail] = useState('user@example.com');
  const [name, setName] = useState('Sanni Workspace');
  const [is2faEnabled, setIs2faEnabled] = useState(false);

  return (
    <div className="flex-1 flex flex-col bg-zinc-950 overflow-hidden">
      {/* Header */}
      <div className="h-14 md:h-16 border-b border-zinc-900 flex items-center px-4 md:px-6 gap-4 shrink-0">
        <button onClick={onBack} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-zinc-900 text-zinc-500 hover:text-white transition-all">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
        </button>
        <h2 className="text-sm font-black text-white uppercase tracking-widest italic">Settings & Security</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 md:p-8">
        <div className="max-w-2xl mx-auto space-y-8">
          
          {/* Profile Section */}
          <section>
            <h3 className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em] mb-4">Account Profile</h3>
            <div className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest block mb-1.5">Full Name</label>
                  <input 
                    type="text" value={name} onChange={e => setName(e.target.value)}
                    className="w-full bg-zinc-800/50 border border-zinc-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500/50 transition-all"
                  />
                </div>
                <div>
                  <label className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest block mb-1.5">Email Address</label>
                  <input 
                    type="email" value={email} onChange={e => setEmail(e.target.value)}
                    className="w-full bg-zinc-800/50 border border-zinc-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500/50 transition-all"
                  />
                </div>
              </div>
              <button className="text-[10px] font-black uppercase text-cyan-400 hover:text-cyan-300 transition-all mt-2">Update Profile</button>
            </div>
          </section>

          {/* Security Section */}
          <section>
            <h3 className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em] mb-4">Security</h3>
            <div className="bg-zinc-900/40 border border-zinc-800 rounded-2xl divide-y divide-zinc-800">
              <div className="p-6 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-black text-white uppercase tracking-widest mb-1">Two-Factor Authentication</h4>
                  <p className="text-[10px] text-zinc-500">Add an extra layer of security to your account.</p>
                </div>
                <button 
                  onClick={() => setIs2faEnabled(!is2faEnabled)}
                  className={`w-12 h-6 rounded-full transition-all relative ${is2faEnabled ? 'bg-emerald-500' : 'bg-zinc-700'}`}
                >
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${is2faEnabled ? 'left-7' : 'left-1'}`} />
                </button>
              </div>
              <div className="p-6 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-black text-white uppercase tracking-widest mb-1">Password</h4>
                  <p className="text-[10px] text-zinc-500">Last changed 3 months ago.</p>
                </div>
                <button className="px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-xl text-[10px] font-black text-white uppercase tracking-widest hover:bg-zinc-700 transition-all">Change</button>
              </div>
            </div>
          </section>

          {/* Coming Soon Features */}
          <section>
            <h3 className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em] mb-4">Integrations</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-6 opacity-60 grayscale-[0.5] relative overflow-hidden group">
                <div className="absolute top-3 right-3 px-2 py-0.5 bg-indigo-500/20 text-indigo-400 text-[8px] font-black uppercase tracking-widest rounded">Coming Soon</div>
                <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center text-xl mb-3">🔑</div>
                <h4 className="text-xs font-black text-white uppercase tracking-widest mb-1">API Key Management</h4>
                <p className="text-[10px] text-zinc-600 leading-relaxed">Securely connect your Binance, Bybit, or OKX accounts for real-time automated trading.</p>
              </div>
              <div className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-6 opacity-60 grayscale-[0.5] relative overflow-hidden group">
                <div className="absolute top-3 right-3 px-2 py-0.5 bg-indigo-500/20 text-indigo-400 text-[8px] font-black uppercase tracking-widest rounded">Coming Soon</div>
                <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center text-xl mb-3">📱</div>
                <h4 className="text-xs font-black text-white uppercase tracking-widest mb-1">Telegram Sync</h4>
                <p className="text-[10px] text-zinc-600 leading-relaxed">Receive instant trade executions, margin calls, and price alerts directly in your Telegram bot.</p>
              </div>
            </div>
          </section>

          {/* Danger Zone */}
          <section className="pt-4">
            <div className="bg-rose-500/5 border border-rose-500/20 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="text-xs font-black text-rose-400 uppercase tracking-widest mb-1">Close Account</h4>
                <p className="text-[10px] text-rose-500/60 leading-relaxed">Permanently delete your account and all associated trading data. This action is irreversible.</p>
              </div>
              <button className="px-6 py-2.5 bg-rose-500/10 border border-rose-500/20 rounded-xl text-[10px] font-black text-rose-500 uppercase tracking-widest hover:bg-rose-500/20 transition-all shrink-0">Delete</button>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};

export default SettingsPage;

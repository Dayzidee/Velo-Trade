import React, { useState } from 'react';

type WalletTab = 'overview' | 'deposit' | 'withdraw' | 'transfer' | 'history';

interface Transaction {
  id: string;
  type: 'deposit' | 'withdrawal' | 'transfer';
  amount: number;
  currency: string;
  status: 'completed' | 'pending' | 'failed';
  date: string;
  address?: string;
}

const MOCK_TRANSACTIONS: Transaction[] = [
  { id: 'TX001', type: 'deposit', amount: 500, currency: 'USDT', status: 'completed', date: '2024-01-15 14:32', address: '0x1a2b...9f4e' },
  { id: 'TX002', type: 'withdrawal', amount: 200, currency: 'USDT', status: 'completed', date: '2024-01-14 09:15', address: '0x3c4d...7a8b' },
  { id: 'TX003', type: 'transfer', amount: 1000, currency: 'USDT', status: 'completed', date: '2024-01-13 16:45' },
  { id: 'TX004', type: 'deposit', amount: 2500, currency: 'USDT', status: 'pending', date: '2024-01-12 11:20', address: '0x5e6f...2c3d' },
  { id: 'TX005', type: 'withdrawal', amount: 150, currency: 'BTC', status: 'failed', date: '2024-01-11 08:00', address: 'bc1q...x9z2' },
];

interface WalletDashboardProps {
  onBack: () => void;
}

const WalletDashboard: React.FC<WalletDashboardProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<WalletTab>('overview');
  const [withdrawAddress, setWithdrawAddress] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [transferAmount, setTransferAmount] = useState('');
  const [transferDirection, setTransferDirection] = useState<'main-to-trade' | 'trade-to-main'>('main-to-trade');

  const mainBalance = 5420.50;
  const tradingBalance = 10000.00;
  const totalBalance = mainBalance + tradingBalance;

  const tabs: { id: WalletTab; label: string; icon: string }[] = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'deposit', label: 'Deposit', icon: '📥' },
    { id: 'withdraw', label: 'Withdraw', icon: '📤' },
    { id: 'transfer', label: 'Transfer', icon: '🔄' },
    { id: 'history', label: 'History', icon: '📜' },
  ];

  return (
    <div className="flex-1 flex flex-col bg-zinc-950 overflow-hidden">
      {/* Header */}
      <div className="h-14 md:h-16 border-b border-zinc-900 flex items-center px-4 md:px-6 gap-4 shrink-0">
        <button onClick={onBack} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-zinc-900 text-zinc-500 hover:text-white transition-all">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
        </button>
        <h2 className="text-sm font-black text-white uppercase tracking-widest italic">Wallet</h2>
      </div>

      {/* Tab Bar */}
      <div className="flex border-b border-zinc-900 px-2 md:px-4 gap-1 overflow-x-auto shrink-0">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-3 md:px-4 py-3 text-[9px] md:text-[10px] font-black uppercase tracking-widest transition-all border-b-2 whitespace-nowrap ${
              activeTab === tab.id ? 'text-cyan-400 border-cyan-400' : 'text-zinc-600 border-transparent hover:text-zinc-400'
            }`}
          >
            <span>{tab.icon}</span>
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8">
        {/* Overview */}
        {activeTab === 'overview' && (
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6">
              <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Total Balance</span>
              <p className="text-3xl md:text-4xl font-black text-white mt-2">${totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-5">
                <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Main Wallet</span>
                <p className="text-xl font-black text-white mt-1">${mainBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
                <div className="h-1.5 bg-zinc-800 rounded-full mt-3">
                  <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${(mainBalance / totalBalance) * 100}%` }} />
                </div>
              </div>
              <div className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-5">
                <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Trading Wallet</span>
                <p className="text-xl font-black text-white mt-1">${tradingBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
                <div className="h-1.5 bg-zinc-800 rounded-full mt-3">
                  <div className="h-full bg-cyan-500 rounded-full" style={{ width: `${(tradingBalance / totalBalance) * 100}%` }} />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Deposit */}
        {activeTab === 'deposit' && (
          <div className="max-w-md mx-auto space-y-6">
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 text-center">
              <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Deposit Address (USDT - TRC20)</span>
              <div className="w-48 h-48 bg-white rounded-2xl mx-auto mt-4 flex items-center justify-center">
                <div className="grid grid-cols-8 gap-0.5 w-36 h-36">
                  {Array.from({ length: 64 }).map((_, i) => (
                    <div key={i} className={`w-full aspect-square ${Math.random() > 0.5 ? 'bg-black' : 'bg-white'}`} />
                  ))}
                </div>
              </div>
              <div className="mt-4 bg-zinc-800/60 rounded-xl px-4 py-3 flex items-center justify-between gap-2">
                <code className="text-xs text-zinc-300 font-mono truncate">TXd9f3a2b1c4e5...7k8m9n0p</code>
                <button className="text-[9px] font-black uppercase text-cyan-400 hover:text-cyan-300 shrink-0">Copy</button>
              </div>
              <p className="text-[10px] text-zinc-600 mt-3">Only send USDT (TRC-20) to this address. Min deposit: $10.</p>
            </div>
          </div>
        )}

        {/* Withdraw */}
        {activeTab === 'withdraw' && (
          <div className="max-w-md mx-auto space-y-4">
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 space-y-4">
              <div>
                <label className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest block mb-2">Wallet Address</label>
                <input
                  type="text" value={withdrawAddress} onChange={e => setWithdrawAddress(e.target.value)}
                  placeholder="Enter external wallet address"
                  className="w-full bg-zinc-800/60 border border-zinc-700 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-indigo-500/50 transition-all"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest block mb-2">Amount</label>
                <div className="relative">
                  <input
                    type="text" value={withdrawAmount} onChange={e => setWithdrawAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full bg-zinc-800/60 border border-zinc-700 rounded-xl px-4 py-3 pr-20 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-indigo-500/50 transition-all"
                  />
                  <button className="absolute right-3 top-1/2 -translate-y-1/2 text-[9px] font-black uppercase text-cyan-400">MAX</button>
                </div>
                <span className="text-[10px] text-zinc-600 mt-1 block">Available: ${mainBalance.toFixed(2)}</span>
              </div>
              <button className="w-full py-3.5 velo-gradient rounded-xl text-xs font-black text-white uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all">
                Withdraw
              </button>
            </div>
          </div>
        )}

        {/* Transfer */}
        {activeTab === 'transfer' && (
          <div className="max-w-md mx-auto space-y-4">
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 space-y-5">
              <div className="flex items-center justify-between">
                <div className="flex-1 text-center">
                  <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest block">
                    {transferDirection === 'main-to-trade' ? 'Main Wallet' : 'Trading Wallet'}
                  </span>
                  <span className="text-lg font-black text-white">
                    ${transferDirection === 'main-to-trade' ? mainBalance.toFixed(2) : tradingBalance.toFixed(2)}
                  </span>
                </div>
                <button
                  onClick={() => setTransferDirection(d => d === 'main-to-trade' ? 'trade-to-main' : 'main-to-trade')}
                  className="w-10 h-10 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-cyan-400 hover:bg-zinc-700 transition-all"
                >
                  ⇄
                </button>
                <div className="flex-1 text-center">
                  <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest block">
                    {transferDirection === 'main-to-trade' ? 'Trading Wallet' : 'Main Wallet'}
                  </span>
                  <span className="text-lg font-black text-white">
                    ${transferDirection === 'main-to-trade' ? tradingBalance.toFixed(2) : mainBalance.toFixed(2)}
                  </span>
                </div>
              </div>
              <div>
                <label className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest block mb-2">Amount</label>
                <input
                  type="text" value={transferAmount} onChange={e => setTransferAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full bg-zinc-800/60 border border-zinc-700 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-indigo-500/50 transition-all"
                />
              </div>
              <button className="w-full py-3.5 velo-gradient rounded-xl text-xs font-black text-white uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all">
                Transfer
              </button>
            </div>
          </div>
        )}

        {/* History */}
        {activeTab === 'history' && (
          <div className="max-w-2xl mx-auto">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[500px]">
                <thead>
                  <tr className="border-b border-zinc-800">
                    {['Type', 'Amount', 'Status', 'Date', 'Address'].map(h => (
                      <th key={h} className="px-3 py-2.5 text-left text-[9px] font-black text-zinc-600 uppercase tracking-widest">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {MOCK_TRANSACTIONS.map(tx => (
                    <tr key={tx.id} className="border-b border-zinc-900/30 hover:bg-zinc-900/30 transition-all">
                      <td className="px-3 py-3">
                        <span className={`text-[10px] font-black px-2 py-0.5 rounded capitalize ${
                          tx.type === 'deposit' ? 'bg-emerald-500/10 text-emerald-400' :
                          tx.type === 'withdrawal' ? 'bg-rose-500/10 text-rose-400' :
                          'bg-cyan-500/10 text-cyan-400'
                        }`}>
                          {tx.type}
                        </span>
                      </td>
                      <td className="px-3 py-3 text-xs font-black text-white">${tx.amount.toFixed(2)} {tx.currency}</td>
                      <td className="px-3 py-3">
                        <span className={`text-[10px] font-bold capitalize ${
                          tx.status === 'completed' ? 'text-emerald-400' :
                          tx.status === 'pending' ? 'text-amber-400' :
                          'text-rose-400'
                        }`}>
                          {tx.status}
                        </span>
                      </td>
                      <td className="px-3 py-3 text-[10px] text-zinc-600">{tx.date}</td>
                      <td className="px-3 py-3 text-[10px] text-zinc-600 font-mono">{tx.address || '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WalletDashboard;

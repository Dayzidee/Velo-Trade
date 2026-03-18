import React, { useState } from 'react';
import { View } from '../../App';
import UserManagement from './UserManagement';
import { useAuth } from '../../context/AuthContext';

interface AdminPortalProps {
  navigateTo: (view: View) => void;
}

const AdminPortal: React.FC<AdminPortalProps> = ({ navigateTo }) => {
  const [activeTab, setActiveTab] = useState<'users' | 'stats' | 'settings'>('users');
  const { signOut } = useAuth();

  return (
    <div className="fixed inset-0 bg-[#07080a] flex flex-col md:flex-row overflow-hidden text-zinc-300 font-sans select-none">
      
      {/* Admin Sidebar */}
      <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-zinc-900 bg-zinc-950 flex flex-col shrink-0">
        <div className="p-6 border-b border-zinc-900 flex items-center gap-3">
          <div className="w-8 h-8 velo-gradient rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <span className="text-white font-black text-xs italic">A</span>
          </div>
          <div>
            <h1 className="text-sm font-black text-white uppercase tracking-tighter leading-none">Admin Portal</h1>
            <span className="text-[9px] font-black text-cyan-500 uppercase tracking-widest mt-1">Status: God Mode</span>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto custom-scrollbar">
          {[
            { id: 'users', label: 'User Management', icon: '👥' },
            { id: 'stats', label: 'Platform Stats', icon: '📊' },
            { id: 'settings', label: 'Global Settings', icon: '⚙️' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                activeTab === tab.id ? 'bg-zinc-900 text-cyan-400 border border-zinc-800' : 'text-zinc-600 hover:text-white hover:bg-zinc-900/50'
              }`}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-zinc-900 space-y-2">
          <button 
            onClick={() => navigateTo('trading')}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-black uppercase tracking-widest text-zinc-600 hover:text-white transition-all"
          >
            <span>←</span> Back to Terminal
          </button>
          <button 
            onClick={signOut}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-black uppercase tracking-widest text-rose-500 hover:bg-rose-500/10 transition-all border border-transparent hover:border-rose-500/20"
          >
            <span>⏻</span> Sign Out
          </button>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden p-6 md:p-10">
        {activeTab === 'users' && <UserManagement />}
        {activeTab === 'stats' && (
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-6">
              <span className="text-3xl">📊</span>
            </div>
            <h3 className="text-xl font-black text-white uppercase tracking-widest italic mb-2">Platform Statistics</h3>
            <p className="text-zinc-600 text-sm max-w-md">Comprehensive metrics visualization coming soon to God Mode.</p>
          </div>
        )}
        {activeTab === 'settings' && (
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-6">
              <span className="text-3xl">⚙️</span>
            </div>
            <h3 className="text-xl font-black text-white uppercase tracking-widest italic mb-2">Global Settings</h3>
            <p className="text-zinc-600 text-sm max-w-md">Master platform overrides and global configuration parameters coming soon.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminPortal;

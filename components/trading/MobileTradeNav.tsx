import React from 'react';

export type MobileTab = 'chart' | 'trade' | 'positions' | 'more';

interface MobileTradeNavProps {
  activeTab: MobileTab;
  onTabChange: (tab: MobileTab) => void;
}

const tabs: { id: MobileTab; label: string; icon: string }[] = [
  { id: 'chart', label: 'Chart', icon: '📊' },
  { id: 'trade', label: 'Trade', icon: '💱' },
  { id: 'positions', label: 'Positions', icon: '📋' },
  { id: 'more', label: 'More', icon: '⚙️' },
];

const MobileTradeNav: React.FC<MobileTradeNavProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-zinc-950/95 backdrop-blur-xl border-t border-zinc-800 safe-area-bottom">
      <div className="flex items-center justify-around h-14">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex flex-col items-center gap-0.5 px-4 py-1.5 rounded-xl transition-all ${
              activeTab === tab.id
                ? 'text-cyan-400'
                : 'text-zinc-600 active:text-zinc-400'
            }`}
          >
            <span className="text-lg">{tab.icon}</span>
            <span className="text-[9px] font-black uppercase tracking-widest">{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MobileTradeNav;

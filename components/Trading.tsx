import React, { useState, useEffect } from 'react';
import { View } from '../App';
import { useMarketData } from '../hooks/useMarketData';
import CandlestickChart from './trading/CandlestickChart';
import MobileTradeNav, { MobileTab } from './trading/MobileTradeNav';
import RightPanel from './trading/RightPanel';
import AssetSelector, { TradingPair } from './trading/AssetSelector';
import OrderPanel from './trading/OrderPanel';
import PositionsPanel from './trading/PositionsPanel';
import WalletDashboard from './wallet/WalletDashboard';
import CopyTradingHub from './social/CopyTradingHub';
import SettingsPage from './settings/SettingsPage';
import ProfilePage from './settings/ProfilePage';
import { useAuth } from '../context/AuthContext';
import { useTrades } from '../hooks/useTrades';
import { doc, updateDoc, increment } from 'firebase/firestore';
import { db } from '../lib/firebase';

interface TradingProps {
  navigateTo: (view: View) => void;
}

const SIDE_TABS = [
  { id: 'trade', label: 'Terminal', icon: '📊' },
  { id: 'finances', label: 'Portfolio', icon: '💰' },
  { id: 'social', label: 'Social', icon: '👥' },
  { id: 'profile', label: 'Account', icon: '👤' },
  { id: 'education', label: 'Academy', icon: '📚' },
  { id: 'help', label: 'Support', icon: '❓' },
];

const Trading: React.FC<TradingProps> = ({ navigateTo }) => {
  const [selectedPair, setSelectedPair] = useState<TradingPair>({
    symbol: 'BTCUSDT',
    displayName: 'BTC / USDT',
    icon: '₿',
    price: 0,
    change24h: 0,
    volume: '—',
    category: 'crypto',
  });

  const { candles, ticker, isConnected } = useMarketData(selectedPair.symbol);

  const [activeSideTab, setActiveSideTab] = useState('trade');
  const [investment, setInvestment] = useState(10);
  const [duration] = useState('00:01:00');
  const { user, userData } = useAuth();
  const { trades } = useTrades();
  
  const [accountType, setAccountType] = useState<'demo' | 'real'>('demo');
  const balance = accountType === 'demo' ? (userData?.demoBalance ?? 10000) : (userData?.realBalance ?? 0);
  
  const [walletTab, setWalletTab] = useState<'overview' | 'deposit'>('overview');
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
  const [rightPanelOpen, setRightPanelOpen] = useState(false);
  const [assetSelectorOpen, setAssetSelectorOpen] = useState(false);
  const [positionsExpanded, setPositionsExpanded] = useState(false);
  const [mobileTab, setMobileTab] = useState<MobileTab>('trade');
  const [isOrderPanelExpanded, setIsOrderPanelExpanded] = useState(false);

  // Logic to monitor and close expired trades
  useEffect(() => {
    if (!user || trades.length === 0) return;

    const interval = setInterval(async () => {
      const now = Date.now();
      const openTrades = trades.filter(t => t.status === 'open');

      for (const trade of openTrades) {
        if (now >= trade.expiryTime) {
          // Determine Win/Loss
          // Note: In a real binary options app, we need the price at the EXACT expiry time.
          // For this simulation, we'll use the currentPrice if it's the active symbol,
          // or just assume the last entryPrice if not (though that's not ideal).
          
          let result: 'win' | 'loss' | 'draw' = 'draw';
          const exitPrice = trade.symbol === selectedPair.symbol ? ticker.currentPrice : trade.entryPrice;
          
          if (trade.type === 'buy') {
            result = exitPrice > trade.entryPrice ? 'win' : (exitPrice < trade.entryPrice ? 'loss' : 'draw');
          } else {
            result = exitPrice < trade.entryPrice ? 'win' : (exitPrice > trade.entryPrice ? 'loss' : 'draw');
          }

          const payoutRatio = 0.85;
          const payout = result === 'win' ? (trade.amount * (1 + payoutRatio)) : (result === 'draw' ? trade.amount : 0);
          const profit = payout - trade.amount;

          // Update Trade in Firestore
          const tradeRef = doc(db, 'trades', trade.id);
          await updateDoc(tradeRef, {
            status: 'closed',
            result,
            payout,
            exitPrice // added field for clarity
          });

          // Update User Balance in Firestore
          const userRef = doc(db, 'users', user.uid);
          const balanceField = trade.accountType === 'demo' ? 'demoBalance' : 'realBalance';
          
          await updateDoc(userRef, {
            [balanceField]: increment(profit),
            // Track stats too
            trades: increment(1),
            profit: increment(profit > 0 ? profit : 0)
          });
        }
      }
    }, 2000); // Check every 2 seconds

    return () => clearInterval(interval);
  }, [trades, user, ticker.currentPrice, selectedPair.symbol]);

  const priceUp = ticker.priceChangePercent24h >= 0;

  const formatPrice = (p: number) => {
    if (p === 0) return '—';
    return p.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const formatVolume = (v: number) => {
    if (v >= 1_000_000) return (v / 1_000_000).toFixed(2) + 'M';
    if (v >= 1_000) return (v / 1_000).toFixed(2) + 'K';
    return v.toFixed(2);
  };

  const handleSelectPair = (pair: TradingPair) => {
    setSelectedPair(pair);
    // In real implementation, this would change the WebSocket subscription
  };



  return (
    <div className="fixed inset-0 bg-zinc-950 flex flex-col overflow-hidden text-zinc-300 font-sans select-none">

      {/* Asset Selector Drawer */}
      <AssetSelector
        isOpen={assetSelectorOpen}
        onClose={() => setAssetSelectorOpen(false)}
        selectedSymbol={selectedPair.symbol}
        onSelectPair={handleSelectPair}
      />

      {/* ═══ Top Header ═══ */}
      <div className="h-14 md:h-16 border-b border-zinc-900 flex items-center justify-between px-3 md:px-4 z-30 bg-zinc-950/80 backdrop-blur-xl shrink-0">
        <div className="flex items-center gap-3 md:gap-6">
          <button onClick={() => navigateTo('home')} className="flex items-center gap-2 group">
            <div className="w-7 h-7 md:w-8 md:h-8 velo-gradient rounded-lg flex items-center justify-center">
              <span className="text-white font-black text-xs md:text-sm italic">V</span>
            </div>
            <span className="text-lg md:text-xl font-black italic text-white hidden sm:block">VELO<span className="text-cyan-400">.</span></span>
          </button>

          <div className="h-8 w-px bg-zinc-900 hidden sm:block" />

          {/* Asset pair — clickable to open selector */}
          <button onClick={() => setAssetSelectorOpen(true)} className="flex items-center gap-2 md:gap-3 hover:bg-zinc-900/50 px-2 py-1.5 rounded-xl transition-all">
            <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-[#f7931a] flex items-center justify-center text-white font-black text-[10px] md:text-xs">
              {selectedPair.icon}
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] md:text-xs font-black text-white uppercase leading-none">{selectedPair.displayName}</span>
              <span className={`text-[9px] md:text-[10px] font-bold uppercase tracking-widest leading-none mt-0.5 ${priceUp ? 'text-emerald-500' : 'text-rose-500'}`}>
                {priceUp ? '▲' : '▼'} {ticker.priceChangePercent24h.toFixed(2)}%
              </span>
            </div>
            <svg className="w-3 h-3 text-zinc-600 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
          </button>

          <div className="h-8 w-px bg-zinc-900 hidden lg:block" />

          {/* Desktop price stats */}
          <div className="hidden lg:flex items-center gap-6">
            <div className="flex flex-col">
              <span className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest">Price</span>
              <span className={`text-sm font-black leading-none ${priceUp ? 'text-emerald-400' : 'text-rose-400'}`}>${formatPrice(ticker.currentPrice)}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest">24h High</span>
              <span className="text-sm font-black text-white leading-none">${formatPrice(ticker.high24h)}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest">24h Low</span>
              <span className="text-sm font-black text-white leading-none">${formatPrice(ticker.low24h)}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest">Vol</span>
              <span className="text-sm font-black text-white leading-none">{formatVolume(ticker.volume24h)}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          {/* Connection */}
          <div className="flex items-center gap-1.5 md:gap-2">
            <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-emerald-500 shadow-lg shadow-emerald-500/50' : 'bg-rose-500 shadow-lg shadow-rose-500/50'}`} />
            <span className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest hidden sm:block">
              {isConnected ? 'Live' : 'Offline'}
            </span>
          </div>

          <div className="flex flex-col items-end mr-2 relative">
            <button 
              onClick={() => setIsAccountDropdownOpen(!isAccountDropdownOpen)}
              className="flex flex-col items-end hover:bg-zinc-900/50 px-2 py-1 rounded-lg transition-all"
            >
              <div className="flex items-center gap-1">
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest leading-none">{accountType} Account</span>
                <svg className={`w-2 h-2 text-zinc-600 transition-transform ${isAccountDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
              </div>
              <span className="text-sm md:text-lg font-black text-white leading-none">${balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
            </button>

            {isAccountDropdownOpen && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl z-50 overflow-hidden py-1">
                <button 
                  onClick={() => { setAccountType('demo'); setIsAccountDropdownOpen(false); }}
                  className={`w-full px-4 py-2.5 text-left flex items-center justify-between hover:bg-zinc-800 transition-all ${accountType === 'demo' ? 'bg-zinc-800/50' : ''}`}
                >
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-white uppercase tracking-widest">Demo Account</span>
                    <span className="text-[9px] font-medium text-zinc-500">${(userData?.demoBalance ?? 10000).toLocaleString('en-US', { minimumFractionDigits: 2 })} Available</span>
                  </div>
                  {accountType === 'demo' && <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />}
                </button>
                <div className="h-px bg-zinc-800" />
                <button 
                  onClick={() => { setAccountType('real'); setIsAccountDropdownOpen(false); }}
                  className={`w-full px-4 py-2.5 text-left flex items-center justify-between hover:bg-zinc-800 transition-all ${accountType === 'real' ? 'bg-zinc-800/50' : ''}`}
                >
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-white uppercase tracking-widest">Real Account</span>
                    <span className="text-[9px] font-medium text-zinc-500">${(userData?.realBalance ?? 0).toLocaleString('en-US', { minimumFractionDigits: 2 })} Available</span>
                  </div>
                  {accountType === 'real' && <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />}
                </button>
              </div>
            )}
          </div>

          <button 
            onClick={() => {
              setActiveSideTab('finances');
              setWalletTab('deposit');
            }}
            className="px-4 md:px-6 py-2 md:py-2.5 velo-gradient rounded-xl text-[10px] md:text-xs font-black text-white uppercase tracking-widest shadow-lg shadow-indigo-500/20 border border-white/10 hover:scale-105 active:scale-95 transition-all"
          >
            Deposit
          </button>

          {/* Info toggle (mobile/tablet) */}
          <button
            onClick={() => setRightPanelOpen(prev => !prev)}
            className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500 hover:text-white transition-all xl:hidden"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </button>

          <div 
            onClick={() => setActiveSideTab('profile')}
            className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center group cursor-pointer overflow-hidden hidden sm:flex"
          >
            <div className="w-full h-full velo-gradient flex items-center justify-center font-black text-white text-sm">
              {(userData?.displayName || user?.displayName || 'V').charAt(0)}
            </div>
          </div>
        </div>
      </div>

      {/* ═══ Main Content Area ═══ */}
      <div className="flex-1 flex overflow-hidden">

        {/* Desktop Left Sidebar */}
        <div className="w-20 border-r border-zinc-900 flex flex-col items-center py-4 gap-3 bg-zinc-950/50 hidden md:flex shrink-0 overflow-y-auto">
          {SIDE_TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveSideTab(tab.id);
                if (tab.id === 'trade') setMobileTab('chart');
                if (tab.id === 'finances') setWalletTab('overview');
              }}
              className={`flex flex-col items-center gap-1 group transition-all shrink-0 ${activeSideTab === tab.id ? 'text-cyan-400' : 'text-zinc-600 hover:text-white'}`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-base transition-all border ${activeSideTab === tab.id ? 'bg-zinc-900 border-indigo-500/50 shadow-lg shadow-indigo-500/10' : 'border-transparent group-hover:bg-zinc-900'}`}>
                {tab.icon}
              </div>
              <span className="text-[8px] font-black uppercase tracking-widest opacity-60 group-hover:opacity-100">{tab.label}</span>
            </button>
          ))}
          <div className="mt-auto flex flex-col items-center gap-3 pb-4 shrink-0">
            <button 
              onClick={() => setActiveSideTab('settings')}
              className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all ${activeSideTab === 'settings' ? 'text-cyan-400 bg-zinc-900 border-indigo-500/50' : 'text-zinc-600 hover:text-white border-transparent hover:bg-zinc-900'}`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            </button>
          </div>
        </div>

        {/* Dynamic Content Area */}
        <div className="flex-1 relative bg-[#0d1017] flex flex-col min-w-0">
          
          {activeSideTab === 'trade' && (
            <>
              {/* Chart view */}
              <div className={`flex-1 relative overflow-hidden ${mobileTab !== 'trade' ? 'hidden md:block' : ''}`}>
                <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
                  <span className="text-[150px] md:text-[250px] font-black italic select-none">VELO</span>
                </div>
                <div className="absolute inset-0 p-0 md:p-1">
                  {candles.length > 0 ? (
                    <CandlestickChart candles={candles} currentPrice={ticker.currentPrice} />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                        <span className="text-xs font-bold text-zinc-600 uppercase tracking-widest">Loading chart data...</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Mobile: Social tab content */}
              {mobileTab === 'social' && (
                <div className="flex-1 md:hidden overflow-y-auto bg-zinc-950">
                  <CopyTradingHub onNavigate={() => {}} />
                </div>
              )}

              {/* Mobile: Positions tab content */}
              {mobileTab === 'positions' && (
                <div className="flex-1 md:hidden overflow-y-auto">
                  <PositionsPanel 
                    isExpanded={true} 
                    onToggle={() => {}} 
                    currentPrice={ticker.currentPrice}
                    symbol={selectedPair.symbol}
                  />
                </div>
              )}

              {/* Mobile: More tab content */}
              {mobileTab === 'more' && (
                <div className="flex-1 md:hidden p-6 space-y-4 overflow-y-auto">
                  <h3 className="text-sm font-black text-white uppercase tracking-widest italic mb-4">Quick Actions</h3>
                  {[
                    { id: 'markets', label: 'Trade Terminal', icon: '📊', desc: 'Advanced trading interface', action: () => setAssetSelectorOpen(true) },
                    { id: 'finances', label: 'Portfolio', icon: '💰', desc: 'Manage funds and transfers' },
                    { id: 'social', label: 'Social Hub', icon: '👥', desc: 'Follow professional master traders' },
                    { id: 'education', label: 'Velo Academy', icon: '📚', desc: 'Master the art of trading' },
                    { id: 'profile', label: 'Account', icon: '👤', desc: 'Identity and performance stats' },
                    { id: 'settings', label: 'Settings', icon: '⚙️', desc: 'Security and preferences' },
                  ].map(item => (
                    <button
                      key={item.id}
                      onClick={() => {
                        if (item.id === 'markets') setAssetSelectorOpen(true);
                        else {
                          setActiveSideTab(item.id);
                          setMobileTab('chart');
                        }
                      }}
                      className="w-full flex items-center gap-4 p-4 bg-zinc-900/60 border border-zinc-800 rounded-2xl hover:bg-zinc-900 transition-all text-left underline-none"
                    >
                      <span className="text-2xl">{item.icon}</span>
                      <div>
                        <span className="text-xs font-black text-white uppercase tracking-widest">{item.label}</span>
                        <p className="text-[10px] text-zinc-600 font-medium mt-0.5">{item.desc}</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {/* Desktop: Positions panel below chart */}
              <div className={`hidden md:block`}>
                <PositionsPanel 
                  isExpanded={positionsExpanded} 
                  onToggle={() => setPositionsExpanded(p => !p)} 
                  currentPrice={ticker.currentPrice}
                  symbol={selectedPair.symbol}
                />
              </div>

              {/* Order Panel: always visible on desktop, on mobile only in trade tab */}
              <div className={`${mobileTab !== 'trade' ? 'hidden md:block' : ''}`}>
                <OrderPanel 
                  investment={investment}
                  setInvestment={setInvestment}
                  duration={duration}
                  currentPrice={ticker.currentPrice}
                  symbol={selectedPair.symbol}
                  accountType={accountType}
                  isExpanded={isOrderPanelExpanded}
                  onToggleExpand={() => setIsOrderPanelExpanded(prev => !prev)}
                />
              </div>
            </>
          )}

          {activeSideTab === 'finances' && (
            <WalletDashboard onBack={() => setActiveSideTab('trade')} initialTab={walletTab as any} />
          )}

          {activeSideTab === 'social' && (
            <CopyTradingHub onBack={() => setActiveSideTab('trade')} />
          )}

          {activeSideTab === 'profile' && (
            <ProfilePage onBack={() => setActiveSideTab('trade')} navigateTo={navigateTo} />
          )}

          {activeSideTab === 'settings' && (
            <SettingsPage onBack={() => setActiveSideTab('trade')} />
          )}

          {(activeSideTab === 'education' || activeSideTab === 'help') && (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-zinc-950">
               <div className="w-20 h-20 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-6">
                 <span className="text-3xl">📚</span>
               </div>
               <h3 className="text-xl font-black text-white uppercase tracking-widest italic mb-2">Learn & Support</h3>
               <p className="text-zinc-600 text-sm max-w-md">
                 Education content and help resources are currently being updated.
               </p>
               <button 
                 onClick={() => setActiveSideTab('trade')}
                 className="mt-8 text-[10px] font-black uppercase tracking-widest text-cyan-400 hover:text-cyan-300 transition-all"
               >
                 ← Back to Trading
               </button>
            </div>
          )}
        </div>

        {/* Desktop Right Panel (only in trade view) */}
        {activeSideTab === 'trade' && (
          <div className="hidden xl:flex w-[340px] border-l border-zinc-900 bg-zinc-950/80 flex-col shrink-0">
            <RightPanel ticker={ticker} symbol={selectedPair.symbol} isOpen={true} onToggle={() => setRightPanelOpen(false)} />
          </div>
        )}
      </div>

      {/* Mobile/Tablet: Floating Right Panel */}
      <div className="xl:hidden">
        <RightPanel ticker={ticker} symbol={selectedPair.symbol} isOpen={rightPanelOpen} onToggle={() => setRightPanelOpen(false)} />
      </div>

      {/* Mobile Bottom Nav (only in trade view) */}
      {activeSideTab === 'trade' && (
        <MobileTradeNav activeTab={mobileTab} onTabChange={setMobileTab} />
      )}

      {/* Bottom spacing for mobile nav */}
      <div className="h-14 md:hidden shrink-0" />
    </div>
  );
};

export default Trading;

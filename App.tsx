
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import Instruments from './components/Instruments';
import Markets from './components/Markets';
import CopyTrading from './components/CopyTrading';
import Education from './components/Education';
import Login from './components/Login';
import Register from './components/Register';
import Footer from './components/Footer';
import FAQ from './components/FAQ';
import Terms from './components/Terms';
import PrivacyPolicy from './components/PrivacyPolicy';
import Regulation from './components/Regulation';
import Trading from './components/Trading';

export type View = 'home' | 'login' | 'register' | 'faq' | 'terms' | 'privacy' | 'regulation' | 'trading';

const App: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentView, setCurrentView] = useState<View>('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigateTo = (view: View) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 overflow-x-hidden scroll-smooth">
      {/* Dynamic Header - Hidden when in trading mode for full immersion */}
      {currentView !== 'trading' && (
        <Header isScrolled={isScrolled} navigateTo={navigateTo} currentView={currentView} />
      )}
      
      <main>
        {currentView === 'home' && (
          <>
            <Hero navigateTo={navigateTo} />
            <Stats />
            <Features />
            <HowItWorks />
            <Markets />
            <CopyTrading />
            <Instruments navigateTo={navigateTo} />
            <Education />
          </>
        )}

        {currentView === 'login' && (
          <Login navigateTo={navigateTo} />
        )}

        {currentView === 'register' && (
          <Register navigateTo={navigateTo} />
        )}

        {currentView === 'faq' && (
          <FAQ navigateTo={navigateTo} />
        )}

        {currentView === 'terms' && (
          <Terms navigateTo={navigateTo} />
        )}

        {currentView === 'privacy' && (
          <PrivacyPolicy navigateTo={navigateTo} />
        )}

        {currentView === 'regulation' && (
          <Regulation navigateTo={navigateTo} />
        )}

        {currentView === 'trading' && (
          <Trading navigateTo={navigateTo} />
        )}
        
        {/* Background Decorative Elements - Only for non-trading views */}
        {currentView !== 'trading' && (
          <>
            <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-purple-600/5 blur-[120px] rounded-full pointer-events-none -z-10"></div>
            <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-cyan-600/5 blur-[120px] rounded-full pointer-events-none -z-10"></div>
          </>
        )}
      </main>

      {/* Global Footer - Hidden in trading mode */}
      {currentView !== 'trading' && (
        <Footer navigateTo={navigateTo} />
      )}
    </div>
  );
};

export default App;

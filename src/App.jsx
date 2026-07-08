import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import IdpBanner from './components/IdpBanner';
import IdpList from './components/IdpList';
import IdpDetail from './components/IdpDetail';
import SkillGrowthPlan from './components/SkillGrowthPlan';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('home');

  return (
    <div className="app-container">
      <Header />
      <div className="main-content">
        <Sidebar />
        <main className="content-area">
          <AnimatePresence mode="wait">
            {currentView === 'home' && (
              <motion.div
                key="home"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <IdpBanner onSelectPlan={(plan) => {
                  localStorage.removeItem('idp_draft');
                  setCurrentView(plan);
                }} />
                <IdpList onSelectPlan={(plan) => {
                  localStorage.removeItem('idp_draft');
                  setCurrentView(plan);
                }} />
              </motion.div>
            )}
            {currentView === 'idp-detail' && (
              <motion.div
                key="detail"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <IdpDetail onBack={() => setCurrentView('home')} />
              </motion.div>
            )}
            {currentView === 'skill-growth' && (
              <motion.div
                key="wizard"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3 }}
              >
                <SkillGrowthPlan onComplete={() => setCurrentView('idp-detail')} />
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

export default App;

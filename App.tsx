import React, { useState, useEffect, useCallback } from 'react';
import { NavItem, MoodEntry } from './types';
import Header from './components/Header';
import DiaryPage from './pages/DiaryPage';
import HistoryPage from './pages/HistoryPage';
import CommunityPage from './pages/CommunityPage';
import SupportPage from './pages/SupportPage';
import GratitudePage from './pages/GratitudePage';
import SafetyPlanPage from './pages/SafetyPlanPage';
import ResourcesPage from './pages/ResourcesPage';
import SettingsPage from './pages/SettingsPage';
import RateUsPage from './pages/RateUsPage';
import EmotionalAlertModal from './components/EmotionalAlertModal';
import CrisisModal from './components/CrisisModal';
import LoginPage from './pages/LoginPage';
import ApiKeySetupPage from './pages/ApiKeySetupPage';
import {
  apiLogin,
  apiRegister,
  apiCreateMood,
  apiGetUserMoods
} from "./services/api";

const App: React.FC = () => {
  const [theme, setTheme] = useState(localStorage.getItem('mood-tracker-theme') || 'light');
  const [activeView, setActiveView] = useState<NavItem>('Diary & Tracker' as NavItem);
  const [showEmotionalAlert, setShowEmotionalAlert] = useState(false);
  const [showCrisisModal, setShowCrisisModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [apiKey, setApiKey] = useState<string | null>(() =>
    localStorage.getItem('gemini-api-key')
  );
  const [backendStatus, setBackendStatus] = useState<'checking' | 'online' | 'offline'>('checking');

  // Backend health check using fetch directly
  useEffect(() => {
    const checkBackendConnection = async () => {
      try {
        await fetch("http://localhost:5000/api/test"); // backend health endpoint
        setBackendStatus('online');
        console.log('✅ Backend connection successful');
      } catch (error) {
        console.error('❌ Backend connection failed:', error);
        setBackendStatus('offline');
      }
    };

    checkBackendConnection();

    const loggedInStatus = localStorage.getItem('mood-tracker-loggedIn') === 'true';
    setIsLoggedIn(loggedInStatus);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') root.classList.add('dark');
    else root.classList.remove('dark');
    localStorage.setItem('mood-tracker-theme', theme);
  }, [theme]);

  const handleApiKeySet = (key: string) => {
    localStorage.setItem('gemini-api-key', key);
    setApiKey(key);
  };

  const handleLogin = (token, user) => {
  localStorage.setItem('mood-tracker-loggedIn', 'true');
  setIsLoggedIn(true);
};


  const handleLogout = () => {
    localStorage.removeItem('mood-tracker-loggedIn');
    setIsLoggedIn(false);
    setActiveView('Diary & Tracker' as NavItem);
  };

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  const runEmotionalStateCheck = useCallback(() => {
    if (!isLoggedIn || showCrisisModal || showEmotionalAlert) return;
    try {
      const entriesJSON = localStorage.getItem('mood-tracker-entries');
      if (!entriesJSON) return;
      const entries: MoodEntry[] = JSON.parse(entriesJSON);
      if (entries.length < 7) return;
      const sortedEntries = [...entries].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      const recentEntries = sortedEntries.slice(0, 7);
      const isConsistentlyLow = recentEntries.every(e => e.mood === 'Sad' || e.mood === 'Depressed');
      if (isConsistentlyLow) setShowEmotionalAlert(true);
    } catch (error) {
      console.error("Failed to check emotional state:", error);
    }
  }, [isLoggedIn, showCrisisModal, showEmotionalAlert]);

  useEffect(() => {
    const handleCrisisEvent = () => setShowCrisisModal(true);
    window.addEventListener('crisisDetected', handleCrisisEvent);
    return () => window.removeEventListener('crisisDetected', handleCrisisEvent);
  }, []);

  useEffect(() => runEmotionalStateCheck(), [runEmotionalStateCheck]);

  if (backendStatus === 'checking') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-700 dark:text-gray-300">Connecting to the server...</p>
        </div>
      </div>
    );
  }

  if (backendStatus === 'offline') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
        <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Connection Error</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            We're having trouble connecting to the server. Please check your internet connection and try again.
          </p>
          <button onClick={() => window.location.reload()} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  if (!apiKey) return <ApiKeySetupPage onApiKeySet={handleApiKeySet} />;
  if (!isLoggedIn) return <LoginPage onLogin={handleLogin} />;

  const renderContent = () => {
    switch(activeView){
      case 'Diary & Tracker': return <DiaryPage onEntrySaved={runEmotionalStateCheck} />;
      case 'History': return <HistoryPage />;
      case 'Community': return <CommunityPage />;
      case 'Support': return <SupportPage />;
      case 'Gratitude': return <GratitudePage />;
      case 'My Safety Plan': return <SafetyPlanPage />;
      case 'Resources': return <ResourcesPage />;
      case 'Settings': return <SettingsPage theme={theme} toggleTheme={toggleTheme} />;
      case 'Rate Us': return <RateUsPage />;
      default: return <DiaryPage onEntrySaved={runEmotionalStateCheck} />;
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 transition-colors duration-300 font-sans">
      <Header activeView={activeView} setActiveView={setActiveView} toggleTheme={toggleTheme} theme={theme} onLogout={handleLogout} onHelpNow={() => setShowCrisisModal(true)} />
      <main className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto">{renderContent()}</main>
      <EmotionalAlertModal isOpen={showEmotionalAlert} onClose={() => setShowEmotionalAlert(false)} onNavigate={setActiveView} />
      <CrisisModal isOpen={showCrisisModal} onClose={() => setShowCrisisModal(false)} onNavigate={setActiveView} />
    </div>
  );
};

export default App;

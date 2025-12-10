import React from 'react';
import { NavItem } from '../types';
import { DiaryIcon, HistoryIcon, GratitudeIcon, CommunityIcon, ShieldIcon, SupportIcon, ResourcesIcon, SettingsIcon, SunIcon, MoonIcon, LogoutIcon, StarIcon, WarningIcon } from './icons';

interface HeaderProps {
  activeView: NavItem;
  setActiveView: (view: NavItem) => void;
  toggleTheme: () => void;
  theme: string;
  onLogout: () => void;
  onHelpNow: () => void;
}

const navItems: { name: NavItem; icon: React.FC<any> }[] = [
  { name: 'Diary & Tracker', icon: DiaryIcon },
  { name: 'History', icon: HistoryIcon },
  { name: 'Gratitude', icon: GratitudeIcon },
  { name: 'Community', icon: CommunityIcon },
  { name: 'My Safety Plan', icon: ShieldIcon },
  { name: 'Support', icon: SupportIcon },
  { name: 'Resources', icon: ResourcesIcon },
  { name: 'Rate Us', icon: StarIcon },
];

const Header: React.FC<HeaderProps> = ({ activeView, setActiveView, toggleTheme, theme, onLogout, onHelpNow }) => {
  return (
    <header className="bg-white dark:bg-slate-800 shadow-md sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-primary">MoodTracker</h1>
          </div>
          <nav className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => setActiveView(item.name)}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  activeView === item.name
                    ? 'bg-primary/20 text-primary dark:bg-primary/30'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                }`}
              >
                <item.icon className="w-5 h-5 mr-2" />
                {item.name}
              </button>
            ))}
          </nav>
          <div className="flex items-center space-x-2">
             <button onClick={onHelpNow} title="Get Help Now" className="flex items-center px-3 py-2 rounded-md text-sm font-medium bg-red-500 text-white hover:bg-red-600 transition-colors duration-200 animate-pulse">
                <WarningIcon className="w-5 h-5 mr-2" />
                Help Now
            </button>
             <button onClick={() => setActiveView('Settings')} title="Settings" className="p-2 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors duration-200">
                <SettingsIcon className="w-6 h-6" />
            </button>
             <button onClick={toggleTheme} className="p-2 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors duration-200">
              {theme === 'light' ? <MoonIcon className="w-6 h-6" /> : <SunIcon className="w-6 h-6" />}
            </button>
             <button onClick={onLogout} title="Logout" className="p-2 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors duration-200">
              <LogoutIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
       {/* Mobile Navigation */}
      <div className="md:hidden bg-white dark:bg-slate-800 p-2 overflow-x-auto">
          <nav className="flex items-center space-x-2">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => setActiveView(item.name)}
                className={`flex-shrink-0 flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  activeView === item.name
                    ? 'bg-primary/20 text-primary dark:bg-primary/30'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                }`}
              >
                <item.icon className="w-5 h-5 mr-2" />
                {item.name}
              </button>
            ))}
          </nav>
      </div>
    </header>
  );
};

export default Header;
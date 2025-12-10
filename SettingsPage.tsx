import React, { useState } from 'react';
import { SunIcon, MoonIcon } from '../components/icons';

interface SettingsPageProps {
    theme: string;
    toggleTheme: () => void;
}

const SettingsPage: React.FC<SettingsPageProps> = ({ theme, toggleTheme }) => {
    const [remindersEnabled, setRemindersEnabled] = useState(false);

    return (
        <div className="space-y-8 animate-fade-in max-w-2xl mx-auto">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg">
                <h2 className="text-2xl font-bold mb-4 text-slate-800 dark:text-slate-100">Settings</h2>
                
                <div className="divide-y divide-slate-200 dark:divide-slate-700">
                    {/* Theme Setting */}
                    <div className="py-4 flex justify-between items-center">
                        <div>
                            <h3 className="font-semibold">Appearance</h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400">Switch between light and dark mode.</p>
                        </div>
                         <button onClick={toggleTheme} className="p-2 rounded-full text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 ring-2 ring-transparent hover:ring-primary transition-all">
                            {theme === 'light' ? <MoonIcon className="w-6 h-6" /> : <SunIcon className="w-6 h-6" />}
                        </button>
                    </div>

                    {/* Reminders Setting */}
                     <div className="py-4 flex justify-between items-center">
                        <div>
                            <h3 className="font-semibold">Daily Reminders</h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400">Get a notification to log your mood.</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" checked={remindersEnabled} onChange={() => setRemindersEnabled(!remindersEnabled)} className="sr-only peer" />
                            <div className="w-11 h-6 bg-slate-200 dark:bg-slate-600 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;

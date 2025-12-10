import React, { useState } from 'react';
import { ShieldIcon } from '../components/icons';

interface ApiKeySetupPageProps {
  onApiKeySet: (key: string) => void;
}

const ApiKeySetupPage: React.FC<ApiKeySetupPageProps> = ({ onApiKeySet }) => {
  const [key, setKey] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (key.trim()) {
      onApiKeySet(key.trim());
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 p-4">
      <div className="max-w-lg w-full mx-auto">
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8">
          <div className="text-center mb-6">
            <ShieldIcon className="w-16 h-16 mx-auto text-primary" />
            <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mt-4">One-Time Setup</h1>
            <p className="text-slate-600 dark:text-slate-300 mt-2">
              To enable the AI-powered safety and support features, please provide your Google Gemini API key.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="api-key" className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">
                    Your Gemini API Key
                </label>
                <input
                    id="api-key"
                    type="password"
                    value={key}
                    onChange={(e) => setKey(e.target.value)}
                    placeholder="Enter your API key here"
                    required
                    className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-700 focus:ring-2 focus:ring-primary"
                />
            </div>
            <button
                type="submit"
                className="w-full px-6 py-3 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-primary-dark transition disabled:bg-slate-400"
                disabled={!key.trim()}
            >
                Save & Continue
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
            <p>Your key is saved securely in your browser's local storage and is never sent to our servers.</p>
            <a
              href="https://aistudio.google.com/app/apikey"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline font-medium mt-1 inline-block"
            >
              Get your API Key from Google AI Studio &rarr;
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiKeySetupPage;

import React from 'react';
import { NavItem } from '../types';
import { WarningIcon } from './icons';

interface CrisisModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (view: NavItem) => void;
}

const CrisisModal: React.FC<CrisisModalProps> = ({ isOpen, onClose, onNavigate }) => {
  if (!isOpen) return null;

  const handleNavigate = (view: NavItem) => {
    onNavigate(view);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 p-4">
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl p-6 md:p-8 max-w-lg w-full transform transition-all animate-fade-in-up">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-red-900/50">
            <WarningIcon className="h-6 w-6 text-red-600 dark:text-red-400" />
          </div>
          <h3 className="mt-4 text-xl font-semibold text-slate-900 dark:text-white">It sounds like you're in distress.</h3>
          <p className="mt-2 text-slate-600 dark:text-slate-300">
            Your safety is the most important thing. Please reach out for immediate support. You are not alone.
          </p>
        </div>
        <div className="mt-6 space-y-3">
          <a
            href="tel:988" // Example: US 988 Suicide & Crisis Lifeline
            className="w-full flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-transform transform hover:scale-105"
          >
            Call a Helpline (e.g., 988)
          </a>
          <a
            href="sms:741741" // Example: US Crisis Text Line
            className="w-full flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-transform transform hover:scale-105"
          >
            Text a Helpline (e.g., 741741)
          </a>
           <button
            onClick={() => handleNavigate('My Safety Plan')}
            className="w-full flex items-center justify-center px-4 py-3 border border-slate-300 dark:border-slate-600 text-base font-medium rounded-md text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-700 hover:bg-slate-50 dark:hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-light transition-transform transform hover:scale-105"
          >
            View My Safety Plan
          </button>
        </div>
        <div className="mt-6 text-center">
            <p className="text-xs text-slate-400 mb-2">If you are in immediate danger, please call 911 or your local emergency number.</p>
          <button
            onClick={onClose}
            className="text-sm text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CrisisModal;

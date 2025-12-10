
import React from 'react';
import { NavItem } from '../types';
import { SupportIcon, CommunityIcon, GratitudeIcon } from './icons';

interface EmotionalAlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (view: NavItem) => void;
}

const EmotionalAlertModal: React.FC<EmotionalAlertModalProps> = ({ isOpen, onClose, onNavigate }) => {
  if (!isOpen) return null;

  const handleNavigate = (view: NavItem) => {
    onNavigate(view);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl p-6 md:p-8 max-w-lg w-full transform transition-all animate-fade-in-up">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100 dark:bg-yellow-900/50">
            <GratitudeIcon className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
          </div>
          <h3 className="mt-4 text-xl font-semibold text-slate-900 dark:text-white">We're Here for You</h3>
          <p className="mt-2 text-slate-600 dark:text-slate-300">
            We've noticed you’ve been feeling low for a little while. Remember, it's okay not to be okay.
            Would you like to explore some options that might help?
          </p>
        </div>
        <div className="mt-6 space-y-4">
          <button
            onClick={() => handleNavigate('Support')}
            className="w-full flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-light transition-transform transform hover:scale-105"
          >
            <SupportIcon className="w-5 h-5 mr-2" />
            Talk to Someone
          </button>
          <button
            onClick={() => handleNavigate('Community')}
            className="w-full flex items-center justify-center px-4 py-3 border border-slate-300 dark:border-slate-600 text-base font-medium rounded-md text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-700 hover:bg-slate-50 dark:hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-light transition-transform transform hover:scale-105"
          >
            <CommunityIcon className="w-5 h-5 mr-2" />
            Visit Community Wall
          </button>
        </div>
        <div className="mt-6 text-center">
          <button
            onClick={onClose}
            className="text-sm text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
          >
            Maybe later
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmotionalAlertModal;

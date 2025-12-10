import React, { useState } from 'react';

interface RequestSessionModalProps {
  isOpen: boolean;
  onClose: () => void;
  counsellorName: string;
}

const RequestSessionModal: React.FC<RequestSessionModalProps> = ({ isOpen, onClose, counsellorName }) => {
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);

  if (!isOpen) return null;
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you would send this data to a backend.
    console.log(`Request sent to ${counsellorName}: ${message}`);
    setIsSent(true);
    setTimeout(() => {
        onClose();
        setIsSent(false);
        setMessage('');
    }, 2500);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl p-6 md:p-8 max-w-lg w-full transform transition-all animate-fade-in-up">
        {isSent ? (
          <div className="text-center">
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Request Sent!</h3>
            <p className="mt-2 text-slate-600 dark:text-slate-300">
              Your request has been sent to {counsellorName}. They will get back to you shortly via the contact details in your profile.
            </p>
          </div>
        ) : (
          <>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Request a Session with {counsellorName}</h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              You can add a brief message about what you'd like to discuss. This is optional.
            </p>
            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Hi, I'd like to schedule a session to talk about..."
                className="w-full h-32 p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-700 focus:ring-2 focus:ring-primary"
              />
              <div className="flex justify-end space-x-3">
                 <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700">
                    Cancel
                </button>
                <button type="submit" className="px-5 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary-dark">
                    Send Request
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default RequestSessionModal;

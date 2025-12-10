import React, { useState } from 'react';
import { Counsellor } from '../types';
import RequestSessionModal from '../components/RequestSessionModal';

const mockCounsellors: Counsellor[] = [
  { id: '1', name: 'Dr. Anya Sharma', specialization: 'Cognitive Behavioral Therapy', contact: 'contact@anyasharma.dev', availability: 'Mon-Fri, 9am-5pm', status: 'online' },
  { id: '2', name: 'Mr. Ben Carter', specialization: 'Mindfulness & Stress Reduction', contact: 'contact@bencarter.dev', availability: 'Tue & Thu, 1pm-8pm', status: 'offline' },
  { id: '3', name: 'Dr. Chloe Davis', specialization: 'Anxiety & Depression', contact: 'contact@chloedavis.dev', availability: 'Mon, Wed, Fri, 10am-6pm', status: 'online' },
];

const supportLinks = [
    { name: 'Moner Kotha', url: '#', description: 'A platform for mental health support in Bengali.' },
    { name: '7UP Adda', url: '#', description: 'A community for friendly and open discussions.' },
    { name: 'National Suicide Prevention Lifeline', url: '#', description: 'Available 24/7 for free, confidential support.' }
]

const SupportPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCounsellor, setSelectedCounsellor] = useState<Counsellor | null>(null);

  const handleOpenModal = (counsellor: Counsellor) => {
    setSelectedCounsellor(counsellor);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="space-y-8 animate-fade-in">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-slate-800 dark:text-slate-100">Connect with a Counsellor</h2>
          <p className="mb-6 text-slate-600 dark:text-slate-300">Our verified mental health professionals are here to help you. (Note: These are mock profiles for demonstration).</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockCounsellors.map(c => (
              <div key={c.id} className="border border-slate-200 dark:border-slate-700 rounded-lg p-4 bg-slate-50 dark:bg-slate-700/50 flex flex-col">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-lg text-primary">{c.name}</h3>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${c.status === 'online' ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300' : 'bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-300'}`}>
                    {c.status}
                  </span>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{c.specialization}</p>
                <div className="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-300">
                  <p><span className="font-medium">Availability:</span> {c.availability}</p>
                  <p><span className="font-medium">Contact:</span> <a href={`mailto:${c.contact}`} className="text-primary hover:underline">{c.contact}</a></p>
                </div>
                <div className="flex-grow"></div>
                 <button onClick={() => handleOpenModal(c)} className="mt-4 w-full px-4 py-2 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-primary-dark transition">
                  Request a Session
                </button>
              </div>
            ))}
          </div>
        </div>

         <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-slate-800 dark:text-slate-100">Community Support Links</h2>
          <p className="mb-6 text-slate-600 dark:text-slate-300">Join friendly communities for discussions and shared experiences.</p>
          <div className="space-y-4">
              {supportLinks.map(link => (
                  <a href={link.url} target="_blank" rel="noopener noreferrer" key={link.name} className="block p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition">
                      <h4 className="font-semibold text-primary">{link.name}</h4>
                      <p className="text-sm text-slate-500 dark:text-slate-400">{link.description}</p>
                  </a>
              ))}
          </div>
        </div>
      </div>
      {selectedCounsellor && (
        <RequestSessionModal 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          counsellorName={selectedCounsellor.name}
        />
      )}
    </>
  );
};

export default SupportPage;

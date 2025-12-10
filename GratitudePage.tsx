
import React, { useState, useEffect } from 'react';

const GratitudePage: React.FC = () => {
    const [gratitudeText, setGratitudeText] = useState('');
    const [gratitudeList, setGratitudeList] = useState<string[]>([]);
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        try {
            const storedGratitude = JSON.parse(localStorage.getItem('mood-tracker-gratitude') || '[]');
            setGratitudeList(storedGratitude);
        } catch (error) {
            console.error("Failed to load gratitude entries", error);
        }
    }, []);

    const handleAddGratitude = () => {
        if (gratitudeText.trim()) {
            const updatedList = [gratitudeText, ...gratitudeList];
            setGratitudeList(updatedList);
            try {
                localStorage.setItem('mood-tracker-gratitude', JSON.stringify(updatedList));
            } catch (error) {
                console.error("Failed to save gratitude entry", error);
            }
            setGratitudeText('');
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 2000);
        }
    };
    
    return (
        <div className="space-y-8 animate-fade-in">
             <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg">
                <h2 className="text-2xl font-bold mb-2 text-slate-800 dark:text-slate-100">Gratitude Journal</h2>
                <p className="mb-4 text-slate-600 dark:text-slate-300">What are you thankful for today? Write it down to cultivate positivity.</p>
                <div className="flex space-x-2">
                    <input 
                        type="text"
                        value={gratitudeText}
                        onChange={(e) => setGratitudeText(e.target.value)}
                        placeholder="Something I'm grateful for is..."
                        className="flex-grow p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-700 focus:ring-2 focus:ring-primary focus:border-transparent transition"
                    />
                    <button
                        onClick={handleAddGratitude}
                        className="px-6 py-3 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-primary-dark transition"
                    >
                        Add
                    </button>
                </div>
                {showSuccess && <p className="text-green-600 dark:text-green-400 mt-2">Added to your list!</p>}
             </div>
             <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg">
                <h3 className="text-xl font-bold mb-4">Your Gratitude List</h3>
                <ul className="space-y-3 list-disc list-inside text-slate-600 dark:text-slate-300 max-h-96 overflow-y-auto pr-2">
                    {gratitudeList.length > 0 ? gratitudeList.map((item, index) => (
                        <li key={index} className="p-2 bg-slate-50 dark:bg-slate-700/50 rounded">{item}</li>
                    )) : (
                        <p className="text-slate-500">Your gratitude list is empty. Start by adding one thing you're thankful for today.</p>
                    )}
                </ul>
             </div>
        </div>
    );
};

export default GratitudePage;

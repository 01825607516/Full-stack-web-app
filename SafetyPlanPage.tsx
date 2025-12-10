import React, { useState, useEffect } from 'react';
import { SafetyPlan } from '../types';
import { ShieldIcon } from '../components/icons';

type PlanSection = keyof SafetyPlan;

const SafetyPlanPage: React.FC = () => {
    const initialPlan: SafetyPlan = {
        warningSigns: '',
        copingStrategies: '',
        distractions: '',
        helpContacts: '',
        professionalContacts: '',
        safeEnvironment: '',
    };
    const [plan, setPlan] = useState<SafetyPlan>(initialPlan);
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        try {
            const storedPlan = JSON.parse(localStorage.getItem('mood-tracker-safety-plan') || 'null');
            if (storedPlan) {
                setPlan(storedPlan);
            }
        } catch (error) {
            console.error("Failed to load safety plan", error);
        }
    }, []);

    const handleUpdate = (section: PlanSection, value: string) => {
        setPlan(prev => ({ ...prev, [section]: value }));
    };

    const handleSave = () => {
        try {
            localStorage.setItem('mood-tracker-safety-plan', JSON.stringify(plan));
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 2500);
        } catch (error) {
            console.error("Failed to save safety plan", error);
        }
    };
    
    const sections: { key: PlanSection; title: string; description: string, placeholder: string }[] = [
        { key: 'warningSigns', title: '1. Warning Signs', description: 'What are your thoughts, feelings, or behaviors that show you might be heading into a crisis?', placeholder: 'e.g., Not sleeping, isolating myself, feeling hopeless...' },
        { key: 'copingStrategies', title: '2. Internal Coping Strategies', description: 'What can you do on your own to help yourself feel better and stay safe without contacting anyone else?', placeholder: 'e.g., Listen to calming music, deep breathing exercises, go for a walk...' },
        { key: 'distractions', title: '3. People & Places for Distraction', description: 'Who can you be around or where can you go to take your mind off your problems?', placeholder: 'e.g., Visit a friend, go to a park or coffee shop...' },
        { key: 'helpContacts', title: '4. People I Can Ask for Help', description: 'Who are the people in your life you can reach out to for help?', placeholder: 'e.g., Family members, trusted friends (with phone numbers)...' },
        { key: 'professionalContacts', title: '5. Professionals to Contact', description: 'List the mental health professionals or agencies you can contact during a crisis.', placeholder: 'e.g., My therapist: [Number], Local crisis line: [Number]...' },
        { key: 'safeEnvironment', title: '6. Making the Environment Safe', description: 'What steps can you take to make your surroundings safer when you are in distress?', placeholder: 'e.g., Remove any means of self-harm...' },
    ];

    return (
        <div className="max-w-4xl mx-auto animate-fade-in space-y-8">
            <div className="text-center p-6 bg-white dark:bg-slate-800 rounded-xl shadow-lg">
                <ShieldIcon className="w-12 h-12 mx-auto text-primary"/>
                <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mt-2">My Safety Plan</h1>
                <p className="mt-2 text-slate-500 dark:text-slate-400">
                   A plan to help you get through tough times. Fill this out when you're feeling calm.
                </p>
                <p className="mt-1 text-xs text-slate-400">Your plan is saved on this device and is not shared.</p>
            </div>
            
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg space-y-6">
                {sections.map(section => (
                    <div key={section.key}>
                        <label htmlFor={section.key} className="block">
                            <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">{section.title}</h2>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">{section.description}</p>
                        </label>
                        <textarea
                            id={section.key}
                            value={plan[section.key]}
                            onChange={(e) => handleUpdate(section.key, e.target.value)}
                            placeholder={section.placeholder}
                            className="w-full h-28 p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-700 focus:ring-2 focus:ring-primary"
                        />
                    </div>
                ))}
            </div>

            <div className="flex justify-end items-center space-x-4">
                {showSuccess && <p className="text-green-600 dark:text-green-400">Your plan has been saved!</p>}
                <button
                    onClick={handleSave}
                    className="px-8 py-3 bg-primary text-white font-bold rounded-lg shadow-md hover:bg-primary-dark transition-transform transform hover:scale-105"
                >
                    Save My Plan
                </button>
            </div>
        </div>
    );
};

export default SafetyPlanPage;

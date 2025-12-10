import React from 'react';

const BreathingAnimator: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center p-8 bg-blue-50 dark:bg-blue-900/30 rounded-2xl">
            <div className="relative w-48 h-48 md:w-64 md:h-64 flex items-center justify-center">
                <div className="absolute w-full h-full bg-primary/30 rounded-full animate-breathe"></div>
                <div className="absolute w-3/4 h-3/4 bg-primary/40 rounded-full animate-breathe" style={{animationDelay: '0.5s'}}></div>
                <div className="relative z-10 text-white font-bold text-lg text-center">
                    <p className="animate-pulse">Breathe In...</p>
                    <p className="animate-pulse" style={{animationDelay: '4s'}}>Breathe Out...</p>
                </div>
            </div>
            <p className="mt-6 text-slate-600 dark:text-slate-300 text-center">Follow the rhythm. Inhale as the circle expands, exhale as it contracts.</p>
        </div>
    );
}

const resources = [
    { title: 'World Health Organization (WHO) on Mental Health', url: 'https://www.who.int/health-topics/mental-health', description: 'Global information and resources on mental health conditions.' },
    { title: 'National Institute of Mental Health (NIMH)', url: 'https://www.nimh.nih.gov/health/topics/depression', description: 'In-depth information on depression and other disorders.' },
    { title: 'Mind - For better mental health', url: 'https://www.mind.org.uk/', description: 'UK-based charity providing advice and support.' },
]

const ResourcesPage: React.FC = () => {
    return (
        <div className="space-y-8 animate-fade-in">
             <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg">
                <h2 className="text-2xl font-bold mb-4 text-slate-800 dark:text-slate-100">Calming Activity: Box Breathing</h2>
                <BreathingAnimator />
             </div>

             <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg">
                <h2 className="text-2xl font-bold mb-4 text-slate-800 dark:text-slate-100">Understanding Depression</h2>
                <p className="text-slate-600 dark:text-slate-300 mb-4">
                    Depression is more than just feeling sad. It's a persistent feeling of sadness and a loss of interest in activities you once enjoyed. It can lead to a variety of emotional and physical problems and can decrease your ability to function at work and at home. Remember, it is a medical condition and it is treatable.
                </p>
                <a href="https://www.who.int/news-room/fact-sheets/detail/depression" target="_blank" rel="noopener noreferrer" className="font-medium text-primary hover:underline">Learn More from WHO &rarr;</a>
             </div>

             <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg">
                <h2 className="text-2xl font-bold mb-4 text-slate-800 dark:text-slate-100">Coping with Difficult Thoughts</h2>
                <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-300">
                    <li><span className="font-semibold">Acknowledge, don't fight:</span> Notice the thought without judgment. Fighting it can give it more power.</li>
                    <li><span className="font-semibold">Ground yourself:</span> Use the 5-4-3-2-1 method. Name 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, and 1 you can taste.</li>
                    <li><span className="font-semibold">Reach out:</span> Talk to someone you trust. Connection is a powerful antidote to hopelessness.</li>
                    <li><span className="font-semibold">Delay action:</span> If you have thoughts of self-harm, promise yourself to wait for a set amount of time (even just an hour) before doing anything. The urge can pass.</li>
                </ul>
             </div>

             <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg">
                <h2 className="text-2xl font-bold mb-4 text-slate-800 dark:text-slate-100">External Wellness Resources</h2>
                 <div className="space-y-4">
                    {resources.map(res => (
                        <a href={res.url} target="_blank" rel="noopener noreferrer" key={res.title} className="block p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition">
                            <h4 className="font-semibold text-primary">{res.title}</h4>
                            <p className="text-sm text-slate-500 dark:text-slate-400">{res.description}</p>
                        </a>
                    ))}
                </div>
             </div>

             <div className="text-center p-4 border-t border-slate-200 dark:border-slate-700 mt-8">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                    <span className="font-bold">Disclaimer:</span> MoodTracker is a support tool, not a replacement for professional medical advice, diagnosis, or treatment. If you are in crisis, please contact a helpline or a healthcare professional immediately.
                </p>
             </div>
        </div>
    );
};

export default ResourcesPage;
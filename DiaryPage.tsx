  import React, { useState, useEffect } from 'react';
import { Mood, MOODS, MOOD_COLORS, MOOD_EMOJI, MoodEntry } from '../types';
import { getEmpatheticMessage, analyzeJournalForCrisis } from '../services/geminiService';
import { apiCreateMood } from "../services/api";

interface DiaryPageProps {
  onEntrySaved: () => void;
}

const DiaryPage: React.FC<DiaryPageProps> = ({ onEntrySaved }) => {
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
  const [journalText, setJournalText] = useState('');
  const [empatheticMessage, setEmpatheticMessage] = useState<string | null>(null);
  const [entries, setEntries] = useState<MoodEntry[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // ✅ Safe token & user loading (no crash)
  const token = localStorage.getItem("mt_token");

  const rawUser = localStorage.getItem("mt_user");
  const user = rawUser ? JSON.parse(rawUser) : null;

  useEffect(() => {
    try {
      const storedEntries = JSON.parse(localStorage.getItem('mood-tracker-entries') || '[]');
      setEntries(storedEntries);
    } catch (error) {
      console.error("Failed to load entries from local storage", error);
    }
  }, []);

  useEffect(() => {
    if (selectedMood === 'Depressed') {
      setEmpatheticMessage("Thinking of you...");
      getEmpatheticMessage().then(setEmpatheticMessage);
    } else {
      setEmpatheticMessage(null);
    }
  }, [selectedMood]);

  // ⭐ Your logic kept: apiCreateMood + backend save + onEntrySaved
  const handleSave = async () => {
    if (!selectedMood) {
      alert('Please select a mood.');
      return;
    }

    setIsSaving(true);

    // Crisis detection (unchanged)
    if (journalText.trim().length > 0) {
      const crisisLevel = await analyzeJournalForCrisis(journalText);
      if (crisisLevel === 'CRISIS' || crisisLevel === 'HIGH_RISK') {
        window.dispatchEvent(new CustomEvent('crisisDetected'));
      }
    }

    // 👉 Safe userId (no crash if user null)
    const body = {
      userId: user?.id || null,
      mood: selectedMood.toLowerCase(),
      intensity: 5,
      notes: journalText,
      tags: "general"
    };

    const res = await apiCreateMood(token!, body);

    if (res._id) {
      const newEntry: MoodEntry = {
        id: new Date().toISOString(),
        date: new Date().toISOString(),
        mood: selectedMood,
        text: journalText,
      };

      const updatedEntries = [newEntry, ...entries];
      setEntries(updatedEntries);
      localStorage.setItem("mood-tracker-entries", JSON.stringify(updatedEntries));

      onEntrySaved();

      setSelectedMood(null);
      setJournalText("");
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } else {
      alert("Error saving mood.");
    }

    setIsSaving(false);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-slate-800 dark:text-slate-100">
          How are you feeling today?
        </h2>

        <div className="grid grid-cols-3 md:grid-cols-6 gap-4 mb-6">
          {MOODS.map((mood) => (
            <button
              key={mood}
              onClick={() => setSelectedMood(mood)}
              className={`p-4 rounded-lg text-center transition-all duration-200 transform hover:scale-110 ${
                selectedMood === mood
                  ? 'ring-2 ring-primary ring-offset-2 dark:ring-offset-slate-800'
                  : 'bg-slate-100 dark:bg-slate-700'
              }`}
            >
              <span className="text-4xl">{MOOD_EMOJI[mood]}</span>
              <p className={`mt-2 font-medium text-sm ${MOOD_COLORS[mood]}`}>{mood}</p>
            </button>
          ))}
        </div>

        <textarea
          value={journalText}
          onChange={(e) => setJournalText(e.target.value)}
          placeholder="Write about your day..."
          className="w-full h-40 p-4 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-700 focus:ring-2 focus:ring-primary"
        />

        {empatheticMessage && (
          <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 rounded-r-lg">
            <p className="italic text-slate-600 dark:text-slate-300">{empatheticMessage}</p>
          </div>
        )}

        <div className="mt-6 flex justify-end">
          <button
            onClick={handleSave}
            disabled={!selectedMood || isSaving}
            className="px-6 py-3 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-primary-dark transition disabled:bg-slate-400 disabled:cursor-not-allowed"
          >
            {isSaving ? 'Saving...' : 'Save Entry'}
          </button>
        </div>

        {showSuccess && (
          <div className="mt-4 text-center text-green-600 dark:text-green-400 font-medium">
            Entry saved successfully!
          </div>
        )}
      </div>
    </div>
  );
};

export default DiaryPage;
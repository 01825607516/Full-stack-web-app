 import React, { useState, useEffect } from 'react';
import {
  MoodEntry,
  MOODS,
  MOOD_EMOJI,
  MOOD_COLORS,
  MOOD_HEX_COLORS,
} from '../types';
import { apiGetUserMoods } from '../services/api';

// Recharts
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const HistoryPage: React.FC = () => {
  const [entries, setEntries] = useState<MoodEntry[]>([]);
  const [chartData, setChartData] = useState<any[]>([]);

  // ----------------------------
  // 🔥 Edit Modal State
  // ----------------------------
  const [editing, setEditing] = useState<MoodEntry | null>(null);
  const [editMood, setEditMood] = useState('');
  const [editNotes, setEditNotes] = useState('');

  // ----------------------------
  // 🔥 Open Edit Modal
  // ----------------------------
  const handleEdit = (entry: MoodEntry) => {
    setEditing(entry);
    setEditMood(entry.mood);
    setEditNotes(entry.notes);
  };

  // ----------------------------
  // 🔥 Update Mood
  // ----------------------------
  const handleUpdate = async () => {
    if (!editing) return;

    const token = localStorage.getItem('mt_token');

    await fetch(`http://localhost:5000/api/moods/${editing._id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        mood: editMood,
        notes: editNotes,
      }),
    });

    // Update UI
    setEntries((prev) =>
      prev.map((e) =>
        e._id === editing._id ? { ...e, mood: editMood, notes: editNotes } : e
      )
    );

    setEditing(null);
  };

  // ----------------------------
  // 🔥 Delete Mood
  // ----------------------------
  const handleDelete = async (id: string) => {
    const token = localStorage.getItem('mt_token');
    if (!token) return;

    if (!confirm('Are you sure you want to delete this mood?')) return;

    await fetch(`http://localhost:5000/api/moods/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });

    setEntries((prev) => prev.filter((e) => e._id !== id));
  };

  // ----------------------------
  // 🔥 Load moods
  // ----------------------------
  useEffect(() => {
    const token = localStorage.getItem('mt_token');
    const user = JSON.parse(localStorage.getItem('mt_user') || '{}');

    if (!token || !user?.id) return;

    apiGetUserMoods(token, user.id).then((data) => {
      const sorted = data.sort(
        (a: MoodEntry, b: MoodEntry) =>
          new Date(b.date).getTime() - new Date(a.date).getTime()
      );
      setEntries(sorted);
    });
  }, []);

  // ----------------------------
  // 🔥 Prepare Bar Chart Data
  // ----------------------------
  useEffect(() => {
    if (entries.length > 0) {
      const data = entries.reduce((acc, entry) => {
        const date = new Date(entry.date).toLocaleDateString('en-CA');

        if (!acc[date]) {
          acc[date] = {
            date,
            ...MOODS.reduce((moodAcc, mood) => ({ ...moodAcc, [mood]: 0 }), {}),
          };
        }

        acc[date][entry.mood]++;
        return acc;
      }, {} as Record<string, any>);

      const sortedData = Object.values(data)
        .sort(
          (a: any, b: any) =>
            new Date(a.date).getTime() - new Date(b.date).getTime()
        )
        .slice(-30);

      setChartData(sortedData);
    }
  }, [entries]);

  // ----------------------------
  // 🥧 Prepare Donut Pie Data
  // ----------------------------
  const summaryData = React.useMemo(() => {
    const count: Record<string, number> = {};
    MOODS.forEach((m) => (count[m] = 0));

    entries.forEach((e) => count[e.mood]++);

    return MOODS.map((m) => ({
      mood: m,
      value: count[m],
    })).filter((item) => item.value > 0);
  }, [entries]);

  return (
    <div className="space-y-8 animate-fade-in">

      {/* ------------------------ */}
      {/* 🥧 Donut Pie Chart */}
      {/* ------------------------ */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-slate-800 dark:text-slate-100">
          Weekly Mood Summary
        </h2>

        {summaryData.length > 0 ? (
          <div style={{ width: "100%", height: 350 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={summaryData}
                  dataKey="value"
                  nameKey="mood"
                  innerRadius={80}
                  outerRadius={120}
                  label
                >
                  {summaryData.map((item) => (
                    <Cell
                      key={item.mood}
                      fill={MOOD_HEX_COLORS[item.mood]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <p className="text-center text-slate-500 dark:text-slate-400">
            No data yet.
          </p>
        )}
      </div>

      {/* ------------------------ */}
      {/* 📊 Bar Chart */}
      {/* ------------------------ */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-slate-800 dark:text-slate-100">
          Your Mood Trends
        </h2>

        {entries.length > 0 ? (
          <div style={{ width: '100%', height: 400 }}>
            <ResponsiveContainer>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.15} />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />

                {MOODS.map((mood) => (
                  <Bar
                    key={mood}
                    dataKey={mood}
                    stackId="a"
                    fill={MOOD_HEX_COLORS[mood]}
                  />
                ))}
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <p className="text-center text-slate-500 dark:text-slate-400">
            Not enough data to display trends. Keep logging!
          </p>
        )}
      </div>

      {/* ------------------------ */}
      {/* 📜 Full History */}
      {/* ------------------------ */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg">
        <h3 className="text-xl font-bold mb-4 text-slate-800 dark:text-slate-100">
          Full History
        </h3>

        <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
          {entries.length > 0 ? (
            entries.map((entry) => (
              <div
                key={entry._id}
                className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg border-l-4"
                style={{ borderColor: MOOD_HEX_COLORS[entry.mood] }}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">
                        {MOOD_EMOJI[entry.mood]}
                      </span>
                      <span
                        className={`font-semibold ${MOOD_COLORS[entry.mood]}`}
                      >
                        {entry.mood}
                      </span>
                    </div>

                    <p className="mt-2 text-slate-600 dark:text-slate-300">
                      {entry.notes}
                    </p>

                    {/* Buttons */}
                    <div className="flex space-x-3 mt-3">
                      <button
                        className="px-3 py-1 text-sm rounded bg-blue-500 text-white hover:bg-blue-600"
                        onClick={() => handleEdit(entry)}
                      >
                        Edit
                      </button>

                      <button
                        className="px-3 py-1 text-sm rounded bg-red-500 text-white hover:bg-red-600"
                        onClick={() => handleDelete(entry._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>

                  <span className="text-sm text-slate-500 dark:text-slate-400 ml-4">
                    {new Date(entry.date).toLocaleString()}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-slate-500 dark:text-slate-400">No entries yet.</p>
          )}
        </div>
      </div>

      {/* ---------------------------------- */}
      {/* 🔥 Edit Modal */}
      {/* ---------------------------------- */}
      {editing && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl w-96 shadow-xl">
            <h3 className="text-xl font-bold mb-4">Edit Mood</h3>

            <label className="block mb-2">Mood:</label>
            <select
              className="w-full p-2 rounded bg-slate-100 dark:bg-slate-700"
              value={editMood}
              onChange={(e) => setEditMood(e.target.value)}
            >
              {MOODS.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>

            <label className="block mt-4 mb-2">Notes:</label>
            <textarea
              className="w-full p-2 rounded bg-slate-100 dark:bg-slate-700"
              rows={4}
              value={editNotes}
              onChange={(e) => setEditNotes(e.target.value)}
            />

            <div className="flex justify-end space-x-3 mt-5">
              <button
                className="px-4 py-2 bg-gray-400 text-white rounded"
                onClick={() => setEditing(null)}
              >
                Cancel
              </button>

              <button
                className="px-4 py-2 bg-green-600 text-white rounded"
                onClick={handleUpdate}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HistoryPage;
 export type NavItem =
  | 'Diary & Tracker'
  | 'History'
  | 'Gratitude'
  | 'Community'
  | 'My Safety Plan'
  | 'Support'
  | 'Resources'
  | 'Settings'
  | 'Rate Us';

export const MOODS = ['Happy', 'Calm', 'Okay', 'Sad', 'Anxious', 'Depressed'] as const;
export type Mood = typeof MOODS[number];

export const MOOD_COLORS: Record<Mood, string> = {
  Happy: 'text-green-500',
  Calm: 'text-blue-500',
  Okay: 'text-indigo-500',
  Anxious: 'text-orange-500',
  Sad: 'text-gray-500',
  Depressed: 'text-red-500',
};

export const MOOD_HEX_COLORS: Record<Mood, string> = {
  Happy: '#22c55e',
  Calm: '#3b82f6',
  Okay: '#6366f1',
  Anxious: '#f97316',
  Sad: '#6b7280',
  Depressed: '#ef4444',
};

export const MOOD_EMOJI: Record<Mood, string> = {
  Happy: '😊',
  Calm: '😌',
  Okay: '😐',
  Anxious: '😟',
  Sad: '😢',
  Depressed: '😞',
};

// 🔥 FIXED — backend returns _id + notes
export interface MoodEntry {
  _id: string;
  date: string;
  mood: Mood;
  notes: string;
}

export interface Comment {
  _id: string;
  text: string;
  timestamp: number;
}

export interface CommunityPost {
  _id: string;
  text: string;
  timestamp: number;
  reactions: Record<string, number>;
  comments: Comment[];
}

export interface Counsellor {
  _id: string;
  name: string;
  specialization: string;
  contact: string;
  availability: string;
  status: 'online' | 'offline';
}

export interface Goal {
  _id: string;
  text: string;
  completed: boolean;
}

export interface SafetyPlan {
  warningSigns: string;
  copingStrategies: string;
  distractions: string;
  helpContacts: string;
  professionalContacts: string;
  safeEnvironment: string;
}

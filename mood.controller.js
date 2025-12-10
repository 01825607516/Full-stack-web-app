import Mood from '../models/mood.model.js';

// Create a new mood entry
export const createMood = async (req, res) => {
  try {
    const { userId, mood, intensity, notes, tags } = req.body;
    const newMood = new Mood({
      userId,
      mood,
      intensity,
      notes,
      tags,
    });

    const savedMood = await newMood.save();
    res.status(201).json(savedMood);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all mood entries for a user
export const getUserMoods = async (req, res) => {
  try {
    const { userId } = req.params;
    const moods = await Mood.find({ userId }).sort({ date: -1 });
    res.json(moods);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a mood entry
export const updateMood = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedMood = await Mood.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    
    if (!updatedMood) {
      return res.status(404).json({ message: 'Mood entry not found' });
    }
    
    res.json(updatedMood);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a mood entry
export const deleteMood = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedMood = await Mood.findByIdAndDelete(id);
    
    if (!deletedMood) {
      return res.status(404).json({ message: 'Mood entry not found' });
    }
    
    res.json({ message: 'Mood entry deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get mood statistics for a user
export const getMoodStats = async (req, res) => {
  try {
    const { userId } = req.params;
    
    const stats = await Mood.aggregate([
      { $match: { userId } },
      {
        $group: {
          _id: '$mood',
          count: { $sum: 1 },
          avgIntensity: { $avg: '$intensity' }
        }
      },
      { $sort: { count: -1 } }
    ]);
    
    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

import mongoose from 'mongoose';

const moodSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  mood: {
    type: String,
    required: true,
    enum: ['happy', 'sad', 'angry', 'anxious', 'tired', 'excited', 'grateful', 'calm'],
  },
  intensity: {
    type: Number,
    required: true,
    min: 1,
    max: 10,
  },
  notes: {
    type: String,
    maxlength: 500,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  tags: [{
    type: String,
  }],
});

const Mood = mongoose.model('Mood', moodSchema);

export default Mood;

 import { Router } from 'express';
import {
  createMood,
  getUserMoods,
  updateMood,
  deleteMood,
  getMoodStats,
} from '../controllers/mood.controller.js';

const router = Router();

// Create a new mood entry
router.post('/', createMood);

// Get all mood entries for a user
router.get('/user/:userId', getUserMoods);

// Get mood statistics for a user
router.get('/stats/:userId', getMoodStats);

// Update a mood entry
router.put('/:id', updateMood);

// Delete a mood entry
router.delete('/:id', deleteMood);

export default router;

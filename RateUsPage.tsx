import React, { useState } from 'react';
import { StarIcon } from '../components/icons';

interface StarRatingProps {
  rating: number;
  setRating: (rating: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, setRating }) => {
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <StarIcon
          key={star}
          className={`w-7 h-7 cursor-pointer transition-colors duration-150 ${
            (hoverRating || rating) >= star
              ? 'text-yellow-400 fill-yellow-400'
              : 'text-slate-300 dark:text-slate-500'
          }`}
          onClick={() => setRating(star)}
          onMouseEnter={() => setHoverRating(star)}
          onMouseLeave={() => setHoverRating(0)}
        />
      ))}
    </div>
  );
};

const RateUsPage: React.FC = () => {
  const [ratings, setRatings] = useState({
    overall: 0,
    diary: 0,
    community: 0,
    support: 0,
  });
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleRatingChange = (category: keyof typeof ratings, value: number) => {
    setRatings(prev => ({ ...prev, [category]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ ratings, feedback }); // Mock submission for demonstration
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="text-center py-20 animate-fade-in">
        <h2 className="text-3xl font-bold text-primary">Thank You!</h2>
        <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">Your feedback helps us improve MoodTracker for everyone.</p>
      </div>
    );
  }

  const ratingCategories: { key: keyof typeof ratings; label: string }[] = [
    { key: 'overall', label: 'Overall Experience' },
    { key: 'diary', label: 'Diary & Tracker' },
    { key: 'community', label: 'Community Wall' },
    { key: 'support', label: 'Support & Resources' },
  ];

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-slate-800 dark:text-slate-100">Rate Your Experience</h1>
        <p className="mt-2 text-lg text-slate-500 dark:text-slate-400">
          We value your feedback. Let us know how we're doing!
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 p-8 sm:p-10 rounded-xl shadow-lg">
        <div className="space-y-6">
          {ratingCategories.map(({ key, label }) => (
            <div key={key} className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <p className="font-semibold text-slate-700 dark:text-slate-200 mb-2 sm:mb-0">{label}</p>
              <StarRating
                rating={ratings[key]}
                setRating={(value) => handleRatingChange(key, value)}
              />
            </div>
          ))}
        </div>
        
        <div className="mt-8 border-t border-slate-200 dark:border-slate-700 pt-8">
          <label htmlFor="feedback" className="block font-semibold text-slate-700 dark:text-slate-200 mb-2">
            Any other feedback or suggestions?
          </label>
          <textarea
            id="feedback"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="What could we improve? What do you love?"
            className="w-full h-32 p-4 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-700 focus:ring-2 focus:ring-primary focus:border-transparent transition"
          />
        </div>
        
        <div className="mt-8 flex justify-end">
          <button
            type="submit"
            disabled={ratings.overall === 0}
            className="px-8 py-3 bg-primary text-white font-bold rounded-lg shadow-md hover:bg-primary-dark transition-transform transform hover:scale-105 disabled:bg-slate-400 disabled:cursor-not-allowed disabled:scale-100"
          >
            Submit Feedback
          </button>
        </div>
      </form>
    </div>
  );
};

export default RateUsPage;

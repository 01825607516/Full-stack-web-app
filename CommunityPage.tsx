import React, { useState, useEffect } from 'react';
import { CommunityPost, Comment } from '../types';
import { filterContent } from '../services/geminiService';

const EMOJI_REACTIONS = ['❤️', '🤗', '🙏', '💡', '💪'];

const CommunityPage: React.FC = () => {
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [newPostText, setNewPostText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [commentingOn, setCommentingOn] = useState<string | null>(null);
  const [newCommentText, setNewCommentText] = useState('');

  useEffect(() => {
    try {
      const storedPosts = JSON.parse(localStorage.getItem('mood-tracker-posts') || '[]');
      setPosts(storedPosts.sort((a: CommunityPost, b: CommunityPost) => b.timestamp - a.timestamp));
    } catch(err) {
      console.error("Failed to load posts", err);
    }
  }, []);

  const savePosts = (updatedPosts: CommunityPost[]) => {
    const sortedPosts = updatedPosts.sort((a, b) => b.timestamp - a.timestamp);
    setPosts(sortedPosts);
    try {
      localStorage.setItem('mood-tracker-posts', JSON.stringify(sortedPosts));
    } catch (err) {
      console.error("Failed to save posts", err);
    }
  };

  const handlePostSubmit = async () => {
    if (newPostText.trim().length === 0) return;

    setIsLoading(true);
    setError('');

    const safetyCheck = await filterContent(newPostText);
    if (safetyCheck === 'UNSAFE') {
      setError("This content seems to violate our community guidelines. Please revise and try again.");
      setIsLoading(false);
      return;
    }

    const newPost: CommunityPost = {
      id: new Date().toISOString(),
      text: newPostText,
      timestamp: Date.now(),
      reactions: EMOJI_REACTIONS.reduce((acc, emoji) => ({ ...acc, [emoji]: 0 }), {}),
      comments: [],
    };

    savePosts([newPost, ...posts]);
    setNewPostText('');
    setIsLoading(false);
  };
  
  const handleReaction = (postId: string, reaction: string) => {
    const updatedPosts = posts.map(p => {
      if (p.id === postId) {
        return { ...p, reactions: { ...p.reactions, [reaction]: p.reactions[reaction] + 1 } };
      }
      return p;
    });
    savePosts(updatedPosts);
  };
  
  const handleAddComment = async (postId: string) => {
    if (newCommentText.trim().length === 0) return;
    
    setIsLoading(true);
    const safetyCheck = await filterContent(newCommentText);
    if (safetyCheck === 'UNSAFE') {
      alert("This comment seems to violate our community guidelines.");
      setIsLoading(false);
      return;
    }

    const newComment: Comment = {
      id: new Date().toISOString(),
      text: newCommentText,
      timestamp: Date.now(),
    };

    const updatedPosts = posts.map(p => {
      if (p.id === postId) {
        return { ...p, comments: [...p.comments, newComment] };
      }
      return p;
    });
    savePosts(updatedPosts);
    setNewCommentText('');
    setCommentingOn(null);
    setIsLoading(false);
  };

  return (
    <div className="animate-fade-in space-y-6">
      <div className="text-center p-6 bg-white dark:bg-slate-800 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-primary">Anonymous Community Wall</h2>
        <p className="mt-2 text-slate-600 dark:text-slate-300">A safe space to share and support. All posts are anonymous.</p>
        <p className="mt-1 text-xs text-slate-500">Posts and comments are reviewed by an AI to ensure a positive environment.</p>
      </div>

      <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg">
        <textarea
          value={newPostText}
          onChange={(e) => setNewPostText(e.target.value)}
          placeholder="Share something on your mind..."
          className="w-full h-28 p-4 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-700 focus:ring-2 focus:ring-primary"
          disabled={isLoading}
        />
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        <div className="mt-4 flex justify-end">
          <button
            onClick={handlePostSubmit}
            disabled={isLoading || !newPostText.trim()}
            className="px-6 py-2 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-primary-dark transition disabled:bg-slate-400 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Checking...' : 'Post Anonymously'}
          </button>
        </div>
      </div>
      
      <div className="space-y-4">
        {posts.map(post => (
          <div key={post.id} className="bg-white dark:bg-slate-800 p-5 rounded-xl shadow-lg">
            <p className="text-slate-700 dark:text-slate-200 whitespace-pre-wrap">{post.text}</p>
            <div className="flex items-center justify-between mt-4 border-b border-slate-200 dark:border-slate-700 pb-3">
              <div className="flex space-x-2 flex-wrap gap-y-2">
                {EMOJI_REACTIONS.map(emoji => (
                  <button key={emoji} onClick={() => handleReaction(post.id, emoji)} className="flex items-center space-x-1 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition">
                    <span>{emoji}</span>
                    <span className="text-sm font-medium text-slate-600 dark:text-slate-300">{post.reactions[emoji]}</span>
                  </button>
                ))}
              </div>
              <span className="text-xs text-slate-400 flex-shrink-0">{new Date(post.timestamp).toLocaleString()}</span>
            </div>

            {/* Comments Section */}
            <div className="mt-4 space-y-3">
              {post.comments.map(comment => (
                <div key={comment.id} className="text-sm p-2 rounded bg-slate-50 dark:bg-slate-700/50">
                  <p className="text-slate-600 dark:text-slate-300">{comment.text}</p>
                </div>
              ))}
              {commentingOn === post.id ? (
                 <div className="flex space-x-2">
                    <input 
                      type="text"
                      value={newCommentText}
                      onChange={e => setNewCommentText(e.target.value)}
                      placeholder="Write a kind comment..."
                      className="flex-grow p-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-700 focus:ring-2 focus:ring-primary text-sm"
                    />
                    <button onClick={() => handleAddComment(post.id)} disabled={isLoading} className="px-4 py-1 bg-primary/80 text-white font-semibold rounded-lg text-sm hover:bg-primary transition disabled:bg-slate-400">
                      {isLoading ? '...' : 'Reply'}
                    </button>
                 </div>
              ) : (
                <button onClick={() => { setCommentingOn(post.id); setNewCommentText(''); }} className="text-sm text-primary font-medium hover:underline">
                  Add comment
                </button>
              )}
            </div>
          </div>
        ))}
         {posts.length === 0 && <div className="text-center p-10 text-slate-500">The community wall is quiet... Be the first to share something!</div>}
      </div>
    </div>
  );
};

export default CommunityPage;

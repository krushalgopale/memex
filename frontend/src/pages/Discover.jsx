import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { getMemes, likeMeme } from '../utils/api';
import MemeCard from '../components/MemeCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import '../css/discover.css';

function Discover() {
  const { user } = useContext(AuthContext);
  const [memes, setMemes] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  const fetchMemes = async () => {
    setLoading(true);
    try {
      const newMemes = await getMemes(page);
      if (newMemes.length === 0) setHasMore(false);

      setMemes((prev) => {
        const memeMap = new Map();
        [...prev, ...newMemes].forEach((meme) => {
          memeMap.set(meme.id, meme); 
        });
        return Array.from(memeMap.values());
      });
    } catch (err) {
      console.error(err);
      setError('Failed to load memes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMemes();
  }, [page]);

  const handleLike = async (memeId) => {
    try {
      await likeMeme(memeId);
      setMemes((prev) =>
        prev.map((meme) =>
          meme.id === memeId ? { ...meme, likes: meme.likes + 1 } : meme
        )
      );
    } catch (err) {
      console.error(err);
      setError('Failed to like meme');
    }
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100 &&
      hasMore &&
      !loading
    ) {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, hasMore]);

  if (!user) return null; 

  return (
    <div className="discover-container">
      <h2>Discover Memes</h2>
      <div className="meme-grid">
        {memes.map((meme) => (
          <MemeCard
            key={meme.id} 
            meme={meme}
            onLike={() => handleLike(meme.id)}
          />
        ))}
      </div>
      {loading && <LoadingSpinner />}
      {error && <ErrorMessage message={error} />}
      {!hasMore && <p>No more memes to load</p>}
    </div>
  );
}

export default Discover;

import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../css/home.css';

function Home() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleAction = (path) => {
    if (user) {
      navigate(path);
    } else {
      navigate('/signup', { state: { from: path } });
    }
  };

  return (
    <div className="home-container">
      <h1>Welcome to Memex🗿</h1>
      <p>A platform to share and discover memes.</p>
      <div className="home-actions">
        <button
          onClick={() => handleAction('/discover')}
          className="btn"
        >
          Discover Memes
        </button>
      </div>
    </div>
  );
}

export default Home;
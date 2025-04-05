import { Link } from 'react-router-dom';
import '../css/navbar.css';

function Drawer({ isOpen, onClose, user, onLogout }) {
  return (
    <div className={`drawer ${isOpen ? 'open' : ''}`}>
      <button onClick={onClose} className="btn" style={{ marginBottom: '20px' }}>
        ✕ Close
      </button>
      <div className="drawer-links">
        <Link to="/" onClick={onClose}>Home</Link>
        {user ? (
          <>
            <Link to="/discover" onClick={onClose}>Discover</Link>
            <Link to="/upload" onClick={onClose}>Upload</Link>
            <button onClick={onLogout} className="btn">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" onClick={onClose}>Sign In</Link>
            <Link to="/signup" onClick={onClose}>Sign Up</Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Drawer;
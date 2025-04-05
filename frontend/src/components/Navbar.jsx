import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Drawer from './Drawer';
import '../css/navbar.css';

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setIsDrawerOpen(false);
  };

  return (
    <>
      <nav className="navbar">
        <Link to="/" className="navbar-logo">🗿Memex</Link>
        <div className="navbar-links">
          {user ? (
            <>
              <Link to="/discover">Discover</Link>
              <Link to="/upload">Upload</Link>
              <button onClick={handleLogout} className="btn">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Sign In</Link>
              <Link to="/signup">Sign Up</Link>
            </>
          )}
        </div>
        <button
          className="navbar-toggle"
          onClick={() => setIsDrawerOpen(!isDrawerOpen)}
        >
          ☰
        </button>
      </nav>
      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        user={user}
        onLogout={handleLogout}
      />
    </>
  );
}

export default Navbar;
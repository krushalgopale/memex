import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const navigate = useNavigate();


  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('https://memex-nf9k.onrender.com/memes', {
          method: 'GET',
          credentials: 'include', 
        });

        if (response.ok) {
          const storedUsername = localStorage.getItem('username');
          if (storedUsername) {
            setUser(storedUsername);
          }
        }
      } catch (err) {
        console.log('Not authenticated:', err);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);


  const login = (username) => {
    setUser(username);
    localStorage.setItem('username', username); 
  };

  const logout = async () => {
    try {
      const response = await fetch('https://memex-nf9k.onrender.com/logout', {
        method: 'POST',
        credentials: 'include', 
      });

      if (response.ok) {
        setUser(null);
        localStorage.removeItem('username');
        navigate('/login');
      }
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

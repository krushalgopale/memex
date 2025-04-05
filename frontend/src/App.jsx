import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Discover from './pages/Discover';
import Upload from './pages/Upload';
import NotFound from './pages/NotFound';
import { AuthContext } from './context/AuthContext';

function App() {
  const location = useLocation();
  const showNavbar = !['/', '/login', '/signup'].includes(location.pathname);

  return (
    <>
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route
          path="/login"
          element={
            <div className="container">
              <Login />
            </div>
          }
        />
        <Route
          path="/signup"
          element={
            <div className="container">
              <Signup />
            </div>
          }
        />
        <Route
          path="/discover"
          element={
            <div className="container">
              <ProtectedRoute component={Discover} />
            </div>
          }
        />
        <Route
          path="/upload"
          element={
            <div className="container">
              <ProtectedRoute component={Upload} />
            </div>
          }
        />
        <Route
          path="*"
          element={
            <div className="container">
              <NotFound />
            </div>
          }
        />
      </Routes>
    </>
  );
}

function ProtectedRoute({ component: Component }) {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  return user ? <Component /> : <Navigate to="/login" />;
}

export default App;
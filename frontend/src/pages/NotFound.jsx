import { Link } from 'react-router-dom';
import '../css/404.css';

function NotFound() {
  return (
    <div className="notfound-container">
      <h1>404</h1>
      <p>Oops! Page not found.</p>
      <Link to="/" className="btn">Go Home</Link>
    </div>
  );
}

export default NotFound;
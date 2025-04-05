import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { uploadMeme } from '../utils/api';
import ErrorMessage from '../components/ErrorMessage';
import LoadingSpinner from '../components/LoadingSpinner';
import '../css/upload.css';

function Upload() {
  const { user } = useContext(AuthContext);
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a file');
      return;
    }

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await uploadMeme(formData);
      if (response.message === 'Upload successful') {
        setFile(null);
        alert('Meme uploaded successfully!');
      }
    } catch (err) {
      setError(err.message || 'Upload failed');
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null; 

  return (
    <div className="upload-container">
      <h2>Upload a Meme</h2>
      <form onSubmit={handleSubmit} className="upload-form">
        <div className="form-group">
          <label htmlFor="file">Choose a file</label>
          <input
            type="file"
            id="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
        {error && <ErrorMessage message={error} />}
        <button type="submit" className="btn" disabled={loading}>
          {loading ? <LoadingSpinner /> : 'Upload'}
        </button>
      </form>
    </div>
  );
}

export default Upload;
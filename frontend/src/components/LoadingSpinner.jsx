import '../css/global.css'; 

function LoadingSpinner({ spin = true }) {
  return (
    <div className="loading-spinner" style={spinnerStyle}>
      <span style={spin ? { animation: 'spin 1s linear infinite' } : {}}>Loading...</span>
    </div>
  );
}

const spinnerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '20px',
  fontSize: '1.2rem',
  color: '#1e90ff',
};

export default LoadingSpinner;
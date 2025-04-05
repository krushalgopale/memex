function ErrorMessage({ message }) {
    return (
      <div className="error-message" style={errorStyle}>
        {message}
      </div>
    );
  }
  
  const errorStyle = {
    backgroundColor: '#ff4444',
    color: '#fff',
    padding: '10px',
    borderRadius: '5px',
    textAlign: 'center',
    marginBottom: '15px',
    animation: 'fadeIn 0.5s ease-in',
  };
  
  const styleSheet = document.styleSheets[0];
  styleSheet.insertRule(`
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
  `, styleSheet.cssRules.length);
  
  export default ErrorMessage;
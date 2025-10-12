import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../store/slices/authSlice';

const CREDENTIALS = {
  username: 'admin',
  password: '1234',
};

export default function LoginPage() {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === CREDENTIALS.username && password === CREDENTIALS.password) {
      dispatch(login(username));
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div style={containerStyle}>
      <div style={formContainerStyle}>
        <h1>Login</h1>
        <form onSubmit={handleLogin} style={formStyle}>
          <div style={fieldStyle}>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={inputStyle}
              required
            />
          </div>
          <div style={fieldStyle}>
            <label htmlFor="password">Password:</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={inputStyle}
              required
            />
          </div>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button type="submit" style={buttonStyle}>
            Login
          </button>
        </form>
        <p style={{ marginTop: '20px', fontSize: '0.9rem', color: '#666' }}>
          Hint: username: <strong>admin</strong>, password: <strong>1234</strong>
        </p>
      </div>
    </div>
  );
}

const containerStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  backgroundColor: '#f0f0f0',
};

const formContainerStyle: React.CSSProperties = {
  backgroundColor: 'white',
  padding: '40px',
  borderRadius: '8px',
  boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
  width: '400px',
};

const formStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
};

const fieldStyle: React.CSSProperties = {
  marginBottom: '15px',
  display: 'flex',
  flexDirection: 'column',
};

const inputStyle: React.CSSProperties = {
  padding: '10px',
  fontSize: '1rem',
  border: '1px solid #ddd',
  borderRadius: '4px',
  marginTop: '5px',
};

const buttonStyle: React.CSSProperties = {
  padding: '12px',
  fontSize: '1rem',
  cursor: 'pointer',
  border: 'none',
  borderRadius: '4px',
  backgroundColor: '#007bff',
  color: 'white',
  marginTop: '10px',
};

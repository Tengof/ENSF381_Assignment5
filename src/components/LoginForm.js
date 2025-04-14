import React, { useState, useEffect, createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AuthMessage from './AuthMessage';

export const DisplayContext = createContext();

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [authMessage, setAuthMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('student_id', null);
  }, []);

  async function handleSubmit(e){
    e.preventDefault();
    setIsLoading(true);
    setAuthMessage(null);

    // Input validations
    if (username.trim() === '' || password.trim() === '') {
      setAuthMessage({ type: 'error', message: 'Username and password cannot be empty!' });
      setIsLoading(false);
      return;
    }
    if (password.length < 8) {
      setAuthMessage({ type: 'error', message: 'Password must be at least 8 characters long!' });
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:5000/login',
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password })
        }
      );
      const result = await response.json();
      if (result.success) {
        localStorage.setItem('student_id', result.student['id']);
        login(result.student);
        setAuthMessage({ type: 'success', message: 'Login successful! Redirecting...' });
        setTimeout(() => { navigate('/courses'); }, 2000);

      } else {
        setAuthMessage({ type: 'error', message: result.message });
      }
    } catch (err) {
        setAuthMessage({ type: 'error', message: 'Failed to connect to the server. Please try again later.' });

    } finally {
        setIsLoading(false);
    }

  };

  return (
    <DisplayContext.Provider value={{ authMessage, setAuthMessage }}>
      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        <AuthMessage />
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="username" style={{ display: 'block', marginBottom: '5px' }}>
            Username:
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="password" style={{ display: 'block', marginBottom: '5px' }}>
            Password:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <button 
          type="submit" 
          disabled={isLoading}
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: isLoading ? '#BDBDBD' : '#004080',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: isLoading ? 'not-allowed' : 'pointer'
          }}
        >
          {isLoading ? 'Authenticating...' : 'Login'}
        </button>
        <br></br>
        <br></br>
        <a className="signupLink" style={{textAlign: 'center', display: 'block', margin: '20px auto'}} href="/signup">Create a new account here</a>
      </form>
    </DisplayContext.Provider>
  );
};

export default LoginForm;

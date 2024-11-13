import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ onLogin, onSwitchToSignUp }) => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post('http://localhost:5001/auth/login', {
            email: credentials.email,  // Ensure sending email and password
            password: credentials.password
        });
        if (response.status === 200) {
            // No token, just user info in the response
            localStorage.setItem('user', JSON.stringify(response.data.user));  // Store user data
            onLogin(); // Notify parent component about successful login
        }
    } catch (err) {
        setError(err.response ? err.response.data.message : 'An error occurred');
    }
};


  return (
    <div className="auth-container">
      <h2>Login</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit} className="auth-form">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="auth-input"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            placeholder="Enter your password"
            className="auth-input"
            required
          />
        </div>
        <button type="submit" className="auth-btn">Login</button>
      </form>
      <p>
        Don't have an account?{' '}
        <button onClick={onSwitchToSignUp} className="auth-link">Sign Up</button>
      </p>
    </div>
  );
};

export default Login;

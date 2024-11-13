import React, { useState } from 'react';

const Signup = ({ onSignup, onSwitchToLogin }) => { // onSwitchToLogin is passed to switch to the login page
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5001/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, username, password }), // Send username along with email and password
      });

      const data = await response.json();

      if (response.ok) {
        // Successful signup
        setSuccess(data.message);
        setError('');
        onSignup(data.user);  // Pass user data to the parent component (App.js)
      } else {
        // Failed signup
        setError(data.message);
        setSuccess('');
      }
    } catch (err) {
      console.error('Error during signup:', err);
      setError('An error occurred. Please try again.');
      setSuccess('');
    }
  };

  return (
    <div className="auth-container">
      <h2>Signup</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSignup} className="auth-form">
        {/* Username Input */}
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            className="auth-input"
            required
          />
        </div>

        {/* Email Input */}
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="auth-input"
            required
          />
        </div>

        {/* Password Input */}
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="auth-input"
            required
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="auth-btn">Signup</button>
      </form>

      {/* Success Message */}
      {success && <p className="success-message">{success}</p>}

      {/* Already have an account message */}
      <p>
        Already have an account?{' '}
        <button onClick={onSwitchToLogin} className="link-btn">Login here</button>
      </p>
    </div>
  );
};

export default Signup;

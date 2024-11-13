import React, { useState } from 'react';
import './App.css';
import SignUp from './components/Signup';
import Login from './components/Login';
import ProductManagement from './components/ProductManagement';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  const handleLogin = () => {
    console.log("User logged in!");
    setIsLoggedIn(true);
  };

  const handleSignup = (userData) => {
    // Handle successful signup and log the user in or store user data as needed
    console.log("User signed up!", userData);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    console.log("User logged out!");
    setIsLoggedIn(false);
  };

  return (
    <div className="App">
      {!isLoggedIn ? (
        <>
          {showSignUp ? (
            <SignUp onSwitchToLogin={() => setShowSignUp(false)} onSignup={handleSignup} />
          ) : (
            <Login onLogin={handleLogin} onSwitchToSignUp={() => setShowSignUp(true)} />
          )}
        </>
      ) : (
        <div>
          <h2>Welcome to Product Management</h2>
          <button onClick={handleLogout}>Logout</button>
          <ProductManagement />
        </div>
      )}
    </div>
  );
}

export default App;

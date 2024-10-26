import React from 'react';

const LoginPopup = ({ setShowLogin }) => {
  const handleLogin = () => {
    setShowLogin(false);
  };

  return (
    <div className="login-popup">
      <div className="login-popup-content">
        <h2>Open Gym</h2>
        <p id="body">Open Gym is built and maintained by <a href="https://cmubtg.com/">CMU BTG</a>. To ensure the security 
          of the student data, it is mandatory for you to use your Andrew ID.</p>
        <p id="loggedOut"><strong>You are currently logged out. Log in to access.</strong></p>
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
};

export default LoginPopup;

import React from 'react';

const LoginPopup = ({ setShowLogin }) => {
  const handleLogin = () => {
    setShowLogin(false);
  };

  return (
    <div className="login-popup">
      <div className="login-popup-content">
        <h2>Open Gym</h2>
        <p>Open Gym is built and maintained by CMUBTG. Open Gym tracks the crowdedness of gyms on campus 
            (including CUC, Tepper, and Fairfax) to support students in making efficient decisions 
            regarding gym habits among many other features aimed at enhancing gym experiences. 
            Learn more about us <a href="https://cmubtg.com/">here</a>.</p>
        <p><strong>You are currently logged out. Log in to access.</strong></p>
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
};

export default LoginPopup;

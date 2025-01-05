import React from "react";
import GoogleLoginButton from "./GoogleLoginButton";
import { useAuth } from "context/AuthContext";

const LoginPopup = ({ setShowLogin }) => {
  const { continueAsGuest } = useAuth();

  return (
    <div className="login-popup">
      <div className="login-popup-content">
        <h2>OpenGym</h2>
        <p id="body">
          Open Gym is built and maintained by{" "}
          <a href="https://cmubtg.com/">CMU BTG</a>. To view real-time occupancy
          data, please sign in with a CMU email
        </p>
        {/* <p id="loggedOut">
          
        </p> */}
        <div className="flex justify-between items-center mt-6">
          <div className="w-[45%]">
            <GoogleLoginButton />
          </div>
          <div className="w-[45%]">
            <p
              onClick={continueAsGuest}
              className="cursor-pointer flex items-center justify-center h-10 border border-gray-300 rounded-sm w-full duration-300 hover:text-btg-red hover:border-btg-red"
            >
              continue without signing in
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPopup;

import React from "react";
import GoogleLoginButton from "./GoogleLoginButton";
import { useAuth } from "context/AuthContext";

const LoginPopup = ({ setShowLogin }) => {
  const { continueAsGuest } = useAuth();

  return (
    <div className="login-popup">
      <div className="login-popup-content">
        <h2>Sign in</h2>
        <p id="body">
          OpenGym is down for maintenance.{" "}
          <span className={"font-medium text-btg-red"}>
             Please check back 28th March 2025
          </span>.
          {/*{"Thanks for using OpenGym! "}*/}
          {/*<span className="font-medium text-btg-red">*/}
          {/*  Note that this project is in active development and the real-time*/}
          {/*  data we are providing are estimates.*/}
          {/*</span>*/}
          {/*<br />*/}
          {/*<br />*/}
          {/*If you have any feedback or suggestions, please reach out to us at*/}
          {/*<a href="mailto:cmubtg@gmail.com" className="font-medium">*/}
          {/*  cmubtg@gmail.com*/}
          {/*</a>*/}
          {/*<br />*/}
          {/*<br />*/}
          {/*<span className="text-btg-red">*/}
          {/*  To view real-time occupancy estimates, please sign in with a valid*/}
          {/*  CMU email.*/}
          {/*</span>*/}
        </p>

        <div className="flex flex-col sm:flex-row gap-5 justify-between items-center mt-6 pb-4">
          {/*<div className="w-[14em] md:w-[45%]">*/}
          {/*  <GoogleLoginButton />*/}
          {/*</div>*/}
          <div className="w-[14em] md:w-[45%]">
            <p
              onClick={continueAsGuest}
              className="cursor-pointer flex items-center justify-center h-10 border dark:text-btg-med-grey border-gray-300 rounded-sm w-full duration-300 hover:text-btg-red hover:border-btg-red"
            >
              Continue without signing in
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPopup;

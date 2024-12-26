import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "../../context/AuthContext";

function GoogleLoginButton({ setShowLogin }) {
  const { login } = useAuth();

  const handleLoginSuccess = async (credentialResponse) => {
    try {
      setShowLogin(false);
      const { credential } = credentialResponse;
      const success = await login(credential);

      if (success) {
      } else {
        setShowLogin(true);
        alert("Invalid email domain.");
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleLoginFailure = () => {
    alert("Google login failed");
  };

  return (
    <GoogleLogin onSuccess={handleLoginSuccess} onError={handleLoginFailure} />
  );
}

export default GoogleLoginButton;

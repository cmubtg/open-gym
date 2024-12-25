import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "../../context/AuthContext";

function GoogleLoginButton({ setShowLogin }) {
  const { login } = useAuth();

  const handleLoginSuccess = async (credentialResponse) => {
    try {
      const { credential } = credentialResponse;
      const success = await login(credential);

      if (success) {
        setShowLogin(false);
        alert("Login successful!");
      } else {
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

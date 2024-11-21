import React from "react";
import { GoogleLogin } from "@react-oauth/google";

function GoogleLoginButton() {
  const handleLoginSuccess = async (credentialResponse) => {
    try {
      const { credential } = credentialResponse;
      // Use fetch to send the token to the backend for verification
      console.log("credential is", credential);
      const response = await fetch(`http://localhost:4000/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ token: credential }),
      });

      const data = await response.json();

      if (data.success) {
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

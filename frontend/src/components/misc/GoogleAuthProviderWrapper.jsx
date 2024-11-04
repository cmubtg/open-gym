// src/GoogleAuthProviderWrapper.js
import React from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";

const GoogleAuthProviderWrapper = ({ children }) => {
  return (
    <GoogleOAuthProvider clientId={process.env.GOOGLE_OAUTH_CLIENT_ID}>
      {children}
    </GoogleOAuthProvider>
  );
};

export default GoogleAuthProviderWrapper;

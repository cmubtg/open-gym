import React, { createContext, useState, useContext, useEffect } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showLogin, setShowLogin] = useState(false);
  const [isGuestMode, setIsGuestMode] = useState(false);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        // Check if user has seen the initial login prompt
        const hasSeenPrompt = localStorage.getItem("hasSeenLoginPrompt");

        const response = await fetch(
          `${process.env.REACT_APP_AUTH_URL}/verify`,
          {
            credentials: "include",
          }
        );
        const data = await response.json();

        setIsAuthenticated(data.isAuthenticated);
        // Only show login if user hasn't seen prompt and isn't authenticated
        setShowLogin(!data.isAuthenticated && !hasSeenPrompt);
      } catch (error) {
        console.error("Auth check failed:", error);
        setIsAuthenticated(false);
        setShowLogin(!localStorage.getItem("hasSeenLoginPrompt"));
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const login = async (credential) => {
    try {
      console.log(
        "Sending login request to:",
        `${process.env.REACT_APP_AUTH_URL}/login`
      );

      const response = await fetch(`${process.env.REACT_APP_AUTH_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ token: credential }),
      });

      console.log("Login response status:", response.status);
      const data = await response.json();
      console.log("Login response data:", data);

      if (data.success) {
        setIsAuthenticated(true);
        setIsGuestMode(false);
        setShowLogin(false);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    }
  };

  const logout = async () => {
    setIsAuthenticated(false);
    setIsGuestMode(false);
  };

  const continueAsGuest = () => {
    setIsGuestMode(true);
    setShowLogin(false);
    localStorage.setItem("hasSeenLoginPrompt", "true");
  };

  const value = {
    isAuthenticated,
    isLoading,
    showLogin,
    setShowLogin,
    isGuestMode,
    setIsGuestMode,
    login,
    logout,
    continueAsGuest,
  };

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <GoogleOAuthProvider
      clientId={process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID}
    >
      <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    </GoogleOAuthProvider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthProvider;

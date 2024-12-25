import React, { createContext, useState, useContext, useEffect } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_AUTH_URL}/verify`,
          {
            credentials: "include",
          }
        );
        const data = await response.json();

        setIsAuthenticated(data.isAuthenticated);
        setShowLogin(!data.isAuthenticated);
      } catch (error) {
        console.error("Auth check failed:", error);
        setIsAuthenticated(false);
        setShowLogin(true);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const login = async (credential) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_AUTH_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ token: credential }),
      });

      const data = await response.json();

      if (data.success) {
        setIsAuthenticated(true);
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
    // You can add a logout API call here if needed
  };

  const value = {
    isAuthenticated,
    isLoading,
    showLogin,
    setShowLogin,
    login,
    logout,
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

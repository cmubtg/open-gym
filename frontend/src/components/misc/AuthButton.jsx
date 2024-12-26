import React from "react";
import { useAuth } from "../../context/AuthContext";
import { MdLogin, MdLogout } from "react-icons/md";

const AuthButton = () => {
  const { isAuthenticated, logout, setShowLogin } = useAuth();

  const handleAuth = async () => {
    if (isAuthenticated) {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_AUTH_URL}/logout`,
          {
            method: "POST",
            credentials: "include",
          }
        );

        if (response.ok) {
          await logout();
          setShowLogin(true);
        } else {
          console.error("Logout failed");
        }
      } catch (error) {
        console.error("Logout error:", error);
      }
    } else {
      setShowLogin(true);
    }
  };

  return (
    <button
      onClick={handleAuth}
      // mt-3 sm:mt-5
      className="flex items-center justify-center w-32 px-4 text-xs transition-colors "
    >
      {isAuthenticated ? (
        <div className="flex items-center justify-center w-full nav_icon">
          <MdLogout size="20" />
          <span className="w-16 text-center">Sign Out</span>
        </div>
      ) : (
        <div className="flex items-center justify-center w-full nav_icon">
          <MdLogin size="20" />
          <span className="w-16 text-center">Sign In</span>
        </div>
      )}
    </button>
  );
};

export default AuthButton;

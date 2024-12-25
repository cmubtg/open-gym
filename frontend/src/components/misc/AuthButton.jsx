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
      className="flex items-center gap-1 px-4 py-2 text-sm transition-colors mt-3 sm:mt-5 "
    >
      {isAuthenticated ? (
        <div className="flex items-center gap-3 nav_icon">
          <MdLogout size="24" />
          <span>Sign Out</span>
        </div>
      ) : (
        <div className="flex items-center gap-3 nav_icon">
          <MdLogin size="24" />
          <span>Sign In</span>
        </div>
      )}
    </button>
  );
};

export default AuthButton;

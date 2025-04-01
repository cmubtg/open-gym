import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "context/AuthContext";

const DashboardToggleButton = ({ isActive, onClick, label }) => (
  <button
    onClick={onClick}
    className={`py-1.5 px-1 rounded-lg text-xs font-medium transition-colors w-1/2 text-center z-10 relative ${
      isActive
        ? "text-white dark:text-black"
        : "text-gray-700 dark:text-gray-300"
    }`}
  >
    {label}
  </button>
);

const DashboardButton = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isAdminView, setIsAdminView] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const { isAdmin } = useAuth();

  // Update state based on URL
  useEffect(() => {
    setIsAdminView(location.pathname.includes("/dashboard"));
  }, [location.pathname]);

  // Handle toggle with animation
  const handleToggle = (view) => {
    if (isAnimating) return;

    const isChangingView = (view === "admin") !== isAdminView;

    if (isChangingView) {
      setIsAnimating(true);
      setIsAdminView(view === "admin");

      setTimeout(() => {
        navigate(view === "admin" ? "/dashboard" : "/");
        setIsAnimating(false);
      }, 300);
    }
  };

  if (!isAdmin) return null; // Hide button if not admin

  return (
    <div className="flex items-center bg-gray-100 dark:bg-btg-secondary-dark rounded-lg p-1 mx-12 w-48 relative">
      {/* Animated indicator */}
      <div
        className={`absolute top-1 bottom-1 w-[calc(47.5%)] rounded-lg bg-black dark:bg-white 
                    transition-transform duration-300 ease-in-out
                    ${isAdminView ? "translate-x-[calc(100%)]" : ""}`}
      />

      {/* Toggle buttons */}
      <DashboardToggleButton
        isActive={!isAdminView}
        onClick={() => handleToggle("student")}
        label="Student View"
      />
      <DashboardToggleButton
        isActive={isAdminView}
        onClick={() => handleToggle("admin")}
        label="Admin View"
      />
    </div>
  );
};

export default DashboardButton;

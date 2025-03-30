import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "context/AuthContext";
import { ThemeIcon, AuthButton } from "components";

const Layout = () => {
  const { isAdmin } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isAdminView, setIsAdminView] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Set the initial state based on current URL
    setIsAdminView(location.pathname.includes("/dashboard"));
  }, [location.pathname]);

  const handleToggle = (view) => {
    if (isAnimating) return;

    const shouldNavigate =
      (view === "admin" && !isAdminView) || (view === "student" && isAdminView);

    if (shouldNavigate) {
      setIsAnimating(true);

      // First update the UI state
      setIsAdminView(view === "admin");

      // Wait for animation to complete before navigating
      setTimeout(() => {
        navigate(view === "admin" ? "/dashboard" : "/");
        setIsAnimating(false);
      }, 300);
    }
  };

  return (
    <div className="btg_page_container">
      <div className="w-full h-full pt-12">
        {/* Title Bar */}
        <div className="w-full flex flex-col sm:flex-row justify-between items-center text-center sm:text-left">
          <div>
            <div className="flex justify-center items-center sm:justify-between">
              <img
                className="block dark:hidden w-1/2 sm:w-1/4 mb-2"
                src={process.env.PUBLIC_URL + "../images/light_mode_logo.png"}
                alt="Light Mode Logo"
              />
              <img
                className="hidden dark:block w-1/2 sm:w-1/4 mb-2"
                src={process.env.PUBLIC_URL + "../images/dark_mode_logo.png"}
                alt="Dark Mode Logo"
              />
            </div>
            <p>
              {isAdminView
                ? "Admin Dashboard"
                : "Real-time gym occupancy information"}
            </p>
          </div>
          <div className="flex items-center sm:gap-1 mt-6 sm:mt-9 text-center sm:text-left">
            {isAdmin && (
              <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg p-1 mx-12 w-48 relative">
                {/* Active indicator - this is what animates */}
                <div
                  className={`absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-lg bg-black dark:bg-white transition-transform duration-300 ease-in-out ${
                    isAdminView ? "translate-x-[calc(100%+8px)]" : ""
                  }`}
                />

                <button
                  onClick={() => handleToggle("student")}
                  className={`py-1.5 px-1 rounded-lg text-xs font-medium transition-colors w-1/2 text-center z-10 relative ${
                    !isAdminView
                      ? "text-white dark:text-black"
                      : "text-gray-700 dark:text-gray-300"
                  }`}
                >
                  Student View
                </button>
                <button
                  onClick={() => handleToggle("admin")}
                  className={`py-1.5 px-1 rounded-lg text-xs font-medium transition-colors w-1/2 text-center z-10 relative ${
                    isAdminView
                      ? "text-white dark:text-black"
                      : "text-gray-700 dark:text-gray-300"
                  }`}
                >
                  Admin View
                </button>
              </div>
            )}
            <ThemeIcon />
            <AuthButton />
          </div>
        </div>
        <hr className="my-5" />

        {/* Page Content */}
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;

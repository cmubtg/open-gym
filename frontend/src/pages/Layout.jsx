import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "context/AuthContext";
import { ThemeIcon, AuthButton, LoginPopup } from "components";
import DashboardButton from "components/misc/DashboardButton";
import { getTopBarMessage } from "data/topbarmessages";
import { useLocation } from "react-router-dom";

const Layout = () => {
  return (
    <div className="btg_page_container">
      <div className="w-full h-full pt-12">
        <TitleBar />
        <Divider />
        <Outlet /> {/* Child routes rendered here */}
        <LoginPopup />
      </div>
    </div>
  );
};

const TitleBar = () => {
  return (
    <div className="w-full flex flex-col sm:flex-row justify-between items-center text-center sm:text-left">
      <div>
        <Logo />
        <StatusMessage />
      </div>

      <div className="flex flex-col sm:flex-row items-center sm:gap-1 mt-6 sm:mt-9 text-center sm:text-left">
        <DashboardButton />
        <div className="flex mt-4 sm:mt-0">
          <ThemeIcon />
          <AuthButton />
        </div>
      </div>
    </div>
  );
};

// Message component for rotating messages
const StatusMessage = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const [message, setMessage] = useState("");
  const isAdminView = location.pathname.includes("/dashboard");

  useEffect(() => {
    if (isAdminView) {
      setMessage("Admin Dashboard");
    } else {
      // Only set up the interval for rotating messages in student view
      setMessage(getTopBarMessage(isAuthenticated));
      const interval = setInterval(() => {
        setMessage(getTopBarMessage(isAuthenticated));
      }, 300000);

      return () => clearInterval(interval);
    }
  }, [isAuthenticated, isAdminView]);

  return <p>{message}</p>;
};

const Logo = () => {
  return (
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
  );
};

const Divider = () => {
  return <hr className="my-5" />;
};

export default Layout;

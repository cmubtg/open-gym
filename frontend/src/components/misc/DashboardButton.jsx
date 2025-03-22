
import { useAuth } from "context/AuthContext";

const DashboardButton = () => {
    const { isAdmin } = useAuth();

    const handleClick = () => {
        // Quick fix
        const currentDomain = window.location.hostname;
        const protocol = window.location.protocol;
        window.location.href = `${protocol}//dashboard.${currentDomain}:3000`;
    }
    
    if (!isAdmin) return null; // Conditionally render the button

    return (
        <button onClick={handleClick} className="flex items-center justify-center w-34 pl-0 pr-5 text-xs transition-colors ">
                <div className="flex items-center justify-end sm:justify-center w-full nav_icon">
                  <span className="text-center">ADMIN DASHBOARD</span>
                </div>
            </button>
        
    );
};

export default DashboardButton;

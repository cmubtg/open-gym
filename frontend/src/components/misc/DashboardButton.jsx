
import { useAuth } from "context/AuthContext";
import { useNavigate } from "react-router-dom";


const DashboardButton = () => {
    const { isAdmin } = useAuth();
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/dashboard');
    }
    
    if (!isAdmin) return null; // Conditionally render the button

    return (
        <button onClick={handleClick} className="flex items-center justify-center w-32 mr-4 text-xs transition-colors ">
                <div className="flex items-center justify-end sm:justify-center w-full nav_icon">
                  <span className="text-center">ADMIN</span>
                </div>
            </button>
        
    );
};

export default DashboardButton;

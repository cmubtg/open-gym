import { useState, useEffect } from "react";
import { AlertOctagon, X} from "lucide-react";
import { useAuth } from "context/AuthContext";

const showBannerProb = 1;

const Banner = ({ message, children, onClose }) => {
    const { isAuthenticated } = useAuth();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(isAuthenticated ? Math.random() < showBannerProb : false);
    }, [isAuthenticated]);

    if (!isVisible) return null;

    return (
        <div className="flex items-stretch w-full h-full rounded-lg overflow-hidden border-2 border-btg-yellow mb-8">
            <div className="bg-btg-yellow w-10 min-h-10 h-auto flex items-center justify-center flex-shrink-0">
                <AlertOctagon className="text-white w-4 min-h-full sm:h-4 flew-grow-0" />
            </div>

            <div className="bg-btg-yellow bg-opacity-20 text-btg-yellow-dark text-xs flex-1 flex items-center px-4">
                <div className="flex-1 text-center">{children || message}</div>
                <button
                    onClick={() => {
                        setIsVisible(false);
                        if (onClose) onClose();
                    }}
                    className="text-btg-yellow-dark font-bold px-2 hover:opacity-70 transition flex-shrink-0"
                >
                    <X className="w-4 h-4"/>
                </button>
            </div>
        </div>
    );
};

export default Banner;
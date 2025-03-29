import { useState, useEffect } from "react";
import { AlertOctagon, X} from "lucide-react";
import { useAuth } from "context/AuthContext";

const showBannerProb = 0.4;

const Banner = ({ message, children, onClose }) => {
  const { isAuthenticated } = useAuth();
  const [isVisible, setIsVisible] = useState(() => {
    return isAuthenticated && Math.random() < showBannerProb;
  });

  useEffect(() => {
    if (!isAuthenticated) {
      setIsVisible(false);
    }
  }, [isAuthenticated]);

  if (!isVisible) return null;

  return (
    <div className="flex items-stretch w-full rounded-lg overflow-hidden border-2 border-btg-yellow mb-8">
      <div className="bg-btg-yellow w-10 h-full py-3 flex items-center justify-center flex-shrink-0">
        <AlertOctagon className="text-white w-4 h-4 flew-grow-0" />
      </div>

      <div className="bg-btg-yellow bg-opacity-20 text-btg-yellow-dark text-xs flex-1 flex justify-between items-center px-4">
        <div>{children || message}</div> {}
        <button
          onClick={() => {
            setIsVisible(false);
            if (onClose) onClose();
          }}
          className="text-btg-yellow-dark font-bold px-2 hover:opacity-70 transition"
        >
          <X className="w-4 h-4"/>
        </button>
      </div>
    </div>
  );
};

export default Banner;
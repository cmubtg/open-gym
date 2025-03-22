import { useState } from "react";
import { AlertOctagon } from "lucide-react";

const Banner = ({ message, children, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

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
          className="text-btg-yellow-dark font-bold px-2"
        >
          ✖
        </button>
      </div>
    </div>
  );
};

export default Banner;

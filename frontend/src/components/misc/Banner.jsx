import { useState } from "react";
import { AlertOctagon } from "lucide-react";

const Banner = ({ message, children, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="flex items-stretch w-full rounded-lg overflow-hidden border-2 border-[#ffc700] mb-8">
      <div className="bg-[#ffc700] w-10 h-full py-3 flex items-center justify-center flex-shrink-0">
        <AlertOctagon className="text-white w-4 h-4 flew-grow-0" />
      </div>

      <div className="bg-[#ffc700] bg-opacity-20 text-[#554200] text-xs flex-1 flex justify-between items-center px-4">
        <div>{children || message}</div> {}
        <button
          onClick={() => {
            setIsVisible(false);
            if (onClose) onClose();
          }}
          className="text-[#554200] font-bold px-2"
        >
          ✖
        </button>
      </div>
    </div>
  );
};

export default Banner;

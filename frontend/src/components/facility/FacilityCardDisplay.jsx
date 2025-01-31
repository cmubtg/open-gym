import React, {useState} from 'react';
import { isOpen } from "utils/utils";
import { useFacility } from "context/FacilityContext";
import { BiTime } from "react-icons/bi";
import { getFacilitiesMetadata } from '../../data/facilities';


const FacilityCardDisplay = () => {
  const { facility, closingStatus } = useFacility();
  const [isOverlayVisible, setOverlayVisible] = useState(false); // State for toggle

  const formatHours = (hours) =>
    `${hours.open.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    })} - ${hours.close.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    })}`;
  
  // const facilities = getFacilitiesMetadata();
  // const gym = facilities.find(facility => facility.id === "cohonFC");

  const weekdayHours = formatHours(facility.hours[0]);
  const weekendHours = formatHours(facility.hours[6]);

  // TODO n/BPS-229 - Convert to enum when typescript is added
  const isComingSoon = facility.status === "coming soon";
  const isCurrentlyClosed = !isOpen(closingStatus);

  const getStatusDisplay = () => {
    if (isComingSoon) {
      return "Coming Soon";
    }
    if (isCurrentlyClosed) {
      return closingStatus;
    }
    return null;
  };

  // Current status of gym to display on card
  const statusText = getStatusDisplay();

  return (
    <div className="card_top relative">
      {/* TODO: Restore link when routing is implemented */}
      {/* <Link className="card_link" to={`/facility/${facility.id}`}> 
          </Link> */}

      {/* Facility Card Image */}
      <img 
        className={`card_img 
          ${isOverlayVisible ? "brightness-[0.4] opacity-90" : ""}
          ${(isCurrentlyClosed || isComingSoon) ? "opacity-65 brightness-[0.5]" : ""}`}

          src={facility.image} 
          alt={facility.name} 
      />
  
      {/* Info Button */}
      <div className="info_button_wrapper top-2 left-2 z-50">
          <button
            className="info_button"
            onClick={() => setOverlayVisible(!isOverlayVisible)}>
            <BiTime size="20px" style={{ color: 'white' }} />
          </button>
      </div>

      {/* Facility Card Status Text */}
      {statusText && !isOverlayVisible && (
        <p className="justify-center absolute text-base font-bold text-slate-50 opacity-100 z-40">
          {statusText}
        </p>
      )}

      {/* Toggle Overlay */}
      {isOverlayVisible && (
        <div className="info_overlay absolute inset-0 bg-gray-800 bg-opacity-70 flex flex-col items-center justify-center text-white text-center">
        <h3 className="text-xl text-white font-bold mb-4">Hours</h3>
        <p className="text-white mb-2" style={{ fontSize: "16px" }}>
          <span className="font-bold">Monday - Friday:</span> {weekdayHours}
          </p>
          <p className="text-white" style={{ fontSize: "16px" }}>
            <span className="font-bold">Saturday - Sunday:</span> {weekendHours}
            </p>
        </div>
      )}
    </div>
  );
};

export default FacilityCardDisplay;
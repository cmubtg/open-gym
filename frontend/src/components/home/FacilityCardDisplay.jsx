import React from "react";
import { isOpen } from "../../utils/utils";
import { useFacility } from "../../context/FacilityContext";

const FacilityCardDisplay = () => {
  const { facility, closingStatus } = useFacility();
  
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
    <div className="card_top">
      {/* TODO: Restore link when routing is implemented */}
      {/* <Link className="card_link" to={`/facility/${facility.id}`}> 
          </Link> */}

      {/* Facility Card Image */}
      <img 
        className={`card_img ${(isCurrentlyClosed || isComingSoon) ? 
          "opacity-65 brightness-[0.5]" : ""}`}
        src={facility.image} 
        alt={facility.name} 
      />
      
      {/* Facility Card Status Text */}
      {statusText && (
        <p className="absolute justify-center text-base font-bold text-slate-50 opacity-100">
          {statusText}
        </p>
      )}
    </div>
  );
};

export default FacilityCardDisplay;
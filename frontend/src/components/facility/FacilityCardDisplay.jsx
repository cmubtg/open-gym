import React, { useState } from "react";
import { isOpen } from "utils/utils";
import { useFacility } from "context/FacilityContext";
import { BiTime } from "react-icons/bi";
import { getFacilitiesMetadata } from "../../data/facilities";

const FacilityCardDisplay = () => {
  const { facility, closingStatus } = useFacility();
  const [isOverlayVisible, setOverlayVisible] = useState(false);

  const formatHours = (hours) =>
    `${hours.open.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    })} - ${hours.close.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    })}`;

  const weekdayHours = formatHours(facility.hours[1]);
  const weekendHours = formatHours(facility.hours[6]);
  const weekdayClosed = facility.hours[1].open.getHours() == facility.hours[0].close.getHours();
  const weekendClosed = facility.hours[6].open.getHours() == facility.hours[6].close.getHours();
  

  const isComingSoon = facility.status === "coming soon";
  const isCurrentlyClosed = !isOpen(closingStatus);

  const getStatusDisplay = () => {
    if (isComingSoon) return "Coming Soon";
    if (isCurrentlyClosed) return closingStatus;
    return null;
  };

  const statusText = getStatusDisplay();

  return (
    <div className="card_top relative">
      <img
        className={`card_img 
          ${isOverlayVisible ? "brightness-[0.4] opacity-90" : ""}
          ${
            isCurrentlyClosed || isComingSoon
              ? "opacity-65 brightness-[0.5]"
              : ""
          }`}
        src={facility.image}
        alt={facility.name}
      />

      {/* Info Button */}
      <div className="info_button_wrapper absolute top-2 left-2 z-10">
        <button
          className="info_button"
          onClick={() => setOverlayVisible(!isOverlayVisible)}
        >
          <BiTime className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Facility Card Status Text */}
      {statusText && !isOverlayVisible && (
        <p className="justify-center absolute text-base font-bold text-slate-50 opacity-100 z-5">
          {statusText}
        </p>
      )}

      {/* Hours Overlay */}
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center 
          bg-black/30 transition-all duration-500 transform
          ${
            isOverlayVisible ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
      >
        <div className="space-y-4 text-center">
          <h3 className="text-lg text-white font-bold">Hours</h3>
          <p className="text-sm text-white">
            <span className="font-bold">Monday - Friday:</span> {weekdayClosed ?  "Closed" : weekdayHours}
          </p>
          <p className="text-sm text-white">
            <span className="font-bold">Saturday - Sunday:</span> {weekendClosed ?  "Closed" : weekendHours}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FacilityCardDisplay;

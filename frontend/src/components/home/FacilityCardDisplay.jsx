import React from "react";
import { isOpen } from "../../utils/utils";
import { useFacility } from "../../context/FacilityContext";

const FacilityCardDisplay = () => {
  const { facility, closingStatus } = useFacility();

  return (
    <div className="card_top">
      {/* TODO */}
      {/* put this image back in the link section to have it route to facility detail page */}
      {/* <Link className="card_link" to={`/facility/${facility.id}`}> 
      </Link> */}
      <img
        className={`card_img ${
          !isOpen(closingStatus) && "opacity-65 brightness-[0.5]"
        }`}
        src={facility.image}
        alt={facility.name}
      />

      {!isOpen(closingStatus) && (
        <p className="absolute justify-center text-base font-bold text-slate-50 opacity-100">
          {closingStatus}
        </p>
      )}
    </div>
  );
};

export default FacilityCardDisplay;

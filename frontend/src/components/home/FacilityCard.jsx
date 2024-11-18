import React from "react";
import useFacilityOccupancy from "../../hooks/useFacilityOccupancy";
import { FacilityCardDisplay, FacilityCardInfo } from "../index";
import { useFacilityMetadata } from "../../hooks/useFacilityMetadata";

const FacilityCard = () => {
  const facility = useFacilityMetadata();
  const { occupancy, closingStatus, lastFetch } =
    useFacilityOccupancy(facility);

  return (
    <div className="w-full h-full">
      <FacilityCardDisplay {...{ occupancy, closingStatus }} />
      <FacilityCardInfo {...{ occupancy, lastFetch, closingStatus }} />
    </div>
  );
};

export default FacilityCard;

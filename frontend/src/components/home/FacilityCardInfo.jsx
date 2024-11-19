import React from "react";
import OccMeter from "./OccMeter";
import LiveDot from "../misc/LiveDot";
import { isClosed, getNextOpenReadable } from "../../utils/utils";
import { useFacilityMetadata } from "../../hooks/useFacilityMetadata";

const FacilityCardInfo = ({ occupancy, lastFetch, closingStatus }) => {
  // TODO: notion/BPS-202 - Appropriately keep track of last time since fetch
  const lastFetchMsg =
    lastFetch === 1 ? `1 minute ago` : `${lastFetch} minutes ago`;
  return (
    <div className={`card_btm ${isClosed(closingStatus) && "opacity-55"}`}>
      <FacilityCardTitle {...{ closingStatus, lastFetchMsg }} />
      <FacilityCardMeter {...{ occupancy, closingStatus }} />
    </div>
  );
};

const FacilityCardTitle = ({ closingStatus, lastFetchMsg }) => {
  const facility = useFacilityMetadata();
  return (
    <div className="w-[75%] h-full mt-2.5 min-[340px]:mt-4 flex flex-col">
      {/* Gym Name */}
      <h3>{facility.name}</h3>

      {/* Red dot + x minutes ago */}
      {!isClosed(closingStatus) ? (
        <LiveDot msg={lastFetchMsg} />
      ) : (
        <p className="pt-1">
          Opens {getNextOpenReadable(facility, new Date(Date.now()))}
        </p>
      )}
    </div>
  );
};

const FacilityCardMeter = ({ occupancy, closingStatus }) => {
  const facility = useFacilityMetadata();
  return (
    <>
      {!isClosed(closingStatus) && (
        <div className="min-w-[150px] h-full mt-4">
          <OccMeter
            id={facility.id}
            occupancy={occupancy}
            max_occupancy={facility.max_occupancy}
          />
        </div>
      )}
    </>
  );
};
export default FacilityCardInfo;

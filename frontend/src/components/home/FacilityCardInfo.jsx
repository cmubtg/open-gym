import React from "react";
import OccMeter from "./OccMeter";
import LiveDot from "../misc/LiveDot";
import { isClosed, getNextOpenReadable } from "../../utils/utils";
import { useFacility } from "../../context/FacilityContext";
import { useAuth } from "../../context/AuthContext";

const FacilityCardInfo = () => {
  const { closingStatus } = useFacility();
  return (
    <div className={`card_btm ${isClosed(closingStatus) && "opacity-55"}`}>
      <FacilityCardTitle />
      <FacilityCardMeter />
    </div>
  );
};

const FacilityCardTitle = () => {
  const { facility, closingStatus, lastFetch } = useFacility();
  const { isAuthenticated, isGuestMode } = useAuth();

  const lastFetchMsg =
    lastFetch === 1 ? `1 minute ago` : `${lastFetch} minutes ago`;

  if (isGuestMode || !isAuthenticated) {
    return (
      <div className="w-[75%] h-full mt-2.5 min-[340px]:mt-4 flex flex-col">
        <h3>{facility.name}</h3>
        <div className="flex flex-row items-center mt-[-5px]"></div>
      </div>
    );
  }

  return (
    <div className="w-[75%] h-full mt-2.5 min-[340px]:mt-4 flex flex-col">
      <h3>{facility.name}</h3>
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

const FacilityCardMeter = () => {
  const { facility, occupancy, closingStatus } = useFacility();
  const { isAuthenticated, isGuestMode } = useAuth();

  if (isGuestMode || !isAuthenticated) {
    // TODO:BPS-223 n/ - Better guest mode handling
    return <></>;
  }

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

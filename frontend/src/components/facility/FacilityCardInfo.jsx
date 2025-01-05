import OccMeter from "components/facility/OccMeter";
import LiveDot from "components/facility/LiveDot";
import { isClosed } from "utils/utils";
import { useFacility } from "context/FacilityContext";
import { useAuth } from "context/AuthContext";

const FacilityCardInfo = () => {
  const { facility, closingStatus } = useFacility();
  const isComingSoon = facility.status === "coming soon";
  const { isAuthenticated } = useAuth();

  const showOccInfo = !isComingSoon && !isClosed(closingStatus);

  return (
    <div className={`card_btm ${(isClosed(closingStatus) || isComingSoon) && "opacity-55"}`}>
      {/* Facility Name */}
      <div className="w-[75%] h-full mt-2.5 min-[340px]:mt-4 flex flex-col">
        <h3>{facility.name}</h3>
        {showOccInfo && (
          isAuthenticated ? (
            <LiveDot />
          ) : (
            <div className="flex items-center gap-2 mt-3">
              <div className="w-40 h-3 bg-btg-light-grey dark:bg-btg-dark-grey rounded" />
            </div>
          )
        )}
      </div>

      {/* Occupancy Meter */}
      {showOccInfo && (
        isAuthenticated ? (
          <FacilityCardMeter />
        ) : (
          <div className="min-w-[150px] h-full mt-4">
            <SkeletonMeter />
          </div>
        )
      )}
    </div>
  );
};

const SkeletonMeter = () => {
  return (
    <div className="meter_container">
      <svg className="w-full h-full" viewBox="0 -10 90 70">
        <circle 
          id="meter_track" 
          cx="65" 
          cy="70" 
          r="70"
          className="stroke-btg-light-grey dark:stroke-btg-dark-grey"
        ></circle>
      </svg>
      <div className="meter_info">
        <div className="w-8 h-4 bg-btg-light-grey dark:bg-btg-dark-grey rounded" />
        <p className="font-light text-[7px] mt-1 text-btg-light-grey dark:text-btg-dark-grey">
          of max occupancy
        </p>
      </div>
    </div>
  );
};

const FacilityCardMeter = () => {
  return (
      <div className="min-w-[150px] h-full mt-4">
        <OccMeter />
      </div>
  );
};

export default FacilityCardInfo;
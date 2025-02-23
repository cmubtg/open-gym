import OccMeter from "components/facility/OccMeter";
import LiveDot from "components/facility/LiveDot";
import { isClosed } from "utils/utils";
import { useFacility } from "context/FacilityContext";
import { useAuth } from "context/AuthContext";

const FacilityCardInfo = () => {
  const { facility, closingStatus } = useFacility();
  const isComingSoon = facility.status === "coming soon";
  const { isAuthenticated } = useAuth()

  const showOccInfo = !isComingSoon && !isClosed(closingStatus) && isAuthenticated;
  return (
    <div className={`card_btm ${(isClosed(closingStatus) || isComingSoon) && "opacity-55"}`}>
      
      {/* Facility Name */}
      <div className="w-[75%] h-full mt-2.5 min-[340px]:mt-4 flex flex-col">
        <h3>{facility.name}</h3>
        {showOccInfo && <LiveDot />}
      </div>

      {/* Occupancy Meter */}
      {showOccInfo && <FacilityCardMeter />}
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
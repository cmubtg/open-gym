import { getOccClass } from "utils/utils";
import { useFacility } from "context/FacilityContext";

const OccMeter = () => {
  let { occupancy, facility } = useFacility();
  const DELTA_PENALTY = 30;
  occupancy -= DELTA_PENALTY; // TODO n/BPS-307: temp offest observed end of day
  occupancy *= 0.3; // TODO n/BPS-307: temp occupancy reduction
  const maxOccupancy = facility?.max_occupancy

  // Calculate the strokeDashoffset value for the meter_level circle
  const calculateOffset = (percentage) => {
    const boundedPerc = Math.max(0, Math.min(100, percentage));
    const startOffset = 200; // offset at 0%
    const endOffset = 0; // offset at 100%

    return { 
      offset: startOffset + (endOffset - startOffset) * (boundedPerc / 100),
      boundedPercentage: boundedPerc
     }
  };
  const occupancyPercentage = ((occupancy / maxOccupancy) * 100).toFixed()
  const { offset, boundedPercentage } = calculateOffset(occupancyPercentage);
  const occ_class = getOccClass(occupancyPercentage);

  return (
    <div className="meter_container">
      <svg className="w-full h-full" viewBox="0 -10 90 70">
        <circle
          id="meter_track"
          cx="65"
          cy="70"
          r="70"
        ></circle>
        <circle
          id="meter_level"
          cx="65"
          cy="70"
          r="70"
          strokeDashoffset={offset}
          className={`${occ_class}`}
        ></circle>
      </svg>
      <div className="meter_info">
        <p className="font-bold text-sm text-black dark:text-white">
          {boundedPercentage}
          <span className="text-xs">%</span>
        </p>
        <p className="font-light text-[7px] mt-[-5px]">of max occupancy</p>
      </div>
    </div>
  );
};

export default OccMeter;

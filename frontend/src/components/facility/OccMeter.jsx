import { getOccClass } from "utils/utils";
import { useFacility } from "context/FacilityContext";
import { getFacilitiesMetadata } from "data/facilities";

const OccMeter = () => {
  const { occupancy, facility } = useFacility();
  const metadata = getFacilitiesMetadata()
  // want to filter metadata list by id that matches facility name
  const facilityMetadata = metadata.find((item) => item.id === facility.id);
  const maxOccupancy = facilityMetadata?.occupancy
  
  // Calculate the strokeDashoffset value for the meter_level circle
  const calculateOffset = (percentage) => {
    const boundedPerc = Math.max(0, Math.min(100, percentage));
    const startOffset = 180; // offset at 0%
    const endOffset = -20; // offset at 100%
    return startOffset + (endOffset - startOffset) * (boundedPerc / 100);
  };
  const occupancyPercentage = (occupancy / maxOccupancy) * 100
  const offset = calculateOffset(occupancyPercentage);
  const occ_class = getOccClass(occupancyPercentage);

  return (
    <div className="meter_container">
      <svg className="w-full h-full" viewBox="0 -10 90 70">
        <circle id="meter_track" cx="65" cy="70" r="70"></circle>
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
        <p className="font-bold text-base text-black dark:text-white">
          {occupancyPercentage}
          <span className="text-xs">%</span>
        </p>
        <p className="font-light text-[7px] mt-[-5px]">of max occupancy</p>
      </div>
    </div>
  );
};

export default OccMeter;

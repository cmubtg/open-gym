import { getOccClass } from "utils/utils";
import { useFacility } from "context/FacilityContext";

const OccMeter = () => {
  // TODO Fetch occupancy data from API
  const { occupancy } = useFacility();

  var offset = occupancy * 2;
  var perc = Math.max(0, Math.floor(((offset / 200) * 100 - 90) * -1));
  var occ_class = getOccClass(perc);

  return (
    <div className="meter_container">
      {/* view box left, up/down, zoom in, zoom out */}
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
          {perc}
          <span className="text-xs">%</span>
        </p>
        <p className="font-light text-[7px] mt-[-5px]">of max occupancy</p>
      </div>
    </div>
  );
};

export default OccMeter;

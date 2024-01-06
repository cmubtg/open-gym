

import React from 'react';
import OccMeter from './OccMeter';
import LiveDot from './LiveDot';
import { isClosed, getNextOpenReadable} from '../utils/utils';

const FacilityCardInfo = ({facility, occupancy, currTime, lastFetch, closingStatus}) => {
    return (
      <div className={`card_btm ${isClosed(closingStatus) && "opacity-55"}`}>
          
        {/* facility name and live results */}
        <div className="w-auto h-full mt-4 flex flex-col">
          <h3 className="font-extrabold text-base sm:text-[17px]">
            {facility.name}
          </h3>
            {!isClosed(closingStatus) ?
              <LiveDot msg={`${lastFetch}` + " minutes ago"}/> :
              <p className="text-sm">Opens {getNextOpenReadable(facility, new Date(Date.now()))}</p>
            }
        </div>
  
        {/* Meter */}
        <div className="min-w-[155px] h-full mt-4">
          {!isClosed(closingStatus) && 
          <OccMeter id={facility.id} occupancy={occupancy} max_occupancy={facility.max_occupancy}/>}
        </div>
      </div>
    );
  }

export default FacilityCardInfo;


import React from 'react';
import OccMeter from './OccMeter';
import LiveDot from '../misc/LiveDot';
import { isClosed, getNextOpenReadable} from '../../utils/utils';

const FacilityCardInfo = ({facility, occupancy, currTime, lastFetch, closingStatus}) => {
  
    const lastFetchMsg = (lastFetch === 1) ? `1 minute ago` : `${lastFetch} minutes ago`
    return (
      <div className={`card_btm ${isClosed(closingStatus) && "opacity-55"}`}>   
        <FacilityCardTitle {...{facility, closingStatus, lastFetchMsg}}/>
        <FacilityCardMeter {...{facility, occupancy, closingStatus}}/>
      </div>
    );
  }

const FacilityCardTitle = ({facility, closingStatus, lastFetchMsg}) => {

  const isComingSoon = facility.status === "coming soon";

  return (
    <div className="w-[75%] h-full mt-2.5 min-[340px]:mt-4 flex flex-col">
      
      {/* Gym Name */}
      <h3>{facility.name}</h3>

      {/* Red dot + x minutes ago */}
      {!isClosed(closingStatus) && !isComingSoon ? (
        <LiveDot msg={lastFetchMsg} />
      ) : (
        !isComingSoon && (
          <p className="pt-1">
            Opens {getNextOpenReadable(facility, new Date(Date.now()))}
          </p>
        )
      )}
    </div>
  );
}

const FacilityCardMeter = ({facility, occupancy, closingStatus}) => { 
  return (
    <>
      {!isClosed(closingStatus) && facility.status === "established" && 
        <div className="min-w-[150px] h-full mt-4">
          <OccMeter id={facility.id} occupancy={occupancy} max_occupancy={facility.max_occupancy}/>
        </div>
      }
    </>
  );
}
export default FacilityCardInfo;
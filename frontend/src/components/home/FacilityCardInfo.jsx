

import React from 'react';
import OccMeter from './OccMeter';
import LiveDot from '../misc/LiveDot';
import { isClosed, getNextOpenReadable, getGymHours} from '../../utils/utils';

import FlagModal from './FlagModal';

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
  // const [specialHour, setSpecialHour] = useState(null);
  // specialHour = getGymHours(facility);
  // ({Sunday : Open : close, Monday : Open, close})
  var isSpecialHour = facility.hours.data
  return (
    <div className="w-[75%] h-full mt-2.5 min-[340px]:mt-4 flex flex-col">
      
      {/* Gym Name */}
      <div className="flex flex-row">
        <h3><span className="flex">{facility.name} </span></h3> 
        <FlagModal />
      </div>  
      

      {/* Red dot + x minutes ago */}
      { !isClosed(closingStatus) ?
        <LiveDot msg={lastFetchMsg}/> :
        <p className="pt-1">Opens {getNextOpenReadable(facility, new Date(Date.now()))}</p>
      }
    </div>
  );
}

const FacilityCardMeter = ({facility, occupancy, closingStatus}) => {
  return (
    <>
      {!isClosed(closingStatus) && 
        <div className="min-w-[150px] h-full mt-4">
          <OccMeter id={facility.id} occupancy={occupancy} max_occupancy={facility.max_occupancy}/>
        </div>
      }
    </>
  );
}
export default FacilityCardInfo;
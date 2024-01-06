
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import OccMeter from './OccMeter';
import LiveDot from './LiveDot';
import { getClosingStatus, isOpen, isClosed } from '../utils/utils';
import { MINUTE_MS } from '../utils/constants';


const FacilityCard = ({facility, closed}) => {
  const [occupancy, setOccupancy] = useState(0);
  const [closingStatus, setClosingStatus] = useState("open");

  // TODO Keep track of time since last fetch
  const lastFetch = Math.floor(Math.random() * 10) + 1;

  // TODO Craft message function in utils


  useEffect(() => {
    const fetchOccupancy = async () => 
    {
      const res = await fetch(`/api/occupancy/${facility.id}`);
      const data = await res.json();
      if (res.ok){
        setOccupancy(data.count);
      }
    }

    const updateClosing = () => {
      var currDateTime = new Date(Date.now());
      var closingStatus = getClosingStatus(facility, currDateTime);
      setClosingStatus(() => closingStatus);
    }
    fetchOccupancy();
    updateClosing();
    const intervalId = setInterval(updateClosing, MINUTE_MS); 
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="w-full h-full">
      <div className="card_top">
        <Link className="card_link" to={`/facility/${facility.id}`}>
          <img className={`card_img
                           ${!isOpen(closingStatus) && 
                              "opacity-65 brightness-[0.5]"}`} 
                          src={facility.image} alt={facility.name} />
        </Link>
        
        {!isOpen(closingStatus) && 
          <p className="absolute font-bold justify-center text-slate-50 opacity-100">
            {closingStatus}
          </p>
         }
      </div>

      <div className={`card_btm ${isClosed(closingStatus) && "opacity-55"}`}>
        
        {/* facility name and live results */}
        <div className="w-[50%] h-full m-auto mt-4 flex flex-col justify-start
                        sm:w-[60%]">
          <h3 className="font-extrabold text-[17px] xs:text-8">
            {facility.name}
          </h3>
            {!isClosed(closingStatus) &&
            <LiveDot msg={`${lastFetch}` + " minutes ago"}/>}
        </div>

        {/* Meter */}
        <div className="w-[50%] xs:w-[40%] mt-4">
          {!isClosed(closingStatus) && 
          <OccMeter id={facility.id} occupancy={occupancy} max_occupancy={facility.max_occupancy}/>}
        </div>

      </div>

    </div>
  );
}

export default FacilityCard;
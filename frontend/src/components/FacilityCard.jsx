
import React, { useState, useEffect } from 'react';
import { getClosingStatus } from '../utils/utils';
import { MINUTE_MS } from '../utils/constants';
import FacilityCardDisplay from './FacilityCardDisplay';
import FacilityCardInfo from './FacilityCardInfo';


const FacilityCard = ({facility, closed}) => {
  const [occupancy, setOccupancy] = useState(0);
  const [closingStatus, setClosingStatus] = useState("open");

  // TODO Keep track of time since last fetch
  const lastFetch = Math.floor(Math.random() * 10) + 1;

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
      <FacilityCardDisplay {...{ facility, occupancy, closingStatus }} />
      <FacilityCardInfo {...{ facility, occupancy, lastFetch, closingStatus }} />
    </div>
  );
}




export default FacilityCard;

import React, { useState, useEffect } from 'react';
import { getClosingStatus, isClosed } from '../utils/utils';
import { MINUTE_MS } from '../utils/constants';
import FacilityCardDisplay from './FacilityCardDisplay';
import FacilityCardInfo from './FacilityCardInfo';


const FacilityCard = ({facility, closed}) => {
  const [occupancy, setOccupancy] = useState(0);
  const [closingStatus, setClosingStatus] = useState("closed");

  // TODO Keep track of time since last fetch
  const lastFetch = Math.floor(Math.random() * 10) + 1;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/occupancy/${facility.id}`);
        const data = await res.json();
        if (res.ok) {
          setOccupancy(data.occupancy);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    const updateClosingStatus = () => {
      const currDateTime = new Date(Date.now());
      const newClosingStatus = getClosingStatus(facility, currDateTime);
      if (newClosingStatus !== closingStatus) {
        setClosingStatus(newClosingStatus);
      }
    };

    updateClosingStatus();
    if (!isClosed(closingStatus)) {
      console.log(`Fetching data for ${facility.name}`);
      fetchData();
    }
    const intervalId = setInterval(updateClosingStatus, MINUTE_MS);
    return () => clearInterval(intervalId);
  }, [closingStatus, facility]);

  return (
    <div className="w-full h-full">
      <FacilityCardDisplay {...{ facility, occupancy, closingStatus }} />
      <FacilityCardInfo {...{ facility, occupancy, lastFetch, closingStatus }} />
    </div>
  );
}


export default FacilityCard;
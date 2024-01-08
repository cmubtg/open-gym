
import React, { useState, useEffect } from 'react';
import { getClosingStatus, isClosed } from '../utils/utils';
import { MINUTE_MS } from '../utils/constants';
import FacilityCardDisplay from './FacilityCardDisplay';
import FacilityCardInfo from './FacilityCardInfo';


const FacilityCard = ({facility, closed}) => {
  const [occupancy, setOccupancy] = useState(0);
  const [closingStatus, setClosingStatus] = useState("open");

  // TODO Keep track of time since last fetch
  const lastFetch = Math.floor(Math.random() * 10) + 1;

  const fetchData = async () => {
    try {
      const res = await fetch(`/api/occupancy/${facility.id}`);
      const data = await res.json();
      if (res.ok) {
        setOccupancy(data.count);
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

  useEffect(() => {
    updateClosingStatus();
    if (!isClosed(closingStatus)) {
      fetchData();
    }
    const intervalId = setInterval(updateClosingStatus, MINUTE_MS);
    return () => clearInterval(intervalId);
  }, [closingStatus]);

  return (
    <div className="w-full h-full">
      <FacilityCardDisplay {...{ facility, occupancy, closingStatus }} />
      <FacilityCardInfo {...{ facility, occupancy, lastFetch, closingStatus }} />
    </div>
  );
}




export default FacilityCard;
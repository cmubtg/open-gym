
import React, { useState, useEffect } from 'react';

const FacilityCard = ({facility}) => {
  const [occupancy, setOccupancy] = useState(0);

  useEffect(() => {
    const fetchOccupancy = async () => 
    {
      const res = await fetch('/api/occupancy');
      const data = await res.json();
      if (res.ok){
        setOccupancy(data.count);
      }
    }
    fetchOccupancy();
  }, []);

  return (
    <>
      <p>{facility.name} - Occupancy: {occupancy}</p>
    </>
  );
}

export default FacilityCard;
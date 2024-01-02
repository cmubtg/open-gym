
import React, { useState, useEffect } from 'react';
import OccMeter from './OccMeter';
import LiveDot from './LiveDot';


const FacilityCard = ({facility}) => {
  const [occupancy, setOccupancy] = useState(0);
  // TODO Keep track of time since last fetch
  const lastFetch = Math.floor(Math.random() * 10) + 1;

  // TODO Craft message function in utils

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
    <div className="w-full h-full ">
      <img className="card_top" src={facility.image} alt={facility.name} />
      <div></div>
      <div className="card_btm">
        {/* facility name and live results */}
        <div className="w-[60%] h-full m-auto mt-4 flex flex-col justify-start">
          <h3 className="font-extrabold text-[17px] ">{facility.name}</h3>
          <LiveDot color="btg-red" msg={`${lastFetch}` + " minutes ago"}/>
        </div>
        {/* // Meter */}
        <div className="w-[40%] mt-2">
          <OccMeter id={facility.id}/>
        </div>
      </div>
    </div>
  );
}

export default FacilityCard;
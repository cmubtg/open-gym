
import React, { useState, useEffect } from 'react';
import OccMeter from './OccMeter';
import LiveDot from './LiveDot';


const FacilityCard = ({facility}) => {
  const [occupancy, setOccupancy] = useState(0);
  // TODO Keep track of time since last fetch
  const lastFetch = Math.floor(Math.random() * 10) + 10;

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
    <div className="w-full h-full">

      <div className="card_top">
        {/* <div className={`card_status ${occupancy > 50 ? 'bg-btg-green' : 'bg-btg-red'}`}>
            {`${occupancy > 50 ? 'Busy' : 'Available'}`}</div> */}
        <img className="card_img" src={facility.image} alt={facility.name} />
      </div>

      <div className="card_btm">
        {/* facility name and live results */}
        <div className="w-[60%] h-full m-auto mt-4 flex flex-col justify-start">
          <h3 className="font-extrabold text-[17px] ">{facility.name}</h3>
          <LiveDot color="btg-red" msg={`${lastFetch}` + " minutes ago"}/>
        </div>
        {/* // Meter */}
        <div className="w-[40%] mt-4">
          <OccMeter id={facility.id} occupancy={occupancy}/>
        </div>
      </div>

    </div>
  );
}

export default FacilityCard;
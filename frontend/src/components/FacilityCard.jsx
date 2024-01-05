
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import OccMeter from './OccMeter';
import LiveDot from './LiveDot';


const FacilityCard = ({facility, closed}) => {
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
    <div className="w-full h-full">
      <div className="card_top">
        <Link className="card_img" to={`/facility/${facility.id}`}>
          <img className={"rounded-lg " + (closed ? "brightness-[0.4]" : "brightness-[0.8]")} src={facility.image} alt={facility.name} />
        </Link>
        {closed && <p className="absolute font-bold justify-center text-slate-50">Closed</p>}
      </div>

      <div className="card_btm">
        {/* facility name and live results */}
        <div className="w-[60%] h-full m-auto mt-4 flex flex-col justify-start">
          <h3 className="font-extrabold text-[17px]">{facility.name}</h3>
          <LiveDot msg={`${lastFetch}` + " minutes ago"}/>
        </div>

        {/* // Meter */}
        <div className="w-[40%] mt-4">
          {!closed && <OccMeter id={facility.id} occupancy={occupancy} max_occupancy={facility.max_occupancy}/>}
        </div>
      </div>

    </div>
  );
}

export default FacilityCard;
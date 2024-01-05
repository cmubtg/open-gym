
import React, {useEffect, useState} from 'react';
import { facilities } from '../data/facilities'; 
import { FacilityCard, ThemeIcon } from '../components';
import { MINUTE_MS } from '../utils/constants';
import { isClosed } from '../utils/utils';


const Home = () => {
  return (
    <div className="btg_page_container">
      <div className="btg_container min-h-[100vh] pt-12">
        <TitleBar/>
        <FacilityCards/>
      </div>
    </div>
  );
}

const TitleBar = () => {
  return (
    <div className="w-full flex justify-between">
      <h1>Facility Occupancy</h1>
      <ThemeIcon/>
    </div>
  );
};

const FacilityCards = () => {
  const [time, setTime] = useState(new Date(Date.now()))

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date(Date.now())), MINUTE_MS)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="btg_grid_container pb-8">
      {facilities.map((facility) => (
          <FacilityCard facility={facility} closed={isClosed(facility, time)}/>
      ))}
    </div>
  );
};

export default Home;

import React from 'react';
import { FacilityCard, ThemeIcon } from '../components'; 
import { GetFacilities } from '../data/facilities';

const Home = () => {
  return (
    <div className="btg_page_container">
      <div className="w-full h-full pt-8 mt-8">
        <TitleBar/>
        <FacilityCards/>
      </div>
    </div>
  );
}

const TitleBar = () => {
  return (
    <div className="w-full flex flex-row justify-between">
      <div>
        <h1>Facility Occupancy</h1>
        <p className="">Click on a gym for more occupancy information!</p>
      </div>
      <ThemeIcon/>
    </div>
  );
};

const FacilityCards = () => {
  const facilities = GetFacilities();
  return (
    <div className="btg_grid_container">
      {facilities.map((facility) => (
          <FacilityCard facility={facility}/>
      ))}
    </div>
  );
};

export default Home;
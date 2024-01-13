
import React from 'react';
import { FacilityCard, ThemeIcon } from '../components'; 
import { getFacilities } from '../data/facilities';

const Home = () => {
  return (
    <div className="btg_page_container">
      <div className="w-full h-full pt-8">
        <TitleBar/>
        <FacilityCards/>
      </div>
    </div>
  );
}

const TitleBar = () => {
  return (
    <div className="w-full h-auto flex justify-between">
      <h2>Facility Occupancy</h2>
      <ThemeIcon/>
    </div>
  );
};

const FacilityCards = () => {
  const facilities = getFacilities();
  return (
    <div className="btg_grid_container pb-8">
      {facilities.map((facility) => (
          <FacilityCard facility={facility}/>
      ))}
    </div>
  );
};

export default Home;
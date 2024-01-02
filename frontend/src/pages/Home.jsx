
import React from 'react';
import { facilities } from '../data/facilities'; 
import { FacilityCard, ThemeIcon } from '../components';

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
  return (
    <div className="btg_grid_container pb-8">
      {facilities.map((facility) => (
          <FacilityCard facility={facility} />
      ))}
    </div>
  );
};

export default Home;
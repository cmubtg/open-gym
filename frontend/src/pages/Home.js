import React from 'react';
import FacilityCard from '../components/FacilityCard';
import { facilities } from '../data/facilities'; 
import { BiSun } from 'react-icons/bi';

const Home = () => {
  // onClick={toggleDarkMode}
  return (
    <div className="btg_container min-h-[100vh] mt-12 px-6">
      <div className="w-full h-auto flex justify-between">
        <h1>Facility Occupancy</h1>
        <button >
          <BiSun size={25} />
      </button>
      </div>

      <div className="w-full h-auto pt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 facility_grid">
        {facilities.map((facility) => (
            <FacilityCard facility={facility} />
        ))}
      </div>
    </div>
  );
}

export default Home;
import React, { useState } from 'react';
import { FacilityCard, ThemeIcon, LoginPopup} from '../components'; 
import { getFacilities } from '../data/facilities';

export const Context = React.createContext();

const Home = () => {
  const [showLogin, setShowLogin] = useState(true); 

  return (
    <Context.Provider value={[showLogin, setShowLogin]}>
      <div className="btg_page_container"> 
        <div className="w-full h-full pt-8">
          <TitleBar setShowLogin={setShowLogin} />
          <FacilityCards />
          {showLogin && <LoginPopup setShowLogin={setShowLogin} />}  
        </div>
      </div>
    </Context.Provider>
  );
};

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
  const facilities = getFacilities();
  return (
    <div className="btg_grid_container">
      {facilities.map((facility) => (
          <FacilityCard facility={facility}/>
      ))}
    </div>
  );
};

export default Home;
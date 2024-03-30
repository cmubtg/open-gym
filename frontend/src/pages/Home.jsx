
import React from 'react';
import { FacilityCard, ThemeIcon } from '../components'; 
import { getFacilities } from '../data/facilities';
import TabGroup from '../components/misc/TabGroup';

const Home = () => {
  const tabvals = 
    [
      {header : "Tab 1", content : <div>This is the content for Tab 1</div>},
      {header : "Tab 2", content : <div>This is the content for Tab 2</div>},
      {header : "Tab 3", content : <div>This is the content for Tab 3</div>},
      {header : "Tab 4", content : <div>This is the content for Tab 4</div>},
    ]
    
  return (
    <div className="btg_page_container">
      <div className="w-full h-full pt-8">
        <TitleBar/>
        <TabGroup tabs={tabvals}/>
        {/* <FacilityCards/> */}
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
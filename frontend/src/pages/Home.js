import React from 'react';
import FacilityCard from '../components/FacilityCard';
// import { Link } from 'react-router-dom';
import { facilities } from '../data/facilities'; 

const Home = () => {
  return (
    <div className="container mx-auto mt-8">
      <h1>Facility Occupancy</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {facilities.map((facility) => (
            <FacilityCard facility={facility} />
        //   <Link to={`/card/${card.id}`} key={card.id}>
        //     <Card card={card} />
        //   </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;
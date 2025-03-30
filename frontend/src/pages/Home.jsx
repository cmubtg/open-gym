import { FacilityCard } from "components";
import { getFacilitiesMetadata } from "data/facilities";

const Home = () => {
  const facilities = getFacilitiesMetadata();
  return (
    <div className="btg_grid_container">
      {facilities.map((facility, index) => (
        <FacilityCard key={index} facility={facility} />
      ))}
    </div>
  );
};

export default Home;

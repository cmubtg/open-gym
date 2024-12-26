import { FacilityCard, ThemeIcon, LoginPopup, AuthButton } from "../components";
import { getFacilities } from "../data/facilities";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const { showLogin, setShowLogin } = useAuth();

  return (
    <div className="btg_page_container">
      <div className="w-full h-full pt-8">
        <TitleBar />
        <FacilityCards />
        {showLogin && <LoginPopup setShowLogin={setShowLogin} />}
      </div>
    </div>
  );
};

const TitleBar = () => {
  return (
    <div className="w-full flex flex-row justify-between items-center">
      <div>
        <h1>Facility Occupancy</h1>
        {/* TODO: n/BPS-222 - Add facility details description. */}
        {/* <p className="">Click on a gym for more occupancy information!</p> */}
        <p>Real-time gym occupancy information</p>
      </div>
      <div className="flex items-center gap-1 mt-14">
        <ThemeIcon />
        <AuthButton />
      </div>
    </div>
  );
};

const FacilityCards = () => {
  const facilities = getFacilities();
  return (
    <div className="btg_grid_container">
      {facilities.map((facility) => (
        <FacilityCard facility={facility} />
      ))}
    </div>
  );
};

export default Home;

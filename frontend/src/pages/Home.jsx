import { FacilityCard, ThemeIcon, LoginPopup, AuthButton } from "components";
import { getFacilitiesMetadata } from "data/facilities";
import { useAuth } from "context/AuthContext";

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
    <div>
    <div className="w-full flex flex-col sm:flex-row justify-between items-center text-center sm:text-left">
      <div>
        <img className="block dark:hidden w-1/2 mb-2" src={process.env.PUBLIC_URL + "../images/light_mode_logo.png"} alt="Light Mode Logo" />
        <img className="hidden dark:block w-1/2 mb-2" src={process.env.PUBLIC_URL + "../images/dark_mode_logo.png"} alt="Dark Mode Logo" />
        {/* TODO: n/BPS-222 - Add facility details description. */}
        {/* <p className="">Click on a gym for more occupancy information!</p> */}
        <p>Real-time gym occupancy information</p>
      </div>
      <div className="flex items-center sm:gap-1 mt-4 sm:mt-14 text-center sm:text-left">
        <ThemeIcon />
        <AuthButton />
      </div>
    </div>
    <hr className="my-5"/>
    </div>
  );
};

const FacilityCards = () => {
  const facilities = getFacilitiesMetadata();
  return (
    <div className="btg_grid_container">
      {facilities.map((facility) => (
        <FacilityCard facility={facility} />
      ))}
    </div>
  );
};

export default Home;

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
  const { isAuthenticated } = useAuth();
  return (
    <div className="w-full flex flex-row justify-between items-center">
      <div>
        <h1>Facility Occupancy</h1>
        <p className={`${!isAuthenticated ? 'text-red-500' : ''}`}>
          {isAuthenticated 
            ? "Real-time gym occupancy information" 
            : "Sign in to view real-time occupancy information"}
        </p>
      </div>
      <div className="flex items-center gap-1 mt-14">
        <ThemeIcon />
        <AuthButton />
      </div>
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

import { FacilityCard, ThemeIcon, LoginPopup, AuthButton } from "components";
import { useState, useEffect } from "react";
import { getFacilitiesMetadata } from "data/facilities";
import { useAuth } from "context/AuthContext";
import {getTopBarMessage} from "data/topbarmessages";
import Banner from "components/misc/Banner";

const Home = () => {
  const { showLogin, setShowLogin } = useAuth();

  return (
    <div className="btg_page_container">
      <div className="w-full h-full pt-12">
        <TitleBar />
        <FacilityCards />
        {showLogin && <LoginPopup setShowLogin={setShowLogin} />}
      </div>
    </div>
  );
};

const TitleBar = () => {
  const { isAuthenticated } = useAuth();
  const [message, setMessage] = useState('');

  useEffect(() => {
    setMessage(getTopBarMessage(isAuthenticated));

    const interval = setInterval(() => {
      setMessage(getTopBarMessage());
    }, 300000);

    return () => clearInterval(interval);
  }, [isAuthenticated]);

  return (
      <div>
        <Banner>
          <ManualOccupancyPSA/>
        </Banner>
        <div className="w-full flex flex-col sm:flex-row justify-between items-center text-center sm:text-left">
          <div>
            <div className="flex justify-center items-center sm:justify-between">
              <img
                className="block dark:hidden w-1/2 sm:w-1/4 mb-2"
                src={process.env.PUBLIC_URL + "../images/light_mode_logo.png"}
                alt="Light Mode Logo"
              />
              <img
                className="hidden dark:block w-1/2 sm:w-1/4 mb-2"
                src={process.env.PUBLIC_URL + "../images/dark_mode_logo.png"}
                alt="Dark Mode Logo"
              />
            </div>
            <p>{message}</p>
          </div>
          <div className="flex items-center sm:gap-1 mt-6 sm:mt-9 text-center sm:text-left">
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

const ManualOccupancyPSA = () =>{
  return (
    <div className="flex items-center gap-2">
      <span>
        OpenGym is still under development. The numbers we provide are estimates and may be incorrect.
      </span>
    {/*TODO: n/BPS- Backend support for manual occupancy collecting*/}
    {/*<strong>Are you in the gym right now?</strong> {" "} Help us refine our data by sharing your estimate of the current occupancy:*/}
    {/*  <input*/}
    {/*    type="number"*/}
    {/*    placeholder="%"*/}
    {/*    className="border border-[#ffc700] rounded px-2 py-1 w-16"*/}
    {/*  />*/}
    </div>
  )
}

export default Home;

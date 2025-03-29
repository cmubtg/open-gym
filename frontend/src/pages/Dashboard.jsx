
import { FacilityCard, ThemeIcon, LoginPopup, AuthButton, DashboardButton } from "components";
import { getFacilitiesMetadata } from "data/facilities";
import { useAuth } from "context/AuthContext";
import { Bar } from "react-chartjs-2";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


const BarChart = ({ chartData }) => {
  return (
    <div className="chart-container">
      <h2 style={{ textAlign: "center" }}>Bar Chart</h2>
      <Bar
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Users Gained between 2016-2020",
            },
            legend: {
              display: false,
            },
          },
        }}
      />
    </div>
  );
};


const UserViewButton = () => {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleClick = () => {
      navigate('/');
  }
  
  return (
      <button onClick={handleClick} className="flex items-center justify-center w-32 mr-4 text-xs transition-colors ">
              <div className="flex items-center justify-end sm:justify-center w-full nav_icon">
                <span className="text-center">USER</span>
              </div>
          </button>
      
  );
};



const TitleBar = () => {
  return (
    <div className="w-full flex flex-col sm:flex-row justify-between items-center text-center sm:text-left">
      <div>
        <h1>Gym Occupancy</h1>
        {/* TODO: n/BPS-222 - Add facility details description. */}
        {/* <p className="">Click on a gym for more occupancy information!</p> */}
        <p>Real-time gym occupancy information</p>
      </div>
      <div className="flex items-center sm:gap-1 mt-4 sm:mt-14 text-center sm:text-left">
        <UserViewButton/>
        <ThemeIcon />
        <AuthButton />
      </div>
    </div>
  );
};




const Dashboard = () => {

  const [chartData] = useState({
    labels: ["2016", "2017", "2018", "2019", "2020"],
    datasets: [
      {
        label: "Users Gained",
        data: [8000, 15000, 20000, 30000, 40000],
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });




    return (
            <div className="btg_page_container">
              <div className="w-full h-full pt-8">
                <TitleBar />
              </div>
              <div className="w-full h-full pt-8">
                <BarChart chartData={chartData} />
              </div>
            </div>
        
    )
}


  

export default Dashboard;

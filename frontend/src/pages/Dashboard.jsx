import { Bar } from "react-chartjs-2";
import { useState } from "react";

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
    <div className="w-full h-full pt-8">
      <BarChart chartData={chartData} />
    </div>
  );
};

export default Dashboard;

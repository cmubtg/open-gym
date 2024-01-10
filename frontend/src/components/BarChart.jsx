import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
ChartJS.defaults.font.size = 10;


const BarChart = () => {
  const [chartData, setChartData] = useState({
    labels: ['11', '12', '1', '2', '3', '4', '5', '6'],
    datasets: [
      {
        label: 'occupancy',
        data: [14, 40, 45, 53, 21, 88, 95, 77],
        backgroundColor: '#EB5958',
        barThickness: 15,
        borderRadius: 5,
        borderWidth: 0,
        color: '#EB5958',
      },
    ],
  });

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: false,
        },
        title: {
            display: true,
            align: 'start', 
            text: 'Occupancy',
        },
    },
    tooltips: {
        callbacks: {
           label: function(tooltipItem) {
                  return tooltipItem.yLabel;
           }
        }
    },

    scales: {
        x: {
          grid: {
            display: false
          },
          ticks: {
            color: '#818181'
          }

        },
        y: {
            grid: {
                display: true
            },
            ticks: {
                stepSize: 22,
                color: '#818181',
                callback: function (value, index, values) {
                    return value === 0 || value === 22 || value === 44 || value === 66 || value === 88 ? value : '';
                }
            }
        }
    },
  };

  // Function to update the chart with new data
//   const updateChart = (labels, values) => {
//     setChartData({
//       labels: labels,
//       datasets: [
//         {
//           label: 'Sample Bar Graph',
//           data: values,
//           backgroundColor: '#EB5958',
//           barThickness: 25,
//           borderRadius: 8,
//           borderWidth: 0
//         },
//       ],
//     });
//   };

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       const newLabels = ['11', '12', '1', '2', '3', '4', '5', '6'];
//       const newValues = [14, 40, 45, 53, 21, 88, 95, 77];
//       updateChart(newLabels, newValues);
//     }, 3000);

//     return () => clearTimeout(timer);
//   }, []);

  return (
    <div className="relative w-full h-full">

        <Bar data={chartData} options={options} />
    </div>
  );
};

export default BarChart;

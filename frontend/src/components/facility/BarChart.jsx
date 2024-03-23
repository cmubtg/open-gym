import React, { useState, useEffect, createRef } from 'react';
import { Bar } from 'react-chartjs-2';
import { getChartOptions } from '../../utils/chart_utils';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';

import annotationPlugin from 'chartjs-plugin-annotation';
import { externalTooltipHandler } from "./BarChartTooltip.jsx"

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    annotationPlugin,
  );


function generateRandomArray(length, min, max) {
  return Array.from({ length }, () => Math.random() * (max - min) + min);
}

function getAverage(data) {
  const sum = data.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  return Math.round(sum / data.length);
}

const useRefDimensions = (ref) => {
  const [dimensions, setDimensions] = useState({ width: 1, height: 2 })
  React.useEffect(() => {
    if (ref.current) {
      const { current } = ref
      const boundingRect = current.getBoundingClientRect()
      const { width, height } = boundingRect
      setDimensions({ width: Math.round(width), height: Math.round(height) })
    }
  }, [ref])
  return dimensions
}

ChartJS.defaults.font.size = 10;

const BarChart = ({facility, isMobile, hours, day}) => {
  // Values to set
  // default.labels
  // default.datasets[0].barThickness
  // default.datasets[0].data
  // default.datasets[0].backgroundColor = index array
  console.log("hours", hours);
  
  // TODO Function to get data from API
  // Get data from current day and get predicted data from future
  const data = generateRandomArray(hours.length, 0, 100);
  const average = Math.floor(getAverage(data));

  const maxPeople = Math.max(...data, facility.max_occupancy);
  const ticks = 6;
  const stepSize = Math.floor(maxPeople / ticks);

  const x_axis_func = function (value, index, values) {
    const tickArray = Array.from({length: ticks}, (_, idx) => idx*stepSize);
    return tickArray.includes(value) ? value : '';
  }

  const currTime = (new Date()).getHours();
  const indexTime = hours.indexOf(currTime);
  var barColors;
  if (indexTime >= hours.length) {
    barColors = Array(hours.length).fill('#EB5958');
  }
  else if (indexTime != -1) {
    barColors = Array(indexTime).fill('#EB5958').concat(Array(hours.length - indexTime).fill('#DDDDDD'));
  }
  else {
    barColors = Array(hours.length).fill('#DDDDDD')
  };

  // const barThickness = Math.floor(window.innerWidth / 100) + 15;
  const barThickness = 30;
  // const maxBars = 18;
  if (isMobile) {
    barThickness = 4;
    // maxBars = 6;
  }
  // const maxChartWidth = maxBars*barThickness
  const maxChartWidth = barThickness*hours.length
  console.log(window.innerWidth/100);
  console.log(window.innerWidth);

  const [chartData, setChartData] = useState({
    labels: hours,
    datasets: [
      {
        label: 'occupancy',
        data: data,
        backgroundColor: barColors,
        barThickness: barThickness,
        categoryPercentage: 0.9,
        borderRadius: 5,
      },
    ],
  });
  

  const options = getChartOptions(x_axis_func, stepSize, average, externalTooltipHandler);
  // const dimensions = useRefDimensions(divRef);
  // const chartContainerBody = document.querySelector('.chartContainerBody');
  // console.log(maxChartWidth);
  // console.log(dimensions.width);
  // if (maxChartWidth > dimensions.width) {
  //   chartContainerBody.width = maxChartWidth;
  // }

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
    <div className="w-full min-h-96 overflow-x-auto chart_container">
      {/* <div className="chart_container_body"> */}
        <Bar data={chartData} options={options} />
      {/* </div> */}
    </div>
  );
};

export default BarChart;
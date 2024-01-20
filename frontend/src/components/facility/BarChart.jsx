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

function generateRandomArray(length, min, max) {
  return Array.from({ length }, () => Math.random() * (max - min) + min);
}
ChartJS.defaults.font.size = 10;

const externalTooltipHandler = (context) => {
  // Tooltip Element
  const {chart, tooltip} = context;
  const tooltipEl = getOrCreateTooltip(chart);

  // Hide if no tooltip
  if (tooltip.opacity === 0) {
    tooltipEl.style.opacity = 0;
    return;
  }

  // Set Text
  if (tooltip.body) {
    const titleLines = tooltip.title || [];
    const bodyLines = tooltip.body.map(b => b.lines);

    const tableHead = document.createElement('thead');

    titleLines.forEach(title => {
      const tr = document.createElement('tr');
      tr.style.borderWidth = 0;

      const th = document.createElement('th');
      th.style.borderWidth = 0;
      const text = document.createTextNode(title);

      th.appendChild(text);
      tr.appendChild(th);
      tableHead.appendChild(tr);
    });

    const tableBody = document.createElement('tbody');
    bodyLines.forEach((body, i) => {
      const colors = tooltip.labelColors[i];

      const span = document.createElement('span');
      span.style.background = colors.backgroundColor;
      span.style.borderColor = colors.borderColor;
      span.style.borderWidth = '2px';
      span.style.marginRight = '10px';
      span.style.height = '10px';
      span.style.width = '10px';
      span.style.display = 'inline-block';

      const tr = document.createElement('tr');
      tr.style.backgroundColor = 'inherit';
      tr.style.borderWidth = 0;

      const td = document.createElement('td');
      td.style.borderWidth = 0;

      const text = document.createTextNode(body);

      td.appendChild(span);
      td.appendChild(text);
      tr.appendChild(td);
      tableBody.appendChild(tr);
    });

    const tableRoot = tooltipEl.querySelector('table');

    // Remove old children
    while (tableRoot.firstChild) {
      tableRoot.firstChild.remove();
    }

    // Add new children
    tableRoot.appendChild(tableHead);
    tableRoot.appendChild(tableBody);
  }

  const {offsetLeft: positionX, offsetTop: positionY} = chart.canvas;

  // Display, position, and set styles for font
  tooltipEl.style.opacity = 1;
  tooltipEl.style.left = positionX + tooltip.caretX + 'px';
  tooltipEl.style.top = positionY + tooltip.caretY + 'px';
  tooltipEl.style.font = tooltip.options.bodyFont.string;
  tooltipEl.style.padding = tooltip.options.padding + 'px ' + tooltip.options.padding + 'px';
};



const BarChart = () => {
  // Values to set
  // default.labels
  // default.datasets[0].barThickness
  // default.datasets[0].data
  // default.datasets[0].backgroundColor = index array

  // TODO Function to get hours from facilities and current day. 
  const labels = ['6','7','8','9','10','11','12', '1', '2', '3', '4', '5', '6','7','8','9','10','11'];
  
  // TODO Function to get data from API
  // Get data from current day and get predicted data from future
  const data = generateRandomArray(labels.length, 0, 100);
  // [14, 40, 45, 53, 21, 85, 62, 55, 33, 45]
  const barColors = Array(labels.length - 9).fill('#EB5958').concat(Array(9).fill('#DDDDDD'));
  console.log(barColors);

  const barThickness = Math.floor(window.innerWidth / 100) + 15;
  console.log(Window.innerWidth/100);

  const [chartData, setChartData] = useState({
    labels: labels,
    datasets: [
      {
        label: 'occupancy',
        data: data,
        backgroundColor: barColors,
        barThickness: barThickness,
        borderRadius: 5,
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
            display: false,
        },
        tooltip: {
          enabled : false,
          position: 'nearest',
          external: externalTooltipHandler,
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
    <div className="w-full min-h-96 overflow-x-auto">
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default BarChart;


const getOrCreateTooltip = (chart) => {
  let tooltipEl = chart.canvas.parentNode.querySelector('div');

  if (!tooltipEl) {
    tooltipEl = document.createElement('div');
    tooltipEl.style.background = 'rgba(0, 0, 0, 0.7)';
    tooltipEl.style.borderRadius = '3px';
    tooltipEl.style.color = 'white';
    tooltipEl.style.opacity = 1;
    tooltipEl.style.pointerEvents = 'none';
    tooltipEl.style.position = 'absolute';
    tooltipEl.style.transform = 'translate(-50%, 0)';
    tooltipEl.style.transition = 'all .1s ease';

    const table = document.createElement('table');
    table.style.margin = '0px';

    tooltipEl.appendChild(table);
    chart.canvas.parentNode.appendChild(tooltipEl);
  }

  return tooltipEl;
};


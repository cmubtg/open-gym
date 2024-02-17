export function getChartOptions(x_axis_function, stepSize, average, externalTooltipHandler) {
return {
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
        },
        annotation: {
          annotations: {
            line1: {
              type: 'line',
              yMin: average,
              yMax: average,
              // TO DO make responsive size
              borderDash: [8],
              borderColor: '',
              borderWidth: 2,
            },
            // TO DO make this appear
            label: {
                type: 'label',
                // content: `Average: $average`,
                content: 'Average',
                xValue: 16,
                yValue: 75,
                font: {
                    size: 30,
                    color: 'black',
                }
              }
          }
        },
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
                stepSize: stepSize,
                color: '#818181',
                callback: x_axis_function
                }
            }
        }
    }
}

// function to get object of arrays for open hours on all 7 days
export function getFacilityHours(facility){ 
    // return Array.from({length: 7}, (_, day) => [facility.hours[day].open.getHours(), facility.hours[day].close.getHours()])
    return Array.from({length: 7}, (_, day) => {
        const startHours = facility.hours[day].open.getHours();
        const endHours = facility.hours[day].close.getHours();
        return Array.from({length: endHours-startHours}, (_, index) => startHours + index)
    })    
}

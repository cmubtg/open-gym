import React, { useEffect, useState } from 'react';

const style = {
    fill: "transparent",
    fillOpacity: 1,
    stroke: "gray",
    strokeWidth: 10,
    strokeLinecap: "round"
  };

const OccMeter = () => {
    const [data, setData] = useState(null);

    // useEffect(() => {
    //     fetchData();
    // }, []);

    // const fetchData = async () => {
    //     try {
    //         const response = await fetch('/api/occMeterData');
    //         const jsonData = await response.json();
    //         setData(jsonData);
    //     } catch (error) {
    //         console.error('Error fetching data:', error);
    //     }
    // };
    // random number between 0 and 200

    var offset = Math.floor(Math.random() * 200) + 1;
    // offset = 1
    var perc = Math.max(0,Math.floor((((offset/200) * 100) - 90) * -1))
    // var offset = offset1 > 70 ? offset1 : -offset1

    return (
            <div className="meter_container">  
            {/* view box left, up/down, zoom in, zoom out */}
                <svg className="w-full h-full" viewBox="20 -10 90 70">
                    <circle id="progress_track" cx="65" cy="70" r="70"></circle>
                    <circle id="progress" cx="65" cy="70" r="70"
                    strokeDashoffset={offset}></circle>
                </svg>
                <div className="meter_info">
                    <p className="font-bold">{perc}<span className="text-xs">%</span></p>
                    <p className="font-light text-[7px]">of max occupancy</p>
                </div>
            </div>
    );
};

export default OccMeter;

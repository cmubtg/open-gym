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

    return (
        <div className="svg_container items-center max-w-[250px] overflow-hidden">
            <svg width="76" height="33" viewBox="0 0 86 43" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path id="Ellipse 9" d="M3 42.6973C1.34314 42.6973 -0.0109819 41.3524 0.105279 39.6996C0.824791 29.471 5.20801 19.8035 12.5058 12.5058C20.5131 4.49846 31.3733 1.21489e-06 42.6973 0C54.0214 -1.21489e-06 64.8816 4.49845 72.8889 12.5058C80.1867 19.8035 84.5699 29.471 85.2894 39.6996C85.4057 41.3523 84.0516 42.6973 82.3947 42.6973H77.2552C75.5983 42.6973 74.27 41.3511 74.1127 39.7017C73.4197 32.4313 70.22 25.5905 65.0121 20.3826C59.0939 14.4644 51.067 11.1395 42.6973 11.1395C34.3277 11.1395 26.3008 14.4644 20.3826 20.3826C15.1747 25.5906 11.975 32.4313 11.282 39.7017C11.1247 41.3511 9.7964 42.6973 8.13954 42.6973H3Z" fill="#DDDDDD"/>
            </svg>
        </div>
    );
};

export default OccMeter;

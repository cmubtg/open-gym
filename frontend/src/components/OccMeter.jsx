import React, { useEffect, useState } from 'react';
import { getOccClass } from '../utils/utils';

const OccMeter = ({occupancy}) => {
    // TODO Fetch occupancy data from API
    var offset = occupancy * 2;
    var perc = Math.max(0,Math.floor((((offset/200) * 100) - 90) * -1))
    var occ_class = getOccClass(perc);
    return (
        <div className="meter_container">  
        {/* view box left, up/down, zoom in, zoom out */}
            <svg className="w-full h-full" viewBox="20 -10 90 70">
                <circle id="progress_track" cx="65" cy="70" r="70"></circle>
                <circle id="progress" cx="65" cy="70" r="70"
                strokeDashoffset={offset}
                className={`${occ_class}`}></circle>
            </svg>
            <div className="meter_info">
                <p className="font-bold">{perc}<span className="text-xs">%</span></p>
                <p className="font-light text-[7px]">of max occupancy</p>
            </div>
        </div>
    );
};

export default OccMeter;

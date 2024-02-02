import React, { useEffect, useState } from 'react';
import { getOccClass, getOccPhrase } from '../../utils/utils';

const FacilityCardOccTag = ({occupancy}) => {
    // TODO Fetch occupancy data from API
    var offset = occupancy * 2;
    var perc = Math.max(0,Math.floor((((offset/200) * 100) - 90) * -1))
    var occ_class = getOccClass(perc);
    var occ_tag = getOccPhrase(occ_class);
    return (  
        <div className={`${occ_class} absolute right-4 top-4 z-30 p-[3px] rounded  w-[4rem] flex justify-center`}>
            <p className={`text-white text-[10px]`}>{occ_class}</p>
            {/* TODO: Display the results gotten from the occ_class. Make a capitilize function to display the cap names*/}


        </div>
    );
};


export default FacilityCardOccTag;
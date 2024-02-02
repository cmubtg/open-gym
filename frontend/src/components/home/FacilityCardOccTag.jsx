import React, { useEffect, useState } from 'react';
import { getOccClass} from '../../utils/utils';

const FacilityCardOccTag = ({occupancy}) => {
    // TODO Fetch occupancy data from API
    var offset = occupancy * 2;
    var perc = Math.max(0,Math.floor((((offset/200) * 100) - 90) * -1))
    var occ_class = getOccClass(perc); 
    var capitalized_occ_class = occ_class.charAt(0).toUpperCase() + occ_class.slice(1);

    return (  
        <div className={`${occ_class} absolute right-4 top-4 z-30 p-[3px] rounded  w-[4rem] flex justify-center`}>
            <p className={`text-white text-[10px]`}>{capitalized_occ_class}</p> 
        </div>
    );
};


export default FacilityCardOccTag;
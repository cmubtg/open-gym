import React, { useEffect, useState } from 'react';
import { getOccClass, getOccPhrase } from '../../utils/utils';

const FacilityCardOccTag = ({occupancy}) => {
    // TODO Fetch occupancy data from API
    var offset = occupancy * 2;
    var perc = Math.max(0,Math.floor((((offset/200) * 100) - 90) * -1))
    var occ_class = getOccClass(perc);
    var occ_tag = getOccPhrase(occ_class);
    return (
        <div>
            <div className={`${occ_class} p-2 rounded absolute top-6 right-3`}>
                    <p className={`text-white`}>{occ_tag}</p>
            </div>
        </div>
    );
};


export default FacilityCardOccTag;

import React from 'react';
import useFacilityOccupancy from '../../hooks/useFacilityOccupancy';
import {FacilityCardDisplay, FacilityCardInfo} from '../index';

const FacilityCard = ({facility}) => {

  const {occupancy, closingStatus, lastFetch} = useFacilityOccupancy(facility);

  return (
    <div className="w-full h-full">
      <FacilityCardDisplay {...{facility, occupancy, closingStatus }} />
      <FacilityCardInfo {...{facility, occupancy, lastFetch, closingStatus }} />
    </div>
  );
}

export default FacilityCard;

import React from 'react';
import { Link } from 'react-router-dom';
import { isOpen } from '../../utils/utils';
import { FacilityCardOccTag } from '../index';

const FacilityCardDisplay = ({facility, occupancy, closingStatus}) => {
  return (
      <div className="card_top">
        <div className="relative">
          <Link className="card_link" to={`/facility/${facility.id}`}>
            <img className= {`card_img
                              ${!isOpen(closingStatus) && 
                                "opacity-65 brightness-[0.5]"}`} 
              src={facility.image} alt={facility.name} />
          </Link>
          {isOpen(closingStatus) && 
                <FacilityCardOccTag id={facility.id} occupancy={occupancy} max_occupancy={facility.max_occupancy} />
          }
          
          {!isOpen(closingStatus) && 
            <p className="absolute justify-center
                          text-base font-bold  
                          text-slate-50 opacity-100">
              {closingStatus}
            </p>
          }
        </div>
    </div>
  );
}

export default FacilityCardDisplay;
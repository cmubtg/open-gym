
import React from 'react';
import { Link } from 'react-router-dom';
import {isOpen} from '../utils/utils';

const FacilityCardDisplay = ({facility, occupancy, closingStatus}) => {
  return (
      <div className="card_top">
        <Link className="card_link" to={`/facility/${facility.id}`}>
          <img className= {`card_img
                            ${!isOpen(closingStatus) && 
                              "opacity-65 brightness-[0.5]"}`} 
            src={facility.image} alt={facility.name} />
        </Link>
        
        {!isOpen(closingStatus) && 
          <p className="absolute justify-center
                        text-base font-bold  
                        text-slate-50 opacity-100">
            {closingStatus}
          </p>
        }
    </div>
  );
}

export default FacilityCardDisplay;
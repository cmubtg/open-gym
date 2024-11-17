
import React from 'react';
// import { Link } from 'react-router-dom';
import { isOpen } from '../../utils/utils';

const FacilityCardDisplay = ({facility, occupancy, closingStatus}) => {

  const isComingSoon = facility.status === "coming soon";

  return (
      <div className="card_top">
         
        {/* <Link className="card_link" to={`/facility/${facility.id}`}> 
        </Link> */}
        
        {/* put this image back in the link section to have it route to facility detail page */}
        <img className= {`card_img 
                            ${(!isOpen(closingStatus) || isComingSoon) && 
                              "opacity-65 brightness-[0.5]"}`} 
            src={facility.image} alt={facility.name} />
        
        {isComingSoon && (
          <p className="absolute justify-center
                        text-base font-bold  
                        text-slate-50 opacity-100">
            Coming Soon
          </p>
        )}

        {!isComingSoon && !isOpen(closingStatus) &&
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
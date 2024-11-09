
import React from 'react';
// import { Link } from 'react-router-dom';
import { isOpen } from '../../utils/utils';
import { BiInfoCircle } from "react-icons/bi";

const FacilityCardDisplay = ({facility, occupancy, closingStatus}) => {
  return (
      <div className="card_top relative">
         
        {/* <Link className="card_link" to={`/facility/${facility.id}`}> 
        </Link> */}
        
        {/* put this image back in the link section to have it route to facility detail page */}
        <img className= {`card_img
                            ${!isOpen(closingStatus) && 
                              "opacity-65 brightness-[0.5]"}`} 
            src={facility.image} alt={facility.name} />
        
        {!isOpen(closingStatus) && 
          <p className="absolute justify-center
                        text-base font-bold  
                        text-slate-50 opacity-100">
            {closingStatus}
          </p>
        }

        {/* Info button */}
      <div className="info_button_wrapper absolute top-2 left-2">
        <button className="info_button"><BiInfoCircle size="24px"/></button>
          <div className="info_tooltip">
            <p>Opening Hours: {facility.openingHours}</p>
            <p>Closing Hours: {facility.closingHours}</p>
          </div>
      </div>
    </div>
  );
}

export default FacilityCardDisplay;
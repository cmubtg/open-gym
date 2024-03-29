import React from "react";

const FacilityDetailImage = ({facility, isMobile}) => {
  console.log("second facility", facility.image2);
    return (
      <>
        {isMobile ? (
          <div className="w-full h-52 gradient_overlay">
            <img className="w-full h-full object-cover brightness-50" src={facility.image2} alt={facility.name}/>
          </div > 
        ) : (
          <div className="btg_container h-[200px] mt-4 flex flex-row">
            <img className="w-full h-full img_filter" src={facility.image2} alt={facility.name}/>
          </div>
        )
        }
      </>
  
    );
  }

  export default FacilityDetailImage;
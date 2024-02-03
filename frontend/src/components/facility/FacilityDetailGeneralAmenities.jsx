
const FacilityDetailGeneralAmenities = ({facility}) => { 
  
  return (
    
    <div className="btg_container h-[400px] flex flex-col justify-center">
      <h2 className="font-semibold mb-4">General Amenities</h2> 
 
      <div className="amenities w-full overflow-auto pt-0">
     
          <div className="amenities_card"> 
            <div className="h-full">
                <img className= {`card_img`} src={facility.image3} alt={facility.name} /> 
                <p className="p-2"> Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p>
            </div>
          </div>  

          <div className="amenities_card"> 
            <div className="h-full">
                <img className= {`card_img`} src={facility.image3} alt={facility.name} />
                <p className="p-2"> Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p>  
            </div>
          </div> 

          <div className="amenities_card"> 
            <div className="h-full">
                <img className= {`card_img`} src={facility.image3} alt={facility.name} /> 
                <p className="p-2"> Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p> 
            </div>
          </div> 

      </div>
    </div>
   
    



    );
  };

  export default FacilityDetailGeneralAmenities;
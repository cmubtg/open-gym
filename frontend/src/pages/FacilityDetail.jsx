
import { getFacilities } from '../data/facilities';
import { useParams } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { useFacilityContext } from '../data/FacilityContext';

import { FacilityDetailTopBar, FacilityDetailImage, FacilityDetailInfo, 
         FacilityDetailCards, BarChart, FacilityDetailGeneralAmenities } from '../components/facility';
// import { useFacilityContext } from '../data/FacilityContext';


const FacilityDetail = () => {

  const {id} = useParams();
  // const facilities = getFacilities();
  const facilities = useFacilityContext();
  console.log("FACILITIES: " + facilities);

  const facility = facilities.find((facility) => facility.id === id);
  
  const isMobile = useMediaQuery({ query: '(max-width: 1024px)' });
  return (

      <div className="btg_page_container mx-0 px-0 ">

        <FacilityDetailTopBar isMobile={isMobile}/>
        <FacilityDetailImage facility={facility} isMobile={isMobile}/>

        <FacilityDetailInfo facility={facility}/>
        
        <FacilityDetailCards/>
        <FacilityDetailChart facility={facility}/>
        <FacilityDetailGeneralAmenities facility={facility}/>
    </div>

  );
}

const FacilityDetailChart = ({facility}) => {
  return (
    <div className="btg_container h-[450px] flex flex-col justify-center">
      <h2 className="font-semibold mb-4">Occupancy Forecast</h2>
      <BarChart/>
    </div>
  );
}


export default FacilityDetail;
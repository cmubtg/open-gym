
import { getFacilities } from '../data/facilities';
import { useParams } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

import { FacilityDetailTopBar, FacilityDetailImage, FacilityDetailInfo, 
         FacilityDetailCards, BarChartTabs } from '../components/facility';


const FacilityDetail = () => {
  const {id} = useParams();
  const facilities = getFacilities();
  
  const facility = facilities.find((facility) => facility.id === id);
  const isMobile = useMediaQuery({ query: '(max-width: 1024px)' });
  return (

      <div className="btg_page_container mx-0 px-0 ">

        <FacilityDetailTopBar isMobile={isMobile}/>
        <FacilityDetailImage facility={facility} isMobile={isMobile}/>

        <FacilityDetailInfo facility={facility}/>
        
        <FacilityDetailCards/>
        <FacilityDetailChart facility={facility} isMobile={isMobile}/>

    </div>

  );
}

const FacilityDetailChart = ({facility},{isMobile}) => {
  return (
    <div className="btg_container justify-center">
      <h3 className="font-semibold mb-4">Occupancy Forecast</h3>
      <BarChartTabs facility={facility} isMobile={isMobile}></BarChartTabs>
    </div>
  );
}


export default FacilityDetail;
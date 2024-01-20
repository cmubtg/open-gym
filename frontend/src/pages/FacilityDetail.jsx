
import { getFacilities } from '../data/facilities';
import { useParams } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { useState, useEffect } from 'react';

import { FacilityDetailTopBar, FacilityDetailImage, FacilityDetailInfo, 
         FacilityDetailCards, BarChart } from '../components/facility';


const FacilityDetail = () => {
  const {id} = useParams();

  const [facilityMetadata, setMetadata] = useState(null);
  console.log(facilityMetadata);

  useEffect(() => {
    console.log("hello")
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/metadata/${id}`);
        const data = await res.json();
        console.log(data);
        if (res.ok) {
          setMetadata(data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [])

  const isMobile = useMediaQuery({ query: '(max-width: 1024px)' });
  return (

    
    <div className="btg_page_container mx-0 px-0 ">

        <FacilityDetailTopBar isMobile={isMobile}/>
        <FacilityDetailImage facility={facilityMetadata} isMobile={isMobile}/>

        <FacilityDetailInfo facility={facilityMetadata}/>
        
        <FacilityDetailCards/>
        <FacilityDetailChart facility={facilityMetadata}/>

    </div>

  );
}

const FacilityDetailChart = ({facility}) => {
  if (facility === null) {
    return (<></>);
  }

  return (
    <div className="btg_container h-[450px] flex flex-col justify-center">
      <h3 className="font-semibold mb-4">Occupancy Forecast</h3>
      <BarChart/>
    </div>
  );
}


export default FacilityDetail;
import React from 'react';
import {getFacilities} from '../data/facilities';
import {Link, useParams} from 'react-router-dom';
import BarChart from '../components/facility/BarChart';
import { useMediaQuery } from 'react-responsive';

import { FiMapPin, FiInfo } from "react-icons/fi";
// import { MdInfoOutline } from "react-icons/md";


import { IoIosArrowBack } from "react-icons/io";

const FacilityDetail = () => {
  const {id} = useParams();
  const facilities = getFacilities();
  
  const facility = facilities.find((facility) => facility.id === id);
  const isMobile = useMediaQuery({ query: '(max-width: 1024px)' });
  return (

      <div className="btg_page_container mx-0 px-0 ">

        <FacilityDetailTopBar />
        <FacilityDetailImage facility={facility} isMobile={isMobile}/>

      <FacilityDetailInfo facility={facility}/>
        <FacilityDetailCard/>

        <FacilityDetailChart facility={facility}/>

    </div>

  );
}

const FacilityDetailInfo = ({facility}) => {
  return (
    <div className="btg_container flex justify-between 
    mt-2 lg:mt-8
    flex-col md:flex-row">
      <div className="flex flex-col w-auto h-full">
        <h1>{facility.name}</h1>
        <p className="text-gray-500 w-[90%]">{facility.description}</p>
      </div>
      <FacilityDetailHours facility={facility}/>
    </div>
  );
};

const FacilityDetailImage = ({facility, isMobile}) => {
  return (
    <>
      {isMobile ? (
        <div className="w-full h-52 gradient_overlay">
          <img className="w-full h-full object-cover brightness-50" src={facility.image2} alt={facility.name}/>
        </div>
      ) : (
        <div className="btg_container h-[200px] mt-7 flex flex-row">
          <img className="w-full h-full img_filter" src={facility.image2} alt={facility.name}/>
        </div>
      )
      }
    </>

  );
}

const FacilityDetailTopBar = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 1024px)' }); // Tailwind lg breakpoint
  const container_class = isMobile ? 
    "w-full h-12 flex justify-between px-2 mt-4 [&_*]:text-white z-10 absolute" : 
    "w-full h-12 btg_container flex justify-between pt-10 [&_*]:text-black dark:[&_*]:text-white z-10 ";
  return (
    <div className={container_class}>

      <Link className="z-10 flex flex-rowhover:[&_*]:text-white" to="/">
        <IoIosArrowBack size="20" className="mr-2"/>
        <p className="mt-0.5">Back</p>
      </Link>

      <div className="flex flex-row ">
        <Link className="w-auto h-auto z-10 flex flex-row mr-3" to="/">
          <FiMapPin className="" size="15"/>
        </Link>
        <Link className="w-auto h-auto z-10 flex flex-row" to="/">
          <FiInfo className="hover:text-btg-dark-grey"/>
        </Link>
      </div>

      
    </div>
  );
}


const FacilityDetailChart = ({facility}) => {
  return (
    <div className="btg_container h-[450px] flex flex-col justify-center">
      <h3 className="font-semibold">Occupancy Forecast</h3>
      <BarChart/>
    </div>
  );
}

const FacilityDetailCardWrapper = ({isMobile, children}) => {
  return (
        <>
          {!isMobile ? (
            <div className="btg_container w-full h-auto mt-8">
              {children}
            </div>
          ) :
          (<>
            {children}
          </>)}
        </>    
  );
};

const FacilityDetailCard = ({facility}) => {
  const count = 85
  const occupancy = Math.round((count / 100) * 100)
  return (
    <div className="w-full h-full px-2 lg:px-8 xl:px-14 mt-[-1rem]">
      {/* md:overflow-x-auto xl:overflow-visible  */}
      <div className="carousel w-full overflow-auto p-8 pt-0">
        {/* <div className="carousel_card w-10 shadow-none bg-btg-primary dark:bg-btg-primary-dark"></div> */}
        <div className="carousel_card">
          <div className="h-full flex flex-col justify-between ml-8">
            <p>Busiest Hours On Average</p>
            <h2 className="text-btg-red">5pm-8pm</h2>
            <p>About {count} people, {occupancy}% occupancy</p>
          </div>
        </div>
        <div className="carousel_card">
          <div className="h-full flex flex-col justify-between ml-8">
            <p>Least Busy Hours On Average</p>
            <h2 className="text-btg-green">6:30am-9am</h2>
            <p>About {count} people, {occupancy}% occupancy</p>
          </div>
        </div>
        <div className="carousel_card">
          <div className="h-full flex flex-col justify-between ml-8">
              <p>Least Busy Hours On Average</p>
              <h2>6:30am-9am</h2>
              <p>About {count} people, {occupancy}% occupancy</p>
          </div>
        </div>
        {/* <div className="carousel_card shadow-none bg-btg-primary dark:bg-btg-primary-dark"></div> */}
        {/* <div className="carousel_card w-[50px] bg-btg-primary dark:bg-btg-primary-dark"></div> */}
    </div>
  </div>
  );
};


const FacilityDetailHours = ({facility}) => {
  return (
    <div className="w-52 h-fit mt-4">
      <h3>Operating Hours</h3>

      <div className="flex flex-row mt-2 justify-between">
        <div>
          <p className="text-gray-500">Monday - Friday</p>
          <p className="text-gray-500">Saturday & Sunday</p>
        </div>
        <div >
          <p className="font-light">6:30 - 11:30</p>
          <p className="font-light">9:00 - 10:00</p>
        </div>
      </div>
    </div>
  );
}


export default FacilityDetail;
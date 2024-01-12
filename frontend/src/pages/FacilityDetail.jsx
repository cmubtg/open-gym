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

        {/* Top bar and image */}
        {isMobile ? 
          <FacilityDetailDisplayMobile facility={facility}/> :
          <FacilityDetailDisplayDesktop facility={facility}/> 
        }

        <FacilityDetailInfo facility={facility}/>

        <FacilityDetailCardWrapper {...{facility, isMobile}} >
          <FacilityDetailCard/>
        </FacilityDetailCardWrapper>

        <FacilityDetailChart facility={facility}/>
    </div>

  );
}

const FacilityDetailInfo = ({facility}) => {
  return (
    <div className="btg_container flex flex-col lg:flex-row">
    <div className="w-[74%] h-auto mt-4">
      <h2 >{facility.name}</h2>
      <p className="font-light w-80">{facility.description}</p>
    </div>
    <FacilityDetailHours facility={facility}/>
  </div>
  );
};

const FacilityDetailDisplayMobile = ({facility}) => {
  return (
    <>
      <FacilityDetailTopBar />
      <div className="h-52 w-full fac_img2">
        <img className="w-full h-full object-cover brightness-50" src={"../images/uc.jpg"} alt={facility.name}/>
      </div>
    </>
  );
}

const FacilityDetailDisplayDesktop = ({facility}) => {
  return (
    <div className="btg_container w-full *:flex flex-col">
      <FacilityDetailTopBar />
      <div className="w-full h-[350px] mt-8 flex flex-row">
          <div className="flex w-[70%] h-full">
            <img className="w-full h-ful img_filter" src={facility.image} alt={facility.name}/>
          </div>
          <div className="w-[30%] h-full pl-8 flex flex-col">
            <img className="w-full h-[46%] img_filter mb-8 flex-none self-start" src={facility.image2} alt={facility.name}/>
            <img className="w-full h-[45%] img_filter flex-none self-end" src={facility.image3} alt={facility.name}/>
          </div>
      </div>
    </div>
  );
}

const FacilityDetailTopBar = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 1024px)' }); // Tailwind lg breakpoint
  const container_class = isMobile ? 
    "w-full h-12 flex justify-between px-2 mt-4 [&_*]:text-white z-10 absolute" : 
    "w-full h-12 flex justify-between pt-8 pb-2 [&_*]:text-black dark:[&_*]:text-white z-10 ";
  return (
    <div className={container_class}>
      <Link className="z-10 flex flex-row" to="/">
        <IoIosArrowBack size="20" className="nav_icon mr-2"/>
        <p className="mt-0.5">Back</p>
      </Link>
      <Link className="w-auto h-auto z-10 flex flex-row space-x-3 mr-1" to="/">
        <FiMapPin size="15"/>
        <FiInfo />
      </Link>
    </div>
  );
}


const FacilityDetailChart = ({facility}) => {
  return (
    <div className="btg_container h-48 w-full flex flex-col justify-center">
      <p className="font-semibold text-sm">Occupancy Forecast</p>
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
    <div className="carousel pl-8 lg:pl-0">
      {/* <div className="carousel_card w-1 shadow-none bg-btg-primary dark:bg-btg-primary-dark"></div> */}
      <div className="carousel_card">
        <div className="flex flex-col justify-between h-full">
          <p>Busiest Hours On Average</p>
          <h3>5pm-8pm</h3>
          <p>About {count} people, {occupancy}% occupancy</p>
        </div>
      </div>
      <div className="carousel_card"></div>
      <div className="carousel_card"></div>
      <div className="carousel_card shadow-none bg-btg-primary dark:bg-btg-primary-dark"></div>
      {/* <div className="carousel_card w-[50px] bg-btg-primary dark:bg-btg-primary-dark"></div> */}
    </div>
  );
};


const FacilityDetailHours = ({facility}) => {
  return (
    <div className="w-52 h-fit mt-4">
      <p className="font-semibold text-sm">Operating Hours</p>
      <div className="flex flex-row justify-between">
        <div>
          <p className="text-gray-400 ">Monday - Friday</p>
          <p className="text-gray-400">Saturday & Sunday</p>
        </div>
        <div className="">
          <p className="font-light">6:30 - 11:30</p>
          <p className="font-light">9:00 - 10:00</p>
        </div>
      </div>
    </div>
  );
}


export default FacilityDetail;
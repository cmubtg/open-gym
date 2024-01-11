import React from 'react';
import {facilities} from '../data/facilities';
import {Link, useParams} from 'react-router-dom';
import BarChart from '../components/BarChart';

import { FiMapPin, FiInfo } from "react-icons/fi";
// import { MdInfoOutline } from "react-icons/md";


import { IoIosArrowBack } from "react-icons/io";

const FacilityDetail = () => {
  const {id} = useParams();
  const facility = facilities.find((facility) => facility.id === id);
  return (
      <div className="btg_page_container mx-0 px-0 ">
        {/* [&_*] applies to all children */}
        <div className="w-full h-12 absolute flex justify-between px-2 mt-4
                         [&_*]:text-white">
          <Link className="z-10 flex flex-row" to="/">
            <IoIosArrowBack size="20" className="nav_icon mr-2"/>
            <p className="mt-0.5">Back</p>
          </Link>
          <Link className="w-auto h-auto z-10 flex flex-row space-x-3 mr-1" to="/">
            <FiMapPin size="15"/>
            <FiInfo />
          </Link>
          
        </div>

        <div className="h-52 w-full fac_img2">
          <img className="w-full h-full object-cover brightness-50" src={"../images/uc.jpg"} alt={facility.name}/>
        </div>

        <div className="w-full h-auto px-6">
          <h2>{facility.name}</h2>
          <p className="font-light">{facility.description}</p>
        </div>

        <FacilityDetailHours facility={facility}/>
        <FacilityDetailCards facility={facility}/>
        <FacilityDetailChart facility={facility}/>
      </div>

  );
}

const FacilityDetailChart = ({facility}) => {
  return (
    <div className="w-full h-48 flex flex-col my-8 px-6 justify-center">
      <p className="font-semibold text-sm">Occupancy Forecast</p>
      <BarChart/>
    </div>
  );
}

const FacilityDetailCards = ({facility}) => {
  return (
    <div className="my-8 carousel pl-6">
      <div className="carousel_card"></div>
      <div className="carousel_card"></div>
      <div className="carousel_card"></div>
      <div className="carousel_card bg-btg-primary dark:bg-btg-primary-dark"></div>
      {/* <div className="carousel_card w-[50px] bg-btg-primary dark:bg-btg-primary-dark"></div> */}
    </div>
  );
}


const FacilityDetailHours = ({facility}) => {
  return (
    <div className="flex flex-col my-8 px-6">
      <p className="font-semibold text-sm">Operating Hours</p>
      <div className="flex flex-row justify-between ">
        <div>
          <p className="text-gray-400 font-semibold">Monday - Friday</p>
          <p className="text-gray-400 font-semibold">Saturday & Sunday</p>
        </div>
        <div className="">
          <p className="font-light">Insert time</p>
          <p className="font-light">Insert time</p>
        </div>
      </div>
    </div>
  );
}


export default FacilityDetail;
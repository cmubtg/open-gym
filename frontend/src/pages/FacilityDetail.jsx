import React from 'react';
import {facilities} from '../data/facilities';
import {Link, useParams} from 'react-router-dom';
import BarChart from '../components/BarChart';

import { IoIosArrowBack } from "react-icons/io";

const FacilityDetail = () => {
  const {id} = useParams();
  const facility = facilities.find((facility) => facility.id === id);
  return (
    <>
    
    {/* <div className="h-52 w-full bg-cover bg-center bg-no-repeat fac_img"> */}
      {/* <Link className="absolute mt-6 ml-[-0.5rem]" to="/">
        <IoIosArrowBack size="20" className="nav_icon inline-block mr-4"/>
      </Link> */}
      <div className="w-full h-full bg-btg-primary">

      <div className="h-52 fac_img2 ">
        <img className="w-full h-full object-cover brightness-50" src={"../images/uc.jpg"} alt={facility.name}/>
      </div>

      </div>
    {/* </div> */}

      <div className="btg_page_container">

        <div className="">
          <h2>{facility.name}</h2>
          <p className="font-light">{facility.description}</p>
        </div>

        <FacilityDetailHours facility={facility}/>
        
        <FacilityBarChart facility={facility}/>
      </div>
      </>
  );
}

const FacilityBarChart = ({facility}) => {
  return (
    <div className="w-full h-48 flex flex-col mt-4 items-center justify-center">
      <BarChart/>
    </div>
  );
}

const FacilityDetailHours = ({facility}) => {
  return (
    <div className="flex flex-col mt-4">
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
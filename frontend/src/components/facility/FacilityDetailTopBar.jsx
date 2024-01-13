
import React from 'react';
import { FiMapPin, FiInfo } from "react-icons/fi";
import {Link, useParams} from 'react-router-dom';
import { IoIosArrowBack } from "react-icons/io";

const FacilityDetailTopBar = ({isMobile}) => {
    const container_class = isMobile ? 
      "w-full h-12 flex justify-between px-2 mt-4 [&_*]:text-white z-10 absolute" : 
      "w-full h-12 btg_container flex justify-between pt-10 [&_*]:text-black dark:[&_*]:text-white z-10 ";
    return (
      <div className={container_class}>
        
        {/* Back Arrow and text */}
        <Link className="z-10 flex flex-rowhover:[&_*]:text-white" to="/">
          <IoIosArrowBack size="20" className="mr-2"/>
          <p className="mt-0.5">Back</p>
        </Link>
        
        {/* Map Pin and Info Icon */}
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


  export default FacilityDetailTopBar;
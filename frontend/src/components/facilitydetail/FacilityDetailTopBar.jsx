
import React from 'react';
import {Link, useParams} from 'react-router-dom';

import { FiInfo } from "react-icons/fi";
import { LuMapPin } from "react-icons/lu";
import { IoIosArrowBack } from "react-icons/io";

const FacilityDetailTopBar = ({isMobile}) => {
    const container_class = isMobile ? 
      "w-full flex justify-between px-2 mt-4 [&_*]:text-white z-10 absolute" : 
      "w-full btg_container flex justify-between pt-10 [&_*]:text-black dark:[&_*]:text-white z-10 ";
    return (
      <div className={container_class}>
        
        {/* Back Arrow and text */}
        <Link className="group z-10 flex flex-row" to="/">
          <IoIosArrowBack size="20" className="nav_icon mr-2 [&_*]:ease"/>
          <p className="nav_icon mt-0.5">Back</p>
        </Link>
        
        {/* Map Pin and Info Icon */}
        <div className="flex flex-row items-center">
          <Link className="group w-auto h-auto z-10 flex flex-row mr-3" to="/">
            <LuMapPin className="nav_icon [&_*]:ease" size="17"/>
          </Link>
          <Link className="group w-auto h-auto z-10 flex flex-row" to="/">
            <FiInfo className="nav_icon" size="17"/>
          </Link>
        </div>      
      </div>
    );
  }


  export default FacilityDetailTopBar;
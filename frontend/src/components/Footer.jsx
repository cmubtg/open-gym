import React from 'react';
import BTGLogo from './BTGLogo';

import {  FiGithub } from "react-icons/fi";
import { FaInstagram , FaLinkedin} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="min-h-28 text-white bg-btg-dark-grey p-8 text-sm w-full flex flex-row items-center
                      justify-between">

      <div className="w-42 h-full flex flex-row">
        <BTGLogo/>
        <div className="w-42 h-full flex flex-col ml-3 mt-1 items-center align-middle"> 
          <p className="text-white text-[13px] font-semibold">Open Gym</p> 
          <p className="text-white text-xs">&copy; 2023</p> 
        </div>
      </div>
      
      <div className="flex space-x-4 mr-4 md:mr-6"> 
        <a href="https://github.com/cmubtg" rel="noopener noreferrer"> 
          <FiGithub size="20" className="nav_icon text-white" />
        </a>

        <a href="https://www.instagram.com/cmubtg" rel="noopener noreferrer"> 
          <FaInstagram size="20" className="nav_icon text-white" />
        </a>
 
        <a href="https://www.linkedin.com/company/cmubtg" rel="noopener noreferrer"> 
          <FaLinkedin size="20" className="nav_icon text-white" />
        </a> 
      </div>
      
    </footer>
  );
}

export default Footer;
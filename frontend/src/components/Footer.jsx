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
        <div className="w-42 h-full flex flex-col ml-6 "> 
          <p className="text-white">&copy; 2023 OpenGym</p> 
          <p className="text-white">All rights reserved.</p>
        </div>
      </div>
      
      <div className="flex space-x-4 mr-6"> 
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
import BTGLogo from './BTGLogo';

import {  FiGithub } from "react-icons/fi";
import { FaInstagram , FaLinkedin} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full  min-h-28 text-white bg-btg-dark-grey
                    dark:bg-btg-secondary-dark
                    p-4 sm:p-12 text-sm 
                    flex flex-row items-center justify-between">

      <div className="w-42 h-full flex flex-row">
        <BTGLogo/>
        <div className="w-42 h-full flex flex-col ml-3 mt-1"> 
          <p className="text-white text-[13px] font-semibold">Open Gym</p> 
          <p className="text-white text-xs">&copy; {new Date().getFullYear()}</p> 
        </div>
      </div>
      
      <div className="flex space-x-4"> 
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
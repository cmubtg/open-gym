import BTGLogo from './BTGLogo';
import { FiGithub } from "react-icons/fi";
import { FaInstagram, FaLinkedin } from "react-icons/fa";

const SocialLink = ({ href, Icon }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer"
    className="hover:opacity-80 transition-opacity"
  >
    <Icon size="20" className="nav_icon text-white" />
  </a>
);

const Footer = () => {
  const socialLinks = [
    { href: "https://github.com/cmubtg", Icon: FiGithub },
    { href: "https://www.instagram.com/cmubtg", Icon: FaInstagram },
    { href: "https://www.linkedin.com/company/cmubtg", Icon: FaLinkedin }
  ];

  return (
    <footer className="w-full min-h-28 bg-btg-dark-grey dark:bg-btg-secondary-dark p-4 sm:p-12 flex items-center justify-between">
      {/* CMU BTG OpenGym */}
      <div className="flex items-center">
        <BTGLogo />
        <div className="ml-3 mt-1"> 
          <p className="text-white text-[13px] font-semibold">Open Gym</p> 
          <p className="text-white text-xs">&copy; {new Date().getFullYear()}</p> 
        </div>
      </div>
      
      {/* Social Links */}
      <div className="flex gap-4">
        {socialLinks.map((link, index) => (
          <SocialLink key={index} {...link} />
        ))}
      </div>
    </footer>
  );
};

export default Footer;
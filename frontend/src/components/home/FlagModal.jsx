import React from 'react';
import { useState, useRef, useEffect} from 'react';
import { FaFlag } from "react-icons/fa"; 

const FlagModal = () => { 
 
    const [open, setOpen] = useState(false);
    const modalRef = useRef(null);

    useEffect(() => {
      const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
          setOpen(false); 
        }
      };

      document.addEventListener("mousedown", handleClickOutside); 
    }, []); 
    
    return (
      <div className='flag' onClick={() => setOpen(!open)}> 
          <FaFlag className="flex ml-2.5 mt-1.5 flag_icon"/>  
          <div className="rectangle">
              {open && <div className="triangle"></div>}
              {open && (
                  <div className="modal-overlay">
                      <h2>Spring Break Hours</h2>
                      <p>Monday - Friday: 6:30am - 11:30pm</p>
                      <p className="mt-0.5">Saturday & Sunday: 9:00am - 10:00pm</p>
                  </div>
              )}
          </div>
      </div>
  );
};

export default FlagModal;

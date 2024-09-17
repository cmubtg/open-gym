import * as React from 'react';
import { FaFlag } from "react-icons/fa"; 
 
const FlagModal = () => { 
  const [showModal, setShowModal] = React.useState(false);

  const handleClickOutside = () => {
    setShowModal(false);
  };

  const ref = useOutsideClick(handleClickOutside);

  const handleFlagClick = () => {
    setShowModal(true);
  };

  return (
    <div className='flag_icon'>  
      <div ref={ref}>
        {showModal && (
          <div className="modal-overlay" ><div className="triangle"></div>
            <h2>Spring Break Hours</h2>
            <p>Monday - Friday: 6:30am - 11:30pm</p>
            <p className="mt-0.5">Saturday & Sunday: 9:00am - 10:00pm</p>
          </div>
        )}
      </div> 
      <FaFlag className="flex ml-2.5 mt-1.5 flag_icon" onClick={handleFlagClick} style={{ cursor: 'pointer' }} />
    </div>
  );
} 

export default FlagModal;;

const useOutsideClick = (callback) => {
  const ref = React.useRef();

  React.useEffect(() => {
    const handleClick = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };

    document.addEventListener('click', handleClick, true);

    return () => {
      document.removeEventListener('click', handleClick, true);
    };
  }, [ref]);

  return ref;
};
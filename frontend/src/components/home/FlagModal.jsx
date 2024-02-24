import React from 'react';
import { useState } from 'react';
import { FaFlag } from "react-icons/fa";

const FlagModal = () => {
    const [showModal, setShowModal] = useState(false);

    return (
      <div onMouseEnter={() => setShowModal(true)} onMouseLeave={(e) => !e.relatedTarget || !e.relatedTarget.classList.contains('modal-overlay') ? setShowModal(false) : null}>
        <FaFlag className="flex ml-2.5 mt-1.5 flag_icon"/>
        <div className="rectangle">{showModal && <div className="triangle"></div>}</div>
        {showModal && (
          <div className="modal-overlay">
            <h2>Spring Break Hours</h2>
            <p>Monday - Friday: 6:30am - 11:30pm</p>
            <p className="mt-0.5">Saturday & Sunday: 9:00am - 10:00pm</p>
          </div>
        )}
      </div>
    );
}

export default FlagModal;
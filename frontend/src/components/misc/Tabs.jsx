import React, { useState, useEffect, useRef } from 'react';

const Tabs = ({ headers, components }) => {
    const [activeTab, setActiveTab] = useState(0);
    const markerRef = useRef(null);

    const handleTabClick = (index) => {
        setActiveTab(index);
    };

    const markerStyle = {
      position: "absolute",
      height: "4px",
      width: "0px",
      background: "var(--btg-red)",
      bottom: "-8px",
      transition: "0.4s",
      borderRadius: "4px",
    }; 

    useEffect(() => {
        const defaultNavItem = document.getElementById('default-item');
        if (defaultNavItem && markerRef.current) {
            const marker = markerRef.current;
            marker.style.left = defaultNavItem.offsetLeft + 'px';
            marker.style.width = defaultNavItem.offsetWidth + 'px';
        }

        const buttons = document.querySelectorAll('.tab-button');
        buttons.forEach((button, index) => {
            button.addEventListener('click', (e) => {
                handleTabClick(index);
                indicator(e.target);
            });
        });

                
    }, []);

    const indicator = (e) => {
      if (markerRef.current) {
          const marker = markerRef.current;
          marker.style.left = e.offsetLeft + 'px';
          marker.style.width = '4px';
          setTimeout(() => {
            marker.style.width = e.offsetWidth + 'px';
          }, 100);
      }
    };

    return (
        <div className="w-full h-full flex flex-col">
            <div className="w-full h-full flex relative mb-12">
                {headers.map((header, index) => (
                  <div className="w-24 h-full">

                    <button
                        key={index}
                        className="tab-button"
                        id={index === 0 ? 'default-item' : ''}
                    >
                        {header}
                    </button>
                  </div>
                ))}
                <div ref={markerRef} style={markerStyle}></div>
            </div>
            <div>{components[activeTab]}</div>
        </div>
    );
};

export default Tabs;
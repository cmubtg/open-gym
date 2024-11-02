import React, { useState, useEffect } from 'react';
import { facilities, getFacilities } from './facilities.js';

const FacilityContext = React.createContext();

// export const getFacilities = () => {
//     return facilities;
// };

export const FacilityContextProvider = ({ facility, children }) => {
    const [metadata, setMetadata] = useState(0);
  
    useEffect(() => {
      const fetchMetadata = async () => {
        try {
          const response = await fetch(`${process.env.REACT_APP_API_URL}/metadata/${facility.id}`); 
          const data = await response.json();
          setMetadata(data); 
        } catch (error) {
          console.error('Error fetching metadata:', error);
        }
      };
  
      fetchMetadata();
    }, []); 
  
    if (!metadata) {
      return <div>Loading...</div>;
    }
  
    return (
      <FacilityContext.Provider value={metadata}>
        {children}
      </FacilityContext.Provider>
    );
  };

// export const FacilityContextProvider = ({facility, children}) => {
//     console.log("gottne fac", facility)
//     return (
//         <FacilityContext.Provider value={facility}>
//             {children}
//         </FacilityContext.Provider>
//     );
// };

export const useFacilityContext = () => {
    return React.useContext(FacilityContext);
};


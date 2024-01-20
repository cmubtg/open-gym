import React from 'react';
import {facilities} from './facilities.js';

const FacilityContext = React.createContext();

export const getFacilities = () => {
    return facilities;
}

export const FacilityContextProvider = ({facility, children}) => {
    console.log("gottne fac", facility)
    return (
        <FacilityContext.Provider value={facility}>
            {children}
        </FacilityContext.Provider>
    );
};

export const useFacilityContext = () => {
    return React.useContext(FacilityContext);
  };
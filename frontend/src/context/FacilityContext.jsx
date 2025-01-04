import React, { createContext, useContext } from "react";
import useFacilityOccupancy from "../hooks/useFacilityOccupancy";

const FacilityContext = createContext();

export const FacilityProvider = ({ facility, children }) => {
  const { occupancy, closingStatus, lastFetch } =
    useFacilityOccupancy(facility);

  const value = {
    facility,
    occupancy,
    closingStatus,
    lastFetch,
  };

  return (
    <FacilityContext.Provider value={value}>
      {children}
    </FacilityContext.Provider>
  );
};

export const useFacility = () => {
  const context = useContext(FacilityContext);
  if (!context) {
    throw new Error("useFacility must be used within a FacilityProvider");
  }
  return context;
};

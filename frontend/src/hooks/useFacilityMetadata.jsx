import React, { createContext, useContext } from "react";

export const FacilityContext = createContext();

export const useFacilityMetadata = () => {
  return useContext(FacilityContext);
};

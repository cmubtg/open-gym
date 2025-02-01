import React, { useState, useEffect } from "react";
import { getClosingStatus, isClosed } from "../utils/utils";
import { MINUTE_MS } from "../utils/constants";
import { useAuth } from "../context/AuthContext";

const useFacilityOccupancy = (facility) => {
  const [occupancy, setOccupancy] = useState(0);
  const [closingStatus, setClosingStatus] = useState("closed");
  const { isAuthenticated } = useAuth();
  // TODO Keep track of time since last fetch
  const [lastFetch, setLastFetch] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      console.log("logging");
      if (!isAuthenticated) {
        console.log("User is not authenticated, skipping fetch");
        return;
      }

      try {
        const res = await fetch(
          `${process.env.REACT_APP_API_URL}/occupancy-record/${facility.id}`,
          {
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const occupancyRecords = await res.json();
        if (occupancyRecords.length === 0) {
          console.log("No occupancy record found for facility:", facility.id);
          return;
        }
        if (res.ok) {
          setOccupancy(occupancyRecords[0].occupancy);
          const recordTime = Date.parse(occupancyRecords[0].time);
          const timeDiff = new Date(new Date() - recordTime).getMinutes();
          setLastFetch(timeDiff);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const updateClosingStatus = () => {
      const currDateTime = new Date(Date.now());
      const newClosingStatus = getClosingStatus(facility, currDateTime);
      if (newClosingStatus !== closingStatus) {
        setClosingStatus(newClosingStatus);
      }
      if (!isClosed(closingStatus)) {
        fetchData();
      }
    };

    updateClosingStatus();
    
    // Check every minute to see if closing status has changed
    const intervalId = setInterval(updateClosingStatus, MINUTE_MS);
    return () => clearInterval(intervalId);
  }, [closingStatus, facility, isAuthenticated]);

  return { occupancy, closingStatus, lastFetch };
};

export default useFacilityOccupancy;

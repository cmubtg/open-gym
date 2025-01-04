import React from 'react';
import { useFacility } from "../../context/FacilityContext";

const LiveDot = () => {
    const { lastFetch } = useFacility();
    const lastFetchMsg = lastFetch === 1 ? '1 minute ago' : `${lastFetch} minutes ago`;

    return (
        <div className="flex items-center gap-2 mt-1">
            <div className="relative grid place-items-center w-4 h-4 ml-[-0.2em]">
                {/* Base dot */}
                <div className="w-2.5 h-2.5 bg-btg-red rounded-full" />
                
                {/* Animated pulse ring */}
                <div className="absolute w-4 h-4 border-2 border-btg-red rounded-full animate-pulsate" />
            </div>
            <p>{lastFetchMsg}</p>
        </div>
    );
};

export default LiveDot;
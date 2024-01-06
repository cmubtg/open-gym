import React from 'react';

const LiveDot = ({msg}) => {
    return (
        <div className="flex flex-row items-center mt-[-5px]">
            <div className="w-5 h-8 relative">
                <div className={`w-[10px] h-[10px] bg-btg-red rounded-full absolute
                                top-[11px] left-[0px]`}>
                </div>
                <div className={`w-[18px] h-[18px] border-btg-red border-2 rounded-full 
                                absolute top-[7px] left-[-4px] animate-pulsate`}>
                </div>
            </div>
            <p className="text-[0.6rem] md:text-xs font-light">
                {msg}
            </p>
        </div>
    );
};

export default LiveDot;

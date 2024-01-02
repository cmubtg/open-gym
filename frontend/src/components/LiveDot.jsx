import React from 'react';

const LiveDot = ({color, msg}) => {
    // Declared colors here because of tailwind
    let borderColor = "border-" + color
    let bgColor = "bg-" + color
    return (
        <div className="flex flex-row items-center mt-[-5px]">
            <div className="w-5 h-8 flex items-center">
                <div className={`w-[10px] h-[10px] ${bgColor} rounded-full flex items-center justify-center`}>
                    <div className={`w-[15px] h-[15px] ${borderColor} border-2 rounded-full absolute animate-pulsate`}></div>
                </div>
            </div>
            <p className="text-xs leading-[0px] font-light">
                {msg}
            </p>
        </div>
    );
};

export default LiveDot;

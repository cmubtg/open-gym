import React from 'react';

const LiveDot = ({msg}) => {
    return (
        <div className="flex flex-row items-center mt-[-5px]">
            <div className="w-5 h-8 flex items-center">
                <div className={`w-[10px] h-[10px] bg-btg-red rounded-full flex items-center justify-center`}>
                    <div className={`w-[15px] h-[15px] border-btg-red border-2 rounded-full absolute animate-pulsate`}></div>
                </div>
            </div>
            <p className="text-xs leading-[0px] font-light">
                {msg}
            </p>
        </div>
    );
};

export default LiveDot;

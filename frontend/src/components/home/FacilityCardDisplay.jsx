// import React, { useState } from 'react';
// import { isOpen } from '../../utils/utils';
// import { BiTime } from "react-icons/bi";

// const FacilityCardDisplay = ({ facility, occupancy, closingStatus }) => {
//   const [isOverlayVisible, setOverlayVisible] = useState(false); // State for toggle

//   const formatHours = (hours) =>
//     `${hours.open.toLocaleTimeString("en-US", {
//       hour: "2-digit",
//       minute: "2-digit",
//     })} - ${hours.close.toLocaleTimeString("en-US", {
//       hour: "2-digit",
//       minute: "2-digit",
//     })}`;
//   const weekdayHours = formatHours(facility.hours[0]);
//   const weekendHours = formatHours(facility.hours[6]);

//   return (
//     <div className="card_top relative">
//       {/* Card Image */}
//       <img
//         className={`card_img ${!isOpen(closingStatus) && "opacity-65 brightness-[0.5]"} ${
//           isOverlayVisible && "brightness-[0.4] opacity-90"
//         }`}
//         src={facility.image}
//         alt={facility.name}
//       />

//       {/* Closing Status */}
//       {!isOpen(closingStatus) && (
//         <p
//           className="absolute justify-center text-base font-bold text-slate-50 opacity-100"
//         >
//           {closingStatus}
//         </p>
//       )}

//       {/* Toggle Overlay */}
//       {isOverlayVisible && (
//         <div className="info_overlay relative inset-0 bg-gray-800 bg-opacity-70 flex flex-col items-center justify-center text-white text-center">
//            <h3 className="text-xl text-white font-bold mb-4">Hours</h3>
//           <p className="text-lg text-white mb-2">
//             <span className="font-bold">Monday - Friday:</span> {weekdayHours}
//           </p>
//           <p className="text-lg text-white">
//             <span className="font-bold">Saturday - Sunday:</span> {weekendHours}
//           </p>
//         </div>
//       )}

//       {/* Info Button */}
//       <div className="info_button_wrapper absolute top-2 left-2">
//         <button
//           className="info_button"
//           onClick={() => setOverlayVisible(!isOverlayVisible)}
//         >
//           <BiTime size="24px" style={{ color: 'white' }} />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default FacilityCardDisplay;

// import React from 'react';

// const FloatingLabel = ({ label, color = 'gray', children, ...props }) => {
//   const colorClass = color === 'success' ? 'text-green-500' : color === 'error' ? 'text-red-500' : 'text-gray-500';

//   return (
//     <div className="relative">
//       <input
//         {...props}
//         className="peer w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 outline-none"
//       />
//       <label
//         className={`absolute top-2 left-2 text-gray-500 transition-transform duration-300 ease-in-out transform -translate-y-1/2 ${props.value || props.placeholder ? '-translate-y-6 scale-75' : 'translate-y-1/2'
//           } peer-focus:-translate-y-6 peer-focus:text-blue-500 ${colorClass}`}
//       >
//         {label}
//       </label>
//       {props.error && <div className="text-red-600 text-sm mt-1">{props.error}</div>}
//       {props.success && <div className="text-green-600 text-sm mt-1">{props.success}</div>}
//     </div>
//   );
// };

// export default FloatingLabel;

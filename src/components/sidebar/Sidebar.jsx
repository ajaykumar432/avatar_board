

// import React from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { Home, Grid, Layers, Zap } from 'lucide-react';

// const Sidebar = ({ isOpen, setIsOpen }) => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const menuItems = [
//     { path: '/', icon: Home, label: 'Dashboard' },
//     { path: '/boards', icon: Grid, label: 'Boards' },
//     { path: '/rooms', icon: Layers, label: 'Rooms' },
//   ];

//   return (
//     <>
//       {/* Overlay for mobile */}
//       {isOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
//           onClick={() => setIsOpen(false)}
//         />
//       )}

//       {/* Sidebar */}
//       <div
//         className={`fixed top-0 left-0 h-screen bg-slate-900 transition-transform duration-300 z-50 flex flex-col
//           ${isOpen ? 'translate-x-0' : '-translate-x-full'}
//           md:translate-x-0 md:w-64 w-64`}
//       >
//         {/* Logo Section */}
//         <div className="p-6 border-b border-slate-800 flex items-center justify-between">
//           <div className="flex items-center gap-3">
//             <div className="bg-gradient-to-br from-teal-400 to-teal-600 p-2.5 rounded-xl shadow-lg">
//               <Zap className="text-white" size={24} />
//             </div>
//             {/* Always show labels on desktop */}
//             <div className="hidden md:block">
//               <h1 className="text-white font-bold text-xl">SmartBoard</h1>
//               <p className="text-gray-400 text-xs">Control Panel</p>
//             </div>
//           </div>
//         </div>

//         {/* Menu Items */}
//         <nav className="flex-1 p-4 space-y-2">
//           {menuItems.map((item) => {
//             const Icon = item.icon;
//             const isActive = location.pathname === item.path;

//             return (
//               <button
//                 key={item.path}
//                 onClick={() => {
//                   navigate(item.path);
//                   setIsOpen(false); // close only on mobile
//                 }}
//                 className={`w-full flex items-center gap-4 p-3.5 rounded-xl transition-all duration-200 group relative ${
//                   isActive
//                     ? 'bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-lg shadow-teal-500/50'
//                     : 'text-gray-400 hover:bg-slate-800 hover:text-white'
//                 }`}
//               >
//                 <Icon
//                   size={22}
//                   className={`${
//                     isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'
//                   } transition-colors`}
//                 />
//                 {/* Always visible on desktop */}
//                 <span className="font-medium hidden md:inline">{item.label}</span>
//               </button>
//             );
//           })}
//         </nav>
//       </div>
//     </>
//   );
// };

// export default Sidebar;

import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Home, Grid, Layers, Zap } from "lucide-react";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { path: "/", icon: Home, label: "Dashboard" },
    { path: "/boards", icon: Grid, label: "Boards" },
    { path: "/rooms", icon: Layers, label: "Rooms" },
  ];

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen bg-slate-900 text-white transition-transform duration-300 z-40 flex flex-col
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:w-64 w-64`}
      >
        {/* Logo Section */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-teal-400 to-teal-600 p-2.5 rounded-xl shadow-lg">
              <Zap className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-white font-bold text-xl">EnerJoule</h1>
              <p className="text-gray-400 text-xs">Control Panel</p>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <button
                key={item.path}
                onClick={() => {
                  navigate(item.path);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center gap-4 p-3.5 rounded-xl transition-all duration-200 group relative ${
                  isActive
                    ? "bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-lg shadow-teal-500/50"
                    : "text-gray-300 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <Icon
                  size={22}
                  className={`${
                    isActive ? "text-white" : "text-gray-400 group-hover:text-white"
                  } transition-colors`}
                />
                {/* Text label — always visible */}
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;

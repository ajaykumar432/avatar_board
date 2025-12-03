
// // src/layout/Header.jsx
// import React from "react";
// import { Menu, Zap, X } from "lucide-react";
// import { useAuth } from "../../context/AuthContext";;

// const Header = ({ setSidebarOpen, sidebarOpen }) => {
//   const { user, signOut } = useAuth(); // <-- use signOut from context

//   const handleSignOut = () => { 
//     signOut();
//   };

//   return (
//     <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30">
//       <div className="flex justify-between items-center px-4 py-4 shadow-sm bg-gray-100 rounded-md md:px-8">
//         {/* Sidebar Toggle (Mobile) */}
//         <button
//           onClick={() => setSidebarOpen((prev) => !prev)}
//           className="md:hidden text-gray-700 hover:text-teal-600 p-2 rounded-lg hover:bg-teal-50 transition-all"
//           aria-label="Toggle sidebar"
//         >
//           {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
//         </button>

//         {/* Dashboard Title */}
//         <div className="flex items-center gap-3">
//           <div className="hidden md:flex items-center gap-2 bg-gradient-to-r from-teal-500 to-teal-600 px-4 py-2 rounded-lg shadow-sm">
//             <Zap className="text-white" size={20} />
//             <h1 className="text-lg font-bold text-white">Dashboard</h1>
//           </div>
//           <h1 className="md:hidden text-lg font-bold text-gray-800">Dashboard</h1>
//         </div>

//         {/* Profile Section */}
//         <div className="flex items-center gap-3">
//           <div className="hidden sm:flex flex-col items-end">
//             <span className="text-sm font-semibold text-gray-800">{user?.name || "User"}</span>
//             <span className="text-xs text-gray-500">Administrator</span>
//           </div>
//           <div className="w-11 h-11 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white font-bold shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
//             {user?.name ? user.name.split(" ").map(n => n[0]).join("") : "U"}
//           </div>
//           <button
//             onClick={handleSignOut}
//             className="ml-4 text-red-600 hover:text-red-700 font-semibold"
//           >
//             Sign Out
//           </button>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;


// import React from "react";
// import { Menu, Zap, X } from "lucide-react";
// import { useAuth } from "../../context/AuthContext";

// const Header = ({ setSidebarOpen, sidebarOpen }) => {
//   const { user, signOut } = useAuth();

  // const handleSignOut = () => {
  //   signOut();
  // };

//   return (
//     <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30">
//       <div className="flex justify-between items-center px-4 py-4 shadow-sm bg-gray-100 rounded-md md:px-8">
//         {/* Sidebar Toggle (Mobile) */}
//         <button
//           onClick={() => setSidebarOpen((prev) => !prev)}
//           className="md:hidden text-gray-700 hover:text-teal-600 p-2 rounded-lg hover:bg-teal-50 transition-all"
//           aria-label="Toggle sidebar"
//         >
//           {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
//         </button>

//         {/* Dashboard Title */}
//         <div className="flex items-center gap-3">
//           <div className="hidden md:flex items-center gap-2 bg-gradient-to-r from-teal-500 to-teal-600 px-4 py-2 rounded-lg shadow-sm">
//             <Zap className="text-white" size={20} />
//             <h1 className="text-lg font-bold text-white">Dashboard</h1>
//           </div>
//           <h1 className="md:hidden text-lg font-bold text-gray-800">Dashboard</h1>
//         </div>

//         {/* Profile Section */}
//         <div className="flex items-center gap-3">
//           <div className="hidden sm:flex flex-col items-end">
//             <span className="text-sm font-semibold text-gray-800">
//               {user?.name || "User"}
//             </span>
//             <span className="text-xs text-gray-500">Administrator</span>
//           </div>
//           <div className="w-11 h-11 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white font-bold shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
//             {user?.name ? user.name.split(" ").map((n) => n[0]).join("") : "U"}
//           </div>
//           <button
//             onClick={handleSignOut}
//             className="ml-4 text-red-600 hover:text-red-700 font-semibold"
//           >
//             Sign Out
//           </button>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;

import React, { useState } from "react";
import {
  Menu,
  Zap,
  X,
  LogOut,
  ChevronDown,
  User,
  Settings,
  Bell,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const Header = ({ setSidebarOpen, sidebarOpen, formdata }) => {
  const { user, signOut } = useAuth(); // ✅ correctly inside the component
  const [showDropdown, setShowDropdown] = useState(false);
  console.log("---------", formdata)
  const userInitials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "U";

  const handleSignOut = () => {
    setShowDropdown(false);
    signOut();
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
      <div className="flex justify-between items-center px-4 py-3 md:px-6 lg:px-8">
        {/* ---------- Left Section ---------- */}
        <div className="flex items-center gap-3 md:gap-4">
          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setSidebarOpen((prev) => !prev)}
            className="md:hidden text-gray-600 hover:text-teal-600 p-2 rounded-lg hover:bg-gray-100 transition-all duration-200"
            aria-label="Toggle sidebar"
          >
            {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          {/* Dashboard Title */}
          <div className="flex items-center gap-2">
            {/* <div className="bg-gradient-to-br from-teal-500 to-teal-600 p-2 rounded-lg shadow-md">
              <Zap className="text-white" size={15} />
            </div> */}
            {/* <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-gray-800 tracking-tight">
                Dashboard
              </h1>
              <p className="text-xs text-gray-500 -mt-0.5">Welcome back</p>
            </div> */}
            {/* <h1 className="sm:hidden text-sm font-semibold text-gray-800">
              Org... Name
            </h1> */}
          </div>
        </div>

        {/* ---------- Right Section ---------- */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Notifications */}
          <button
            className="hidden sm:flex relative p-2 text-gray-600 hover:text-teal-600 hover:bg-gray-100 rounded-lg transition-all duration-200"
            aria-label="Notifications"
          >
            {/* <Bell size={15} /> */}
            {/* <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span> */}
          </button>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-2 md:gap-3 p-1.5 md:p-2 rounded-lg hover:bg-gray-100 transition-all duration-200 group"
            >
              {/* User Info */}
              <div className="hidden md:flex flex-col items-end mr-1">
                <span className="text-sm font-semibold text-gray-800 group-hover:text-teal-600 transition-colors">
                  {user?.email || "User"}
                  
                </span>
                <span className="text-xs text-gray-500">Administrator</span>
              </div>

              {/* Avatar */}
              <div className="w-9 h-9 md:w-9 md:h-9 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white font-bold shadow-md ring-2 ring-white group-hover:ring-teal-100 transition-all">
                {userInitials}
              </div>

              {/* Dropdown Arrow */}
              <ChevronDown
                size={16}
                className={`hidden md:block text-gray-500 transition-transform duration-200 ${
                  showDropdown ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Dropdown Menu */}
            {showDropdown && (
              <>
                {/* Backdrop for mobile */}
                <div
                  className="md:hidden fixed inset-0 bg-black/50 bg-opacity-25 z-40"
                  onClick={() => setShowDropdown(false)}
                />

                {/* Dropdown Panel */}
                <div className="absolute right-0 w-64 bg-white rounded-lg shadow-xl border border-gray-200 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  {/* User Info (Mobile) */}
                  <div className="md:hidden px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-semibold text-gray-800">
                      {user?.name || ""}
                    </p>
                    <p className="text-xs text-gray-500">{user?.email || ""}</p>
                  </div>

                  {/* Profile */}
                  <button
                    onClick={() => {
                      setShowDropdown(false);
                      alert("Profile clicked");
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <User size={15} className="text-gray-500" />
                    <span>My Profile</span>
                  </button>

                  {/* Settings */}
                  <button
                    onClick={() => {
                      setShowDropdown(false);
                      alert("Settings clicked");
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <Settings size={16} className="text-gray-500" />
                    <span>Settings</span>
                  </button>

                  <div className="border-t border-gray-100 my-1"></div>

                  {/* Sign Out */}
                  <button
                    onClick={handleSignOut}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <LogOut size={16} />
                    <span className="font-medium">Sign Out</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

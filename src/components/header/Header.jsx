
// src/layout/Header.jsx
import React from "react";
import { Menu, Zap, X } from "lucide-react";
import { useAuth } from "../../context/AuthContext";;

const Header = ({ setSidebarOpen, sidebarOpen }) => {
  const { user, signOut } = useAuth(); // <-- use signOut from context

  const handleSignOut = () => { 
    signOut();
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30">
      <div className="flex justify-between items-center px-4 py-4 shadow-sm bg-gray-100 rounded-md md:px-8">
        {/* Sidebar Toggle (Mobile) */}
        <button
          onClick={() => setSidebarOpen((prev) => !prev)}
          className="md:hidden text-gray-700 hover:text-teal-600 p-2 rounded-lg hover:bg-teal-50 transition-all"
          aria-label="Toggle sidebar"
        >
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Dashboard Title */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 bg-gradient-to-r from-teal-500 to-teal-600 px-4 py-2 rounded-lg shadow-sm">
            <Zap className="text-white" size={20} />
            <h1 className="text-lg font-bold text-white">Dashboard</h1>
          </div>
          <h1 className="md:hidden text-lg font-bold text-gray-800">Dashboard</h1>
        </div>

        {/* Profile Section */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-sm font-semibold text-gray-800">{user?.name || "User"}</span>
            <span className="text-xs text-gray-500">Administrator</span>
          </div>
          <div className="w-11 h-11 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white font-bold shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
            {user?.name ? user.name.split(" ").map(n => n[0]).join("") : "U"}
          </div>
          <button
            onClick={handleSignOut}
            className="ml-4 text-red-600 hover:text-red-700 font-semibold"
          >
            Sign Out
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;

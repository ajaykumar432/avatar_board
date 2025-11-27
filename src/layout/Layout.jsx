

// import React, { useState } from 'react';
// import Sidebar from '../components/sidebar/Sidebar';
// import Header from '../components/header/Header';
// import Footer from '../components/footer/Footer';
// import { Outlet } from 'react-router-dom';

// const Layout = () => {
//   const [isSidebarVisible, setSidebarVisible] = useState(false);
//   const [currentPath, setCurrentPath] = useState('/');

//   return (
//     <div className="flex h-screen ml-[15%] w-[85%] overflow-hidden">
//       {/* Mobile Sidebar */}
//       {isSidebarVisible && (
//         <aside
//           className="z-50 bg-gray-200 h-full w-screen absolute md:hidden"
//           onClick={() => setSidebarVisible(false)}
//         >
//           <Sidebar
//             context={{ currentPath }}
//             isSidebarVisible={isSidebarVisible}
//           />
//         </aside>
//       )}

//       {/* Desktop Sidebar */}
//       <aside className="hidden bg-gray-200 z-50 md:w-[5%] lg:w-[4%] h-full sticky top-0 md:block">
//         <Sidebar context={{ currentPath }} isSidebarVisible={isSidebarVisible} />
//       </aside>

//       {/* Main content area */}
//       <div className="flex flex-col overflow-hidden ml-[6%] ">
//         {/* Header */}
//         <header className="bg-white justify-between">
//           <Header
//             setSidebarVisible={setSidebarVisible}
//             isSidebarVisible={isSidebarVisible}
//           />
//         </header>

//         <hr className="border-t border-cyan-600" />

//         {/* Main Content */}
//         <main className="flex-grow bg-white w-screen">
//           <Outlet />
//         </main>

//         {/* Footer */}
//         <Footer />
//       </div>
//     </div>
//   );
// };

// export default Layout;

// import React, { useState } from "react";
// import Sidebar from "../components/sidebar/Sidebar";
// import Header from "../components/header/Header";
// import Footer from "../components/footer/Footer";
// import { Outlet } from "react-router-dom";

// const Layout = () => {
//   const [isSidebarVisible, setSidebarVisible] = useState(false);
//   const [currentPath, setCurrentPath] = useState("/");

//   return (
//     <div className="flex h-screen w-[100%] overflow-hidden">
//       {/* Sidebar */}
//       <aside
//         className={`fixed top-0 left-0 z-40 h-full bg-gray-900 text-white transform transition-transform duration-300 
//           ${isSidebarVisible ? "translate-x-0" : "-translate-x-full"} 
//           md:translate-x-0 md:relative md:w-64`}
//       >
//         <Sidebar context={{ currentPath }} isSidebarVisible={isSidebarVisible} />
//       </aside>

//       {/* Main Content */}
//       <div className="flex flex-col flex-1 min-w-0 bg-gray-50 w-[100%]">
//         {/* Header */}
//         <header className="sticky top-0 z-30 bg-white shadow-sm w-[100%]">
//           <Header
//             setSidebarVisible={setSidebarVisible}
//             isSidebarVisible={isSidebarVisible}
//           />
//         </header>

//         {/* Divider */}
//         <hr className="border-t border-cyan-600 w-[100%]" />

//         {/* Main Outlet (no extra spacing, clean alignment) */}
//         <main className="flex-1 w-[100%] overflow-y-auto bg-white p-0 md:p-0">
//           <div className="w-[100%] h-full m-0">
//             <Outlet />
//           </div>
//         </main>

//         {/* Footer */}
//         <footer className="bg-white shadow-inner w-[100%]">
//           <Footer />
//         </footer>
//       </div>
//     </div>
//   );
// };

// export default Layout;
import React, { useState, useRef } from "react";
import Sidebar from "../components/sidebar/Sidebar";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const sidebarRef = useRef(null);

  const handleWrapperClick = (e) => {
    if (
      isSidebarVisible &&
      sidebarRef.current &&
      !sidebarRef.current.contains(e.target)
    ) {
      setSidebarVisible(false);
    }
  };

  return (
    <div
      className="flex h-screen w-full overflow-hidden bg-gray-50"
      onClick={handleWrapperClick}
    >
      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        className={`fixed top-0 left-0 z-40 h-full transform transition-transform duration-300
          ${isSidebarVisible ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:relative md:w-64 w-64`}
      >
        <Sidebar isOpen={isSidebarVisible} setIsOpen={setSidebarVisible} />
      </aside>

      {/* Main Content */}
      <div className="flex flex-col flex-1 min-w-0 w-full">
        {/* Header */}
        <header className="sticky top-0 z-30 w-full bg-white shadow-sm">
          <Header
            setSidebarOpen={setSidebarVisible}
            sidebarOpen={isSidebarVisible}
          />
        </header>

        {/* Divider */}
        <div className="border-t border-cyan-600 w-full" />

        {/* Main Outlet Area */}
        <main className="flex-1 w-full overflow-y-auto bg-gray-50">
          <div className="m-0 p-0 w-full h-full">
            <Outlet />
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 w-full">
          <Footer />
        </footer>
      </div>
    </div>
  );
};

export default Layout;

// import React, { useState } from "react";
// import Sidebar from "../components/sidebar/Sidebar";
// import Header from "../components/header/Header";
// import Footer from "../components/footer/Footer";
// import { Outlet } from "react-router-dom";

// const Layout = () => {
//   const [isSidebarVisible, setSidebarVisible] = useState(false);
//   const [currentPath, setCurrentPath] = useState("/");

//   return (
//     <div className="flex h-screen w-full overflow-hidden bg-gray-50">
//       {/* Sidebar */}
//       <aside
//         className={`fixed top-0 left-0 z-40 h-full bg-gray-900 text-white transform transition-transform duration-300
//           ${isSidebarVisible ? "translate-x-0" : "-translate-x-full"}
//           md:translate-x-0 md:relative md:w-64 w-64`}
//       >
//         <Sidebar
//           context={{ currentPath }}
//           isSidebarVisible={isSidebarVisible}
//         />
//       </aside>

//       {/* Main Content */}
//       <div className="flex flex-col flex-1 min-w-0 w-full">
//         {/* Header */}
//         <header className="sticky top-0 z-30 w-full bg-white shadow-sm">
//           <Header
//             setSidebarOpen={setSidebarVisible}
//             sidebarOpen={isSidebarVisible}
//           />
//         </header>

//         {/* Divider */}
//         <div className="border-t border-cyan-600 w-full" />

//         {/* Main Outlet Area */}
//         <main className="flex-1 w-full overflow-y-auto bg-gray-50">
//           {/* Remove all default paddings or margins */}
//           <div className="m-0 p-0 w-full h-full">
//             <Outlet />
//           </div>
//         </main>

//         {/* Footer */}
//         <footer className="bg-white border-t border-gray-200 w-full">
//           <Footer />
//         </footer>
//       </div>
//     </div>
//   );
// };

// export default Layout;

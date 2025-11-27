// Footer Component
// import React from 'react';

// const Footer = () => {
//   return (
//     <footer className="bg-white border-t border-gray-200 text-center p-4 mt-auto">
//       <p className="text-sm text-gray-600">
//         © {new Date().getFullYear()} SmartBoard. All rights reserved.
//       </p>
//     </footer>
//   );
// };

// export default Footer;

import React from "react";

// const Footer = () => {
//   return (
//     <footer className="bg-white border-t border-gray-200 dark:bg-gray-900 dark:border-gray-700 text-center py-4 mt-auto shadow-sm">
//       <div className="max-w-7xl mx-auto px-4">
//         <p className="text-sm text-gray-600 dark:text-gray-400">
//           © {new Date().getFullYear()} <span className="font-semibold text-teal-600 dark:text-teal-400">SmartBoard</span>. All rights reserved.
//         </p>
//       </div>
//     </footer>
//   );
// };

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 text-center py-6 mt-auto">
      <div className="max-w-7xl mx-auto px-4">
        <p className="text-sm text-gray-600">
          © {new Date().getFullYear()}{' '}
          <span className="font-semibold text-teal-600">Hexedge</span>. All rights reserved.
        </p>
      </div>
    </footer>
  );
};


export default Footer;

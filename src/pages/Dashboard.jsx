import React from 'react';
import { Home, Grid, Layers, Menu, X, Zap, Activity, Power, TrendingUp, Edit2, Trash2, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
// Dashboard Page
// const Dashboard = () => {
//   return (
//     <div className="space-y-6">
//       <div>
//         <h1 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">Dashboard Overview</h1>
//         <p className="text-gray-600">Monitor your electrical system in real-time</p>
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
//         <div className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-yellow-500 hover:shadow-md transition-shadow">
//           <div className="flex justify-between items-start mb-4">
//             <div>
//               <p className="text-gray-600 text-sm uppercase tracking-wide font-medium">Voltage</p>
//               <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mt-2">242 <span className="text-xl md:text-2xl text-gray-500">V</span></h2>
//             </div>
//             <div className="bg-gradient-to-br from-yellow-400 to-yellow-600 p-3 rounded-xl shadow-lg">
//               <Zap className="text-white" size={24} />
//             </div>
//           </div>
//         </div>

//         <div className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-teal-500 hover:shadow-md transition-shadow">
//           <div className="flex justify-between items-start mb-4">
//             <div>
//               <p className="text-gray-600 text-sm uppercase tracking-wide font-medium">Current</p>
//               <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mt-2">0.69 <span className="text-xl md:text-2xl text-gray-500">A</span></h2>
//             </div>
//             <div className="bg-gradient-to-br from-teal-400 to-teal-600 p-3 rounded-xl shadow-lg">
//               <Activity className="text-white" size={24} />
//             </div>
//           </div>
//         </div>

//         <div className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-purple-500 hover:shadow-md transition-shadow">
//           <div className="flex justify-between items-start mb-4">
//             <div>
//               <p className="text-gray-600 text-sm uppercase tracking-wide font-medium">Power</p>
//               <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mt-2">166 <span className="text-xl md:text-2xl text-gray-500">W</span></h2>
//             </div>
//             <div className="bg-gradient-to-br from-purple-400 to-purple-600 p-3 rounded-xl shadow-lg">
//               <Power className="text-white" size={24} />
//             </div>
//           </div>
//         </div>

//         <div className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-green-500 hover:shadow-md transition-shadow">
//           <div className="flex justify-between items-start mb-4">
//             <div>
//               <p className="text-gray-600 text-sm uppercase tracking-wide font-medium">Total Consumption</p>
//               <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mt-2">103.90 <span className="text-xl md:text-2xl text-gray-500">kWh</span></h2>
//             </div>
//             <div className="bg-gradient-to-br from-green-400 to-green-600 p-3 rounded-xl shadow-lg">
//               <TrendingUp className="text-white" size={24} />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">Dashboard Overview</h1>
        <p className="text-gray-600">Monitor your electrical system in real-time</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-yellow-500 hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-gray-600 text-sm uppercase tracking-wide font-medium">Voltage</p>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mt-2">242 <span className="text-xl md:text-2xl text-gray-500">V</span></h2>
            </div>
            <div className="bg-gradient-to-br from-yellow-400 to-yellow-600 p-3 rounded-xl shadow-lg">
              <Zap className="text-white" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-teal-500 hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-gray-600 text-sm uppercase tracking-wide font-medium">Current</p>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mt-2">0.69 <span className="text-xl md:text-2xl text-gray-500">A</span></h2>
            </div>
            <div className="bg-gradient-to-br from-teal-400 to-teal-600 p-3 rounded-xl shadow-lg">
              <Activity className="text-white" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-purple-500 hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-gray-600 text-sm uppercase tracking-wide font-medium">Power</p>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mt-2">166 <span className="text-xl md:text-2xl text-gray-500">W</span></h2>
            </div>
            <div className="bg-gradient-to-br from-purple-400 to-purple-600 p-3 rounded-xl shadow-lg">
              <Power className="text-white" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-green-500 hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-gray-600 text-sm uppercase tracking-wide font-medium">Total Consumption</p>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mt-2">103.90 <span className="text-xl md:text-2xl text-gray-500">kWh</span></h2>
            </div>
            <div className="bg-gradient-to-br from-green-400 to-green-600 p-3 rounded-xl shadow-lg">
              <TrendingUp className="text-white" size={24} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

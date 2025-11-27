// import React from 'react';
// import { Home, Grid, Layers, Menu, X, Zap, Activity, Power, TrendingUp, Edit2, Trash2, Plus, ChevronLeft, ChevronRight } from 'lucide-react';

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

// export default Dashboard;

import React from 'react';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Zap, Activity, Power, TrendingUp } from 'lucide-react';

// Register required Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  // Example chart data
  const voltageData = {
    labels: ['10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM'],
    datasets: [
      {
        label: 'Voltage (V)',
        data: [200, 240, 210, 235, 204, 243],
        borderColor: '#FBBF24',
        backgroundColor: 'rgba(251, 191, 36, 0.2)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const currentData = {
    labels: ['10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM'],
    datasets: [
      {
        label: 'Current (A)',
        data: [0.65, 1.5, 0.5, 1.5, 1, 1.4],
        borderColor: '#14B8A6',
        backgroundColor: 'rgba(20, 184, 166, 0.2)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const powerData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    datasets: [
      {
        label: 'Power Consumption (W)',
        data: [150, 165, 180, 155, 170, 190],
        backgroundColor: '#8B5CF6',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true, position: 'top' },
    },
    scales: {
      y: { beginAtZero: true },
    },
  };

  return (
    <div className="space-y-6 p-4">
      {/* Header */}
      <div>
        <h1 className="text-lg sm:text-lg md:text-lg font-bold text-slate-800 mb-1 ">
          Dashboard Overview
        </h1>
        <p className="text-slate-600 text-sm sm:text-base md:text-lg">
          Monitor your electrical system in real-time
        </p>
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">

         {/* Total Consumption Card */}
        <div className="bg-white rounded-xl p-4 sm:p-5 md:p-6 shadow-sm border-l-4 border-green-500 hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-3 sm:mb-4">
            <div>
              <p className="text-gray-600 text-xs sm:text-sm uppercase tracking-wide font-medium">
                Total Consumption
              </p>
              <h2 className="text-semibold sm:text-semibold md:text-semibold font-bold text-slate-800 mt-2">
                103.90 <span className="text-semibold sm:text-semibold md:text-semibold font-bold  text-gray-500">kWh</span>
              </h2>
            </div>
            <div className="bg-gradient-to-br from-green-400 to-green-600 p-2 sm:p-3 rounded-xl shadow-lg">
              <TrendingUp className="text-white" size={20} />
            </div>
          </div>
        </div>
         {/* Current Card */}
        <div className="bg-white rounded-xl p-4 sm:p-5 md:p-6 shadow-sm border-l-4 border-teal-500 hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-3 sm:mb-4">
            <div>
              <p className="text-gray-600 text-xs sm:text-sm uppercase tracking-wide font-medium">
                Current
              </p>
              <h2 className="text-semibold sm:text-semibold md:text-semibold font-bold text-slate-800 mt-2">
                0.69 <span className="text-semibold sm:text-semibold md:text-semibold font-bold  text-gray-500">A</span>
              </h2>
            </div>
            <div className="bg-gradient-to-br from-teal-400 to-teal-600 p-2 sm:p-3 rounded-xl shadow-lg">
              <Activity className="text-white" size={20} />
            </div>
          </div>
        </div>
        {/* Voltage Card */}
        <div className="bg-white rounded-xl p-4 sm:p-5 md:p-6 shadow-sm border-l-4 border-yellow-500 hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-3 sm:mb-4">
            <div>
              <p className="text-gray-600 text-xs sm:text-sm uppercase tracking-wide font-semibold">
                Voltage
              </p>
              <h2 className="text-semibold sm:text-semibold md:text-semibold font-bold text-slate-800 mt-2">
                242 <span className="text-semibold sm:text-semibold md:text-semibold font-bold  text-gray-500">V</span>
              </h2>
            </div>
            <div className="bg-gradient-to-br from-yellow-400 to-yellow-600 p-2 sm:p-3 rounded-xl shadow-lg">
              <Zap className="text-white" size={20} />
            </div>
          </div>
        </div>

       

        {/* Power Card */}
        <div className="bg-white rounded-xl p-4 sm:p-5 md:p-6 shadow-sm border-l-4 border-purple-500 hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-3 sm:mb-4">
            <div>
              <p className="text-gray-600 text-xs sm:text-sm uppercase tracking-wide font-medium">
                Power
              </p>
              <h2 className="text-semibold sm:text-semibold md:text-semibold font-bold text-slate-800 mt-2">
                166 <span className="text-semibold sm:text-semibold md:text-semibold font-bold  text-gray-500">W</span>
              </h2>
            </div>
            <div className="bg-gradient-to-br from-purple-400 to-purple-600 p-2 sm:p-3 rounded-xl shadow-lg">
              <Power className="text-white" size={20} />
            </div>
          </div>
        </div>

       
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow h-[300px] sm:h-[350px] md:h-[400px]">
          <h3 className="text-base sm:text-lg md:text-xl font-semibold text-slate-700 mb-4">
            Voltage Trend
          </h3>
          <div className="h-[90%]">
            <Line data={voltageData} options={chartOptions} />
          </div>
        </div>

        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow h-[300px] sm:h-[350px] md:h-[400px]">
          <h3 className="text-base sm:text-lg md:text-xl font-semibold text-slate-700 mb-4">
            Current Trend
          </h3>
          <div className="h-[90%]">
            <Line data={currentData} options={chartOptions} />
          </div>
        </div>

        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow md:col-span-2 h-[350px] sm:h-[400px] md:h-[450px]">
          <h3 className="text-base sm:text-lg md:text-xl font-semibold text-slate-700 mb-4">
            Weekly Power Consumption
          </h3>
          <div className="h-[90%]">
            <Bar data={powerData} options={chartOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

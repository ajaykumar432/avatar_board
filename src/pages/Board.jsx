// import React, { useState } from "react";
// import { Edit2, Trash2, Plus, X } from "lucide-react";

// const Boards = () => {
//   const [boards, setBoards] = useState([
//     {
//       id: 1,
//       name: "BOARD_1",
//       devices: 8,
//       switches: 5,
//       fans: 3,
//       customDevices: [],
//       deviceList: [
//         "Switch 1",
//         "Switch 2",
//         "Switch 3",
//         "Switch 4",
//         "Switch 5",
//         "Fan 1",
//         "Fan 2",
//         "Fan 3",
//       ],
//     },
//   ]);

//   const [showModal, setShowModal] = useState(false);
//   const [editMode, setEditMode] = useState(false);
//   const [currentBoardId, setCurrentBoardId] = useState(null);
//   const [boardName, setBoardName] = useState("");
//   const [switches, setSwitches] = useState("");
//   const [fans, setFans] = useState("");
//   const [customDevices, setCustomDevices] = useState([]);
//   const [errors, setErrors] = useState({});

//   const addCustomDevice = () => {
//     setCustomDevices([...customDevices, { name: "", count: "" }]);
//   };

//   const removeCustomDevice = (index) => {
//     setCustomDevices(customDevices.filter((_, i) => i !== index));
//     const newErrors = { ...errors };
//     delete newErrors[`custom_${index}_name`];
//     delete newErrors[`custom_${index}_count`];
//     setErrors(newErrors);
//   };

//   const updateCustomDevice = (index, field, value) => {
//     const updated = [...customDevices];
//     updated[index][field] = value;
//     setCustomDevices(updated);
//   };

//   const validateForm = () => {
//     const newErrors = {};
//     if (!boardName.trim()) newErrors.boardName = "Board name is required";
//     if (!switches || switches < 0) newErrors.switches = "Valid number required";
//     if (!fans || fans < 0) newErrors.fans = "Valid number required";

//     customDevices.forEach((device, idx) => {
//       if (!device.name.trim())
//         newErrors[`custom_${idx}_name`] = "Device name required";
//       if (!device.count || device.count < 0)
//         newErrors[`custom_${idx}_count`] = "Valid count required";
//     });

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSave = () => {
//     if (!validateForm()) return;

//     const deviceList = [];
//     for (let i = 1; i <= parseInt(switches); i++)
//       deviceList.push(`Switch ${i}`);
//     for (let i = 1; i <= parseInt(fans); i++) deviceList.push(`Fan ${i}`);

//     const customDevicesData = customDevices.map((device) => ({
//       name: device.name,
//       count: parseInt(device.count),
//     }));

//     customDevices.forEach((device) => {
//       for (let i = 1; i <= parseInt(device.count); i++) {
//         deviceList.push(`${device.name} ${i}`);
//       }
//     });

//     if (editMode) {
//       // Update existing board
//       const updatedBoards = boards.map((board) =>
//         board.id === currentBoardId
//           ? {
//               ...board,
//               name: boardName,
//               devices: deviceList.length,
//               switches: parseInt(switches),
//               fans: parseInt(fans),
//               customDevices: customDevicesData,
//               deviceList,
//             }
//           : board
//       );
//       setBoards(updatedBoards);
//     } else {
//       // Add new board
//       const newBoard = {
//         id: boards.length > 0 ? Math.max(...boards.map((b) => b.id)) + 1 : 1,
//         name: boardName,
//         devices: deviceList.length,
//         switches: parseInt(switches),
//         fans: parseInt(fans),
//         customDevices: customDevicesData,
//         deviceList,
//       };
//       setBoards([...boards, newBoard]);
//     }

//     handleClose();
//   };

//   const handleClose = () => {
//     setShowModal(false);
//     setEditMode(false);
//     setCurrentBoardId(null);
//     setBoardName("");
//     setSwitches("");
//     setFans("");
//     setCustomDevices([]);
//     setErrors({});
//   };

//   const handleEdit = (board) => {
//     setEditMode(true);
//     setCurrentBoardId(board.id);
//     setBoardName(board.name);
//     setSwitches(board.switches.toString());
//     setFans(board.fans.toString());
//     setCustomDevices(
//       board.customDevices
//         ? board.customDevices.map((d) => ({
//             name: d.name,
//             count: d.count.toString(),
//           }))
//         : []
//     );
//     setShowModal(true);
//   };

//   const deleteBoard = (id) => {
//     if (window.confirm("Are you sure you want to delete this board?")) {
//       setBoards(boards.filter((board) => board.id !== id));
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8">
//       <div className="max-w-7xl mx-auto space-y-6">
//         {/* Header */}
//         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//           <div>
//             <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">
//               Board Management
//             </h1>
//             <p className="text-slate-600">
//               Configure and manage electrical boards
//             </p>
//           </div>
//           <button
//             onClick={() => setShowModal(true)}
//             className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-teal-500/50 hover:shadow-xl hover:scale-105"
//           >
//             <Plus size={20} />
//             <span className="font-semibold">Add New Board</span>
//           </button>
//         </div>

//         {/* Boards List */}
//         <div className="space-y-6">
//           {boards.length === 0 ? (
//             <div className="bg-white rounded-2xl p-12 text-center shadow-sm">
//               <div className="max-w-md mx-auto">
//                 <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                   <Plus size={40} className="text-slate-400" />
//                 </div>
//                 <h3 className="text-xl font-semibold text-slate-800 mb-2">
//                   No boards yet
//                 </h3>
//                 <p className="text-slate-600 mb-6">
//                   Get started by creating your first electrical board
//                 </p>
//                 <button
//                   onClick={() => setShowModal(true)}
//                   className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-3 rounded-xl inline-flex items-center gap-2 transition-colors"
//                 >
//                   <Plus size={20} />
//                   Create Board
//                 </button>
//               </div>
//             </div>
//           ) : (
//             boards.map((board) => (
//               <div
//                 key={board.id}
//                 className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all"
//               >
//                 <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
//                   <div>
//                     <h2 className="text-2xl md:text-3xl font-bold text-slate-800">
//                       {board.name}
//                     </h2>
//                     <p className="text-slate-600 mt-1">
//                       {board.devices} Total Devices
//                     </p>
//                   </div>
//                   <div className="flex gap-2">
//                     <button
//                       onClick={() => handleEdit(board)}
//                       className="p-2.5 text-teal-600 hover:bg-teal-50 rounded-lg transition-colors"
//                       title="Edit Board"
//                     >
//                       <Edit2 size={20} />
//                     </button>
//                     <button
//                       onClick={() => deleteBoard(board.id)}
//                       className="p-2.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
//                       title="Delete Board"
//                     >
//                       <Trash2 size={20} />
//                     </button>
//                   </div>
//                 </div>

//                 {/* Device Counts */}
//                 <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
//                   <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl">
//                     <p className="text-blue-600 text-sm font-medium mb-1">
//                       Switches
//                     </p>
//                     <p className="text-3xl font-bold text-blue-700">
//                       {board.switches}
//                     </p>
//                   </div>
//                   <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl">
//                     <p className="text-green-600 text-sm font-medium mb-1">
//                       Fans
//                     </p>
//                     <p className="text-3xl font-bold text-green-700">
//                       {board.fans}
//                     </p>
//                   </div>
//                   {board.customDevices &&
//                     board.customDevices.map((device, idx) => (
//                       <div
//                         key={idx}
//                         className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl"
//                       >
//                         <p className="text-purple-600 text-sm font-medium mb-1 truncate">
//                           {device.name}
//                         </p>
//                         <p className="text-3xl font-bold text-purple-700">
//                           {device.count}
//                         </p>
//                       </div>
//                     ))}
//                 </div>

//                 {/* Device List */}
//                 <div>
//                   <p className="text-slate-600 text-sm uppercase tracking-wide mb-3 font-semibold">
//                     Device List
//                   </p>
//                   <div className="flex flex-wrap gap-2">
//                     {board.deviceList.map((device, idx) => (
//                       <span
//                         key={idx}
//                         className="bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-lg text-slate-700 text-sm font-medium transition-colors"
//                       >
//                         {device}
//                       </span>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>

//         {/* Add/Edit Board Modal */}
//         {showModal && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
//             <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl animate-slideUp">
//               {/* Modal Header */}
//               <div className="bg-gradient-to-r from-slate-700 to-slate-900 text-white px-6 py-5 flex justify-between items-center">
//                 <h2 className="text-2xl font-bold">
//                   {editMode ? "Edit Board" : "Add New Board"}
//                 </h2>
//                 <button
//                   onClick={handleClose}
//                   className="hover:bg-white/20 p-2 rounded-lg transition-colors"
//                 >
//                   <X size={24} />
//                 </button>
//               </div>

//               {/* Modal Content */}
//               <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
//                 <div className="space-y-5">
//                   {/* Board Name */}
//                   <div>
//                     <label className="block text-slate-700 font-semibold mb-2">
//                       Board Name <span className="text-red-500">*</span>
//                     </label>
//                     <input
//                       type="text"
//                       value={boardName}
//                       onChange={(e) => setBoardName(e.target.value)}
//                       placeholder="e.g., BOARD_1"
//                       className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all ${
//                         errors.boardName ? "border-red-500" : "border-slate-200"
//                       }`}
//                     />
//                     {errors.boardName && (
//                       <p className="text-red-500 text-sm mt-1">
//                         {errors.boardName}
//                       </p>
//                     )}
//                   </div>

//                   {/* Switches and Fans */}
//                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
//                     <div>
//                       <label className="block text-slate-700 font-semibold mb-2">
//                         Number of Switches{" "}
//                         <span className="text-red-500">*</span>
//                       </label>
//                       <input
//                         type="number"
//                         min="0"
//                         value={switches}
//                         onChange={(e) => setSwitches(e.target.value)}
//                         placeholder="5"
//                         className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all ${
//                           errors.switches
//                             ? "border-red-500"
//                             : "border-slate-200"
//                         }`}
//                       />
//                       {errors.switches && (
//                         <p className="text-red-500 text-sm mt-1">
//                           {errors.switches}
//                         </p>
//                       )}
//                     </div>

//                     <div>
//                       <label className="block text-slate-700 font-semibold mb-2">
//                         Number of Fans <span className="text-red-500">*</span>
//                       </label>
//                       <input
//                         type="number"
//                         min="0"
//                         value={fans}
//                         onChange={(e) => setFans(e.target.value)}
//                         placeholder="3"
//                         className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all ${
//                           errors.fans ? "border-red-500" : "border-slate-200"
//                         }`}
//                       />
//                       {errors.fans && (
//                         <p className="text-red-500 text-sm mt-1">
//                           {errors.fans}
//                         </p>
//                       )}
//                     </div>
//                   </div>

//                   {/* Custom Devices Section */}
//                   <div className="border-t-2 border-slate-200 pt-5">
//                     <div className="flex justify-between items-center mb-4">
//                       <label className="block text-slate-700 font-semibold">
//                         Other Devices (Optional)
//                       </label>
//                       <button
//                         type="button"
//                         onClick={addCustomDevice}
//                         className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm transition-all hover:scale-105 shadow-md"
//                       >
//                         <Plus size={16} />
//                         Add Device
//                       </button>
//                     </div>

//                     {customDevices.length > 0 ? (
//                       <div className="space-y-3">
//                         {customDevices.map((device, index) => (
//                           <div
//                             key={index}
//                             className="bg-slate-50 p-4 rounded-xl border-2 border-slate-200 hover:border-teal-300 transition-colors"
//                           >
//                             <div className="flex items-start gap-3">
//                               <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
//                                 <div>
//                                   <label className="block text-sm font-medium text-slate-600 mb-1">
//                                     Device Name
//                                   </label>
//                                   <input
//                                     type="text"
//                                     value={device.name}
//                                     onChange={(e) =>
//                                       updateCustomDevice(
//                                         index,
//                                         "name",
//                                         e.target.value
//                                       )
//                                     }
//                                     placeholder="e.g., Light, Outlet"
//                                     className={`w-full px-3 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm ${
//                                       errors[`custom_${index}_name`]
//                                         ? "border-red-500"
//                                         : "border-slate-200"
//                                     }`}
//                                   />
//                                   {errors[`custom_${index}_name`] && (
//                                     <p className="text-red-500 text-xs mt-1">
//                                       {errors[`custom_${index}_name`]}
//                                     </p>
//                                   )}
//                                 </div>
//                                 <div>
//                                   <label className="block text-sm font-medium text-slate-600 mb-1">
//                                     Count
//                                   </label>
//                                   <input
//                                     type="number"
//                                     min="0"
//                                     value={device.count}
//                                     onChange={(e) =>
//                                       updateCustomDevice(
//                                         index,
//                                         "count",
//                                         e.target.value
//                                       )
//                                     }
//                                     placeholder="0"
//                                     className={`w-full px-3 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm ${
//                                       errors[`custom_${index}_count`]
//                                         ? "border-red-500"
//                                         : "border-slate-200"
//                                     }`}
//                                   />
//                                   {errors[`custom_${index}_count`] && (
//                                     <p className="text-red-500 text-xs mt-1">
//                                       {errors[`custom_${index}_count`]}
//                                     </p>
//                                   )}
//                                 </div>
//                               </div>
//                               <button
//                                 type="button"
//                                 onClick={() => removeCustomDevice(index)}
//                                 className="mt-6 p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
//                               >
//                                 <Trash2 size={18} />
//                               </button>
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     ) : (
//                       <div className="text-center py-8 text-slate-400 bg-slate-50 rounded-xl border-2 border-dashed border-slate-200">
//                         <p className="text-sm font-medium">
//                           No custom devices added yet
//                         </p>
//                         <p className="text-xs mt-1">
//                           Click "Add Device" to include other types of devices
//                         </p>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>

//               {/* Modal Footer */}
//               <div className="bg-slate-50 px-6 py-4 flex flex-col-reverse sm:flex-row gap-3 sm:justify-end border-t-2 border-slate-200">
//                 <button
//                   type="button"
//                   onClick={handleClose}
//                   className="px-6 py-3 border-2 border-slate-300 text-slate-700 rounded-xl hover:bg-slate-100 transition-colors font-semibold"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="button"
//                   onClick={handleSave}
//                   className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white px-6 py-3 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-teal-500/30 font-semibold hover:scale-105"
//                 >
//                   {editMode ? <Edit2 size={20} /> : <Plus size={20} />}
//                   {editMode ? "Update Board" : "Save Board"}
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Boards;



// // components/Boards.jsx
// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Edit2, Trash2, Plus, X } from "lucide-react";
// import {
//   fetchBoards,
//   createBoard,
//   updateBoard,
//   deleteBoard,
//   clearError,
//   clearSuccess,
// } from "../components/redux/slices/boardSlice";

// const Boards = () => {
//   const dispatch = useDispatch();
//   const { boards, loading, error, success } = useSelector((state) => state.boards);

//   const [showModal, setShowModal] = useState(false);
//   const [editMode, setEditMode] = useState(false);
//   const [currentBoardId, setCurrentBoardId] = useState(null);
//   const [boardName, setBoardName] = useState("");
//   const [switches, setSwitches] = useState("");
//   const [fans, setFans] = useState("");
//   const [errors, setErrors] = useState({});

//   // Fetch boards on component mount
//   useEffect(() => {
//     dispatch(fetchBoards());
//   }, [dispatch]);

//   // Handle success/error messages
//   useEffect(() => {
//     if (success) {
//       setTimeout(() => {
//         dispatch(clearSuccess());
//       }, 3000);
//     }
//   }, [success, dispatch]);

//   useEffect(() => {
//     if (error) {
//       setTimeout(() => {
//         dispatch(clearError());
//       }, 5000);
//     }
//   }, [error, dispatch]);

//   const validateForm = () => {
//     const newErrors = {};
//     if (!boardName.trim()) newErrors.boardName = "Board name is required";
//     if (!switches || switches < 0) newErrors.switches = "Valid number required";
//     if (!fans || fans < 0) newErrors.fans = "Valid number required";

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSave = async () => {
//     if (!validateForm()) return;

//     const boardData = {
//       name: boardName,
//       switches: parseInt(switches),
//       fans: parseInt(fans),
//     };

//     try {
//       if (editMode) {
//         await dispatch(updateBoard({ id: currentBoardId, data: boardData })).unwrap();
//       } else {
//         await dispatch(createBoard(boardData)).unwrap();
//       }
//       handleClose();
//     } catch (err) {
//       console.error("Failed to save board:", err);
//     }
//   };

//   const handleClose = () => {
//     setShowModal(false);
//     setEditMode(false);
//     setCurrentBoardId(null);
//     setBoardName("");
//     setSwitches("");
//     setFans("");
//     setErrors({});
//   };

//   const handleEdit = (board) => {
//     setEditMode(true);
//     setCurrentBoardId(board.id);
//     setBoardName(board.name);
//     setSwitches(board.switches.toString());
//     setFans(board.fans.toString());
//     setShowModal(true);
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this board?")) {
//       try {
//         await dispatch(deleteBoard(id)).unwrap();
//       } catch (err) {
//         console.error("Failed to delete board:", err);
//       }
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8">
//       <div className="max-w-7xl mx-auto space-y-6">
//         {/* Error/Success Messages */}
//         {error && (
//           <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
//             <p className="text-red-700 font-medium">{error}</p>
//           </div>
//         )}
//         {success && (
//           <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-lg">
//             <p className="text-green-700 font-medium">
//               Board saved successfully!
//             </p>
//           </div>
//         )}

//         {/* Header */}
//         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//           <div>
//             <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">
//               Board Management
//             </h1>
//             <p className="text-slate-600">
//               Configure and manage electrical boards
//             </p>
//           </div>
//           <button
//             onClick={() => setShowModal(true)}
//             disabled={loading}
//             className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-teal-500/50 hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             <Plus size={20} />
//             <span className="font-semibold">Add New Board</span>
//           </button>
//         </div>

//         {/* Loading State */}
//         {loading && (
//           <div className="flex justify-center items-center py-12">
//             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500"></div>
//           </div>
//         )}

//         {/* Boards List */}
//         {!loading && (
//           <div className="space-y-6">
//             {boards?.length === 0 ? (
//               <div className="bg-white rounded-2xl p-12 text-center shadow-sm">
//                 <div className="max-w-md mx-auto">
//                   <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                     <Plus size={40} className="text-slate-400" />
//                   </div>
//                   <h3 className="text-xl font-semibold text-slate-800 mb-2">
//                     No boards yet
//                   </h3>
//                   <p className="text-slate-600 mb-6">
//                     Get started by creating your first electrical board
//                   </p>
//                   <button
//                     onClick={() => setShowModal(true)}
//                     className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-3 rounded-xl inline-flex items-center gap-2 transition-colors"
//                   >
//                     <Plus size={20} />
//                     Create Board
//                   </button>
//                 </div>
//               </div>
//             ) : (
//               boards?.map((board) => (
//                 <div
//                   key={board.id}
//                   className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all"
//                 >
//                   <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
//                     <div>
//                       <h2 className="text-2xl md:text-3xl font-bold text-slate-800">
//                         {board.name}
//                       </h2>
//                       <p className="text-slate-600 mt-1">
//                         {board.devices} Total Devices
//                       </p>
//                     </div>
//                     <div className="flex gap-2">
//                       <button
//                         onClick={() => handleEdit(board)}
//                         className="p-2.5 text-teal-600 hover:bg-teal-50 rounded-lg transition-colors"
//                         title="Edit Board"
//                       >
//                         <Edit2 size={20} />
//                       </button>
//                       <button
//                         onClick={() => handleDelete(board.id)}
//                         className="p-2.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
//                         title="Delete Board"
//                       >
//                         <Trash2 size={20} />
//                       </button>
//                     </div>
//                   </div>

//                   {/* Device Counts */}
//                   <div className="grid grid-cols-2 gap-4 mb-6">
//                     <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl">
//                       <p className="text-blue-600 text-sm font-medium mb-1">
//                         Switches
//                       </p>
//                       <p className="text-3xl font-bold text-blue-700">
//                         {board.switches}
//                       </p>
//                     </div>
//                     <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl">
//                       <p className="text-green-600 text-sm font-medium mb-1">
//                         Fans
//                       </p>
//                       <p className="text-3xl font-bold text-green-700">
//                         {board.fans}
//                       </p>
//                     </div>
//                   </div>

//                   {/* Device List */}
//                   <div>
//                     <p className="text-slate-600 text-sm uppercase tracking-wide mb-3 font-semibold">
//                       Device List
//                     </p>
//                     <div className="flex flex-wrap gap-2">
//                       {board.deviceList &&
//                         board.deviceList.map((device, idx) => (
//                           <span
//                             key={idx}
//                             className="bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-lg text-slate-700 text-sm font-medium transition-colors"
//                           >
//                             {device}
//                           </span>
//                         ))}
//                     </div>
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>
//         )}

//         {/* Add/Edit Board Modal */}
//         {showModal && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
//             <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl animate-slideUp">
//               {/* Modal Header */}
//               <div className="bg-gradient-to-r from-slate-700 to-slate-900 text-white px-6 py-5 flex justify-between items-center">
//                 <h2 className="text-2xl font-bold">
//                   {editMode ? "Edit Board" : "Add New Board"}
//                 </h2>
//                 <button
//                   onClick={handleClose}
//                   className="hover:bg-white/20 p-2 rounded-lg transition-colors"
//                 >
//                   <X size={24} />
//                 </button>
//               </div>

//               {/* Modal Content */}
//               <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
//                 <div className="space-y-5">
//                   {/* Board Name */}
//                   <div>
//                     <label className="block text-slate-700 font-semibold mb-2">
//                       Board Name <span className="text-red-500">*</span>
//                     </label>
//                     <input
//                       type="text"
//                       value={boardName}
//                       onChange={(e) => setBoardName(e.target.value)}
//                       placeholder="e.g., Living Room Board"
//                       className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all ${
//                         errors.boardName ? "border-red-500" : "border-slate-200"
//                       }`}
//                     />
//                     {errors.boardName && (
//                       <p className="text-red-500 text-sm mt-1">
//                         {errors.boardName}
//                       </p>
//                     )}
//                   </div>

//                   {/* Switches and Fans */}
//                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
//                     <div>
//                       <label className="block text-slate-700 font-semibold mb-2">
//                         Number of Switches{" "}
//                         <span className="text-red-500">*</span>
//                       </label>
//                       <input
//                         type="number"
//                         min="0"
//                         value={switches}
//                         onChange={(e) => setSwitches(e.target.value)}
//                         placeholder="5"
//                         className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all ${
//                           errors.switches
//                             ? "border-red-500"
//                             : "border-slate-200"
//                         }`}
//                       />
//                       {errors.switches && (
//                         <p className="text-red-500 text-sm mt-1">
//                           {errors.switches}
//                         </p>
//                       )}
//                     </div>

//                     <div>
//                       <label className="block text-slate-700 font-semibold mb-2">
//                         Number of Fans <span className="text-red-500">*</span>
//                       </label>
//                       <input
//                         type="number"
//                         min="0"
//                         value={fans}
//                         onChange={(e) => setFans(e.target.value)}
//                         placeholder="3"
//                         className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all ${
//                           errors.fans ? "border-red-500" : "border-slate-200"
//                         }`}
//                       />
//                       {errors.fans && (
//                         <p className="text-red-500 text-sm mt-1">
//                           {errors.fans}
//                         </p>
//                       )}
//                     </div>
//                   </div>

//                   {/* Info Note */}
//                   <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg">
//                     <p className="text-blue-700 text-sm">
//                       <strong>Note:</strong> Custom devices are not supported by the current API version. 
//                       Only switches and fans can be configured.
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               {/* Modal Footer */}
//               <div className="bg-slate-50 px-6 py-4 flex flex-col-reverse sm:flex-row gap-3 sm:justify-end border-t-2 border-slate-200">
//                 <button
//                   type="button"
//                   onClick={handleClose}
//                   className="px-6 py-3 border-2 border-slate-300 text-slate-700 rounded-xl hover:bg-slate-100 transition-colors font-semibold"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="button"
//                   onClick={handleSave}
//                   disabled={loading}
//                   className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white px-6 py-3 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-teal-500/30 font-semibold hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   {loading ? (
//                     <>
//                       <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
//                       <span>Saving...</span>
//                     </>
//                   ) : (
//                     <>
//                       {editMode ? <Edit2 size={20} /> : <Plus size={20} />}
//                       {editMode ? "Update Board" : "Save Board"}
//                     </>
//                   )}
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Boards;


import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Edit2, Trash2, Plus, X, Zap, Wind } from "lucide-react";
import {
  fetchBoards,
  createBoard,
  updateBoard,
  deleteBoard,
  clearError,
  clearSuccess,
} from "../components/redux/slices/boardSlice";

const Boards = () => {
  const dispatch = useDispatch();
  const { boards, loading, error, success } = useSelector((state) => state.boards);

  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentBoardId, setCurrentBoardId] = useState(null);
  const [boardName, setBoardName] = useState("");
  const [switches, setSwitches] = useState("");
  const [fans, setFans] = useState("");
  const [errors, setErrors] = useState({});

  // Fetch boards on component mount
  useEffect(() => {
    dispatch(fetchBoards());
  }, [dispatch]);

  // Handle success/error messages
  useEffect(() => {
    if (success) {
      setTimeout(() => {
        dispatch(clearSuccess());
      }, 3000);
    }
  }, [success, dispatch]);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        dispatch(clearError());
      }, 5000);
    }
  }, [error, dispatch]);

  const validateForm = () => {
    const newErrors = {};
    if (!boardName.trim()) newErrors.boardName = "Board name is required";
    if (!switches || switches < 0) newErrors.switches = "Valid number required";
    if (!fans || fans < 0) newErrors.fans = "Valid number required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    const boardData = {
      name: boardName,
      switches: parseInt(switches),
      fans: parseInt(fans),
    };

    try {
      if (editMode) {
        await dispatch(updateBoard({ id: currentBoardId, data: boardData })).unwrap();
      } else {
        await dispatch(createBoard(boardData)).unwrap();
      }
      handleClose();
    } catch (err) {
      console.error("Failed to save board:", err);
    }
  };

  const handleClose = () => {
    setShowModal(false);
    setEditMode(false);
    setCurrentBoardId(null);
    setBoardName("");
    setSwitches("");
    setFans("");
    setErrors({});
  };

  const handleEdit = (board) => {
    setEditMode(true);
    setCurrentBoardId(board.id);
    setBoardName(board.name);
    setSwitches(board.switches.toString());
    setFans(board.fans.toString());
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this board?")) {
      try {
        await dispatch(deleteBoard(id)).unwrap();
      } catch (err) {
        console.error("Failed to delete board:", err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50 p-3 sm:p-4 md:p-4 lg:p-4">
      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
        {/* Error/Success Messages */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-3 sm:p-4 rounded-lg shadow-sm animate-slideDown">
            <p className="text-red-700 font-medium text-sm sm:text-base">{error}</p>
          </div>
        )}
        {success && (
          <div className="bg-green-50 border-l-4 border-green-500 p-3 sm:p-4 rounded-lg shadow-sm animate-slideDown">
            <p className="text-green-700 font-medium text-sm sm:text-base">
              Board saved successfully!
            </p>
          </div>
        )}

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
          <div className="w-full sm:w-auto">
            <h1 className="text-lg sm:text-lg md:text-lg   font-bold text-teal-600 mb-0.5">
              Board Management
            </h1>
            <p className="text-slate-600 text-sm sm:text-sm md:text-sm">
              Configure and manage electrical boards
            </p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            disabled={loading}
            className="w-full sm:w-auto bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white px-2 sm:px-4 py-2.5 sm:py-3 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-teal-500/50 hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base font-semibold"
          >
            <Plus size={18} className="sm:w-5 sm:h-5" />
            <span>Add New Board</span>
          </button>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12 sm:py-16">
            <div className="animate-spin rounded-full h-10 w-10 sm:h-16 sm:w-16 border-4 border-teal-200 border-t-teal-500"></div>
          </div>
        )}

        {/* Boards List */}
        {!loading && (
          <div className="space-y-4 sm:space-y-6">
            {boards?.length === 0 ? (
              <div className="bg-white rounded-2xl p-8 sm:p-12 text-center shadow-lg">
                <div className="max-w-md mx-auto">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-teal-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                    <Plus size={32} className="sm:w-10 sm:h-10 text-teal-600" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-2">
                    No boards yet
                  </h3>
                  <p className="text-slate-600 mb-6 text-sm sm:text-base">
                    Get started by creating your first electrical board
                  </p>
                  <button
                    onClick={() => setShowModal(true)}
                    className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-3 rounded-xl inline-flex items-center gap-2 transition-all hover:scale-105 shadow-lg text-sm sm:text-base font-semibold"
                  >
                    <Plus size={20} />
                    Create Board
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                {boards?.map((board) => (
                  <div
                    key={board.id}
                    className="bg-white rounded-2xl p-3 sm:p-4 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-slate-100"
                  >
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
                      <div className="flex-1 min-w-0 w-full">
                        <h2 className="text-lg sm:text-lg md:text-lg font-semibold text-slate-800 truncate">
                          {board.name}
                        </h2>
                        <p className="text-slate-600 mt-1 text-xs sm:text-sm md:text-base">
                          {board.devices} Total Devices
                        </p>
                      </div>
                      <div className="flex gap-2 self-end sm:self-start">
                        <button
                          onClick={() => handleEdit(board)}
                          className="p-2 sm:p-2.5 text-teal-600 hover:bg-teal-50 rounded-lg transition-colors hover:scale-110"
                          title="Edit Board"
                        >
                          <Edit2 size={18} className="sm:w-5 sm:h-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(board.id)}
                          className="p-2 sm:p-2.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors hover:scale-110"
                          title="Delete Board"
                        >
                          <Trash2 size={18} className="sm:w-5 sm:h-5" />
                        </button>
                      </div>
                    </div>

                    {/* Device Counts */}
                    <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
                      <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-3 sm:p-4 rounded-xl border border-blue-200 hover:shadow-md transition-all">
                        <div className="flex items-center gap-2 mb-1 sm:mb-2">
                          <Zap size={16} className="sm:w-5 sm:h-5 text-blue-600" />
                          <p className="text-blue-600 text-xs sm:text-sm font-semibold">
                            Switches
                          </p>
                          
                        </div>
                        <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-700">
                          {board.switches}
                        </p>
                      </div>
                      <div className="bg-gradient-to-br from-green-50 to-green-100 p-3 sm:p-4 rounded-xl border border-green-200 hover:shadow-md transition-all">
                        <div className="flex items-center gap-2 mb-1 sm:mb-2">
                          <Wind size={16} className="sm:w-5 sm:h-5 text-green-600" />
                          <p className="text-green-600 text-xs sm:text-sm font-semibold">
                            Fans
                          </p>
                        </div>
                        <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-700">
                          {board.fans}
                        </p>
                      </div>
                    </div>

                    {/* Device List */}
                    <div>
                      <p className="text-slate-600 text-xs sm:text-sm uppercase tracking-wider mb-2 sm:mb-3 font-bold">
                        Device List
                      </p>
                      <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        {board.deviceList &&
                          board.deviceList.map((device, idx) => (
                            <span
                              key={idx}
                              className="bg-slate-100 hover:bg-slate-200 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-lg text-slate-700 text-xs sm:text-sm font-medium transition-all hover:scale-105 cursor-default"
                            >
                              {device}
                            </span>
                          ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Add/Edit Board Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/40 bg-opacity-60 flex items-center justify-center p-3 sm:p-4 z-50 backdrop-blur-sm">
            <div className="bg-white rounded-xl w-full max-w-xl max-h-[95vh] sm:max-h-[90vh] overflow-hidden shadow-2xl animate-slideUp">
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-slate-700 to-slate-900 text-white px-4 sm:px-6 py-4 sm:py-5 flex justify-between items-center">
                <h2 className="text-xl sm:text-2xl font-bold">
                  {editMode ? "Edit Board" : "Add New Board"}
                </h2>
                <button
                  onClick={handleClose}
                  className="hover:bg-white/20 p-1.5 sm:p-2 rounded-lg transition-colors"
                >
                  <X size={20} className="sm:w-6 sm:h-6" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-4 sm:p-6 overflow-y-auto max-h-[calc(95vh-180px)] sm:max-h-[calc(90vh-180px)]">
                <div className="space-y-4 sm:space-y-5">
                  {/* Board Name */}
                  <div>
                    <label className="block text-slate-700 font-semibold mb-2 text-sm sm:text-base">
                      Board Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={boardName}
                      onChange={(e) => setBoardName(e.target.value)}
                      placeholder="e.g., Living Room Board"
                      className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all ${
                        errors.boardName ? "border-red-500" : "border-slate-200"
                      }`}
                    />
                    {errors.boardName && (
                      <p className="text-red-500 text-xs sm:text-sm mt-1">
                        {errors.boardName}
                      </p>
                    )}
                  </div>

                  {/* Switches and Fans */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    <div>
                      <label className="block text-slate-700 font-semibold mb-2 text-sm sm:text-base">
                        Number of Switches{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={switches}
                        onChange={(e) => setSwitches(e.target.value)}
                        placeholder="5"
                        className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all ${
                          errors.switches
                            ? "border-red-500"
                            : "border-slate-200"
                        }`}
                      />
                      {errors.switches && (
                        <p className="text-red-500 text-xs sm:text-sm mt-1">
                          {errors.switches}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-slate-700 font-semibold mb-2 text-sm sm:text-base">
                        Number of Fans <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={fans}
                        onChange={(e) => setFans(e.target.value)}
                        placeholder="3"
                        className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all ${
                          errors.fans ? "border-red-500" : "border-slate-200"
                        }`}
                      />
                      {errors.fans && (
                        <p className="text-red-500 text-xs sm:text-sm mt-1">
                          {errors.fans}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Info Note */}
                  <div className="bg-blue-50 border-l-4 border-blue-500 p-3 sm:p-4 rounded-lg">
                    <p className="text-blue-700 text-xs sm:text-sm leading-relaxed">
                      <strong className="font-semibold">Note:</strong> Custom devices are not supported by the current API version. 
                      Only switches and fans can be configured.
                    </p>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="bg-slate-50 px-4 sm:px-6 py-3 sm:py-4 flex flex-col-reverse sm:flex-row gap-2 sm:gap-3 sm:justify-end border-t-2 border-slate-200">
                <button
                  type="button"
                  onClick={handleClose}
                  className="w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base border-2 border-slate-300 text-slate-700 rounded-xl hover:bg-slate-100 transition-colors font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={loading}
                  className="w-full sm:w-auto bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-teal-500/30 font-semibold hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-2 border-white border-t-transparent"></div>
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      {editMode ? <Edit2 size={18} className="sm:w-5 sm:h-5" /> : <Plus size={18} className="sm:w-5 sm:h-5" />}
                      {editMode ? "Update Board" : "Save Board"}
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes slideDown {
          from {
            transform: translateY(-100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            transform: translateY(50px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }

        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Boards;
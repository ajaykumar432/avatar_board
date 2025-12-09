






// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from 'react-redux';
// import { Layers, Edit2, Trash2, Plus, X, Search, Lightbulb, Fan, Wind, ArrowLeft, Loader2, AlertCircle, CheckCircle } from 'lucide-react';
// import {
//   fetchRooms,
//   fetchRoomById,
//   createRoom,
//   updateRoom,
//   deleteRoom,
//   updateDeviceState,
//   fetchBoards,
//   clearError,
//   clearSuccess,
//   clearCurrentRoom,
//   toggleDeviceInRoomOptimistic,
//   clearDeviceUpdating
// } from "../components/redux/slices/roomSlice";

// const Rooms = () => {
//   const dispatch = useDispatch();
  
//   // Redux state
//   const { rooms, boards, currentRoom, loading, error, success, deviceUpdating } = useSelector(state => state.rooms);
  
//   // Local UI state
//   const [showModal, setShowModal] = useState(false);
//   const [editMode, setEditMode] = useState(false);
//   const [currentRoomId, setCurrentRoomId] = useState(null);
//   const [roomName, setRoomName] = useState('');
//   const [selectedBoardId, setSelectedBoardId] = useState('');
//   const [selectedDevices, setSelectedDevices] = useState({ fans: [], switches: [] });
//   const [searchQuery, setSearchQuery] = useState('');
//   const [errors, setErrors] = useState({});
//   const [viewingRoom, setViewingRoom] = useState(null);
//   const [speedUpdating, setSpeedUpdating] = useState(null);

//   // Fetch boards and rooms on mount
//   useEffect(() => {
//     dispatch(fetchBoards());
//     dispatch(fetchRooms());
//   }, [dispatch]);
//   const roomId = currentRoomId;
//   // Auto-clear success message
//   useEffect(() => {
//     if (success) {
//       const timer = setTimeout(() => {
//         dispatch(clearSuccess());
//       }, 3000);
//       return () => clearTimeout(timer);
//     }
//   }, [success, dispatch]);

//   // Auto-clear error message
//   useEffect(() => {
//     if (error) {
//       const timer = setTimeout(() => {
//         dispatch(clearError());
//       }, 5000);
//       return () => clearTimeout(timer);
//     }
//   }, [error, dispatch]);

//   // Fetch current room when viewing
//   useEffect(() => {
//     if (viewingRoom) {
//       dispatch(fetchRoomById(viewingRoom));
//       return () => {
//         dispatch(clearCurrentRoom());
//       };
//     }
//   }, [viewingRoom, dispatch]);

//   // Effect to check if device states match and clear updating status
//   useEffect(() => {
//     if (currentRoom && currentRoom.selected_devices) {
//       Object.keys(deviceUpdating).forEach(deviceName => {
//         const resDeviceName = `${deviceName}_Res`;
//         const mainState = currentRoom.selected_devices[deviceName];
//         const resState = currentRoom.selected_devices[resDeviceName];
        
//         // If states match, clear the updating status
//         if (mainState === resState) {
//           dispatch(clearDeviceUpdating({ deviceName }));
//         }
//       });
//     }
//   }, [currentRoom, deviceUpdating, dispatch]);

//   const getAvailableDevices = () => {
//     if (!selectedBoardId) return [];
    
//     const board = boards.find(b => b.boardId === selectedBoardId);
//     if (!board) return [];

//     const devices = [];
    
//     // Add fans
//     for (let i = 1; i <= board.num_fans; i++) {
//       devices.push({ 
//         id: `Fan_${i}`, 
//         name: `Fan ${i}`, 
//         type: 'fan',
//         category: 'fans'
//       });
//     }
    
//     // Add switches
//     for (let i = 1; i <= board.num_switches; i++) {
//       devices.push({ 
//         id: `Switch_${i}`, 
//         name: `Switch ${i}`, 
//         type: 'switch',
//         category: 'switches'
//       });
//     }

//     return devices.filter(device => 
//       device.name.toLowerCase().includes(searchQuery.toLowerCase())
//     );
//   };

//   const toggleDeviceSelection = (device) => {
//     const category = device.category;
//     const exists = selectedDevices[category]?.includes(device.id);
    
//     if (exists) {
//       setSelectedDevices({
//         ...selectedDevices,
//         [category]: selectedDevices[category].filter(id => id !== device.id)
//       });
//     } else {
//       setSelectedDevices({
//         ...selectedDevices,
//         [category]: [...(selectedDevices[category] || []), device.id]
//       });
//     }
//   };

//   const isDeviceSelected = (device) => {
//     return selectedDevices[device.category]?.includes(device.id) || false;
//   };

//   const validateForm = () => {
//     const newErrors = {};
//     if (!roomName.trim()) newErrors.roomName = 'Room name is required';
//     if (!selectedBoardId) newErrors.board = 'Please select a board';
    
//     if (!editMode) {
//       const totalSelected = (selectedDevices.fans?.length || 0) + (selectedDevices.switches?.length || 0);
//       if (totalSelected === 0) newErrors.devices = 'Please select at least one device';
//     }
    
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSave = async () => {
//     if (!validateForm()) return;

//     try {
//       if (editMode) {
//         await dispatch(updateRoom({ 
//           id: currentRoomId, 
//           data: { room_name: roomName } 
//         })).unwrap();
//       } else {
//         const roomData = {
//           room_name: roomName,
//           board_id: selectedBoardId,
//           selected_devices: {
//             fans: selectedDevices.fans || [],
//             switches: selectedDevices.switches || []
//           }
//         };
//         await dispatch(createRoom(roomData)).unwrap();
//       }
      
//       dispatch(fetchRooms());
//       handleClose();
//     } catch (err) {
//       console.error('Failed to save room:', err);
//     }
//   };

//   const handleClose = () => {
//     setShowModal(false);
//     setEditMode(false);
//     setCurrentRoomId(null);
//     setRoomName('');
//     setSelectedBoardId('');
//     setSelectedDevices({ fans: [], switches: [] });
//     setSearchQuery('');
//     setErrors({});
//   };

//   const handleEdit = async (room) => {
//     try {
//       const roomDetails = await dispatch(fetchRoomById(room.roomId)).unwrap();
      
//       setEditMode(true);
//       setCurrentRoomId(room.roomId);
//       setRoomName(roomDetails.room_name);
//       setSelectedBoardId(roomDetails.board_id);
      
//       const devices = { fans: [], switches: [] };
//       Object.keys(roomDetails.selected_devices).forEach(key => {
//         if (key.startsWith('Fan_') && !key.includes('_Res')) {
//           devices.fans.push(key);
//         } else if (key.startsWith('Switch_') && !key.includes('_Res')) {
//           devices.switches.push(key);
//         }
//       });
//       setSelectedDevices(devices);
//       setShowModal(true);
//     } catch (err) {
//       console.error('Failed to load room for editing:', err);
//     }
//   };

//   const deleteRoomHandler = async (roomId) => {
//     if (window.confirm('Are you sure you want to delete this room?')) {
//       try {
//         await dispatch(deleteRoom(roomId)).unwrap();
//       } catch (err) {
//         console.error('Failed to delete room:', err);
//       }
//     }
//   };


//   // 🔥 Poll room data every 1 second (ONLY when viewing room)
// useEffect(() => {
//   if (!viewingRoom) return;


//     dispatch(fetchRoomById(viewingRoom));
 

// }, [viewingRoom]);


// const toggleDevice = async (roomId, deviceName, currentState) => {
//   try {
//     const newState = currentState === 1 ? 0 : 1;

//     dispatch(toggleDeviceInRoomOptimistic({ roomId, deviceName, newState }));

//     await dispatch(updateDeviceState({
//       roomId,
//       deviceName,
//       state: newState
//     })).unwrap();

//   } catch (err) {
//     console.error("Failed to toggle device:", err);
//   }
// };

// const toggleFanSpeed = async (roomId, deviceId, newSpeed) => {
//   setSpeedUpdating(deviceId);

//   try {
//     await dispatch(updateDeviceState({
//       roomId,
//       deviceName: `${deviceId}_Res`,
//       state: newSpeed
//     })).unwrap();

//   } catch (err) {
//     console.error("Failed to update fan speed:", err);
//   } finally {
//     setSpeedUpdating(null);
//   }
// };



//   const getDeviceIcon = (type) => {
//     switch (type) {
//       case 'fan':
//         return <Fan size={20} />;
//       case 'curtain':
//         return <Wind size={20} />;
//       default:
//         return <Lightbulb size={20} />;
//     }
//   };

//   const getBoardName = (boardId) => {
//     const board = boards.find(b => b.boardId === boardId);
//     return board ? board.board_name : boardId;
//   };

//   // ROOM DETAILS VIEW
//   if (viewingRoom) {
//     if (loading || !currentRoom) {
//       return (
//         <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
//           <Loader2 className="animate-spin text-teal-600" size={48} />
//         </div>
//       );
//     }

//     const devices = [];
//     Object.keys(currentRoom.selected_devices).forEach(key => {
//       if (!key.includes('_Res')) {
//         const type = key.startsWith('Fan_') ? 'fan' : 'switch';
//         const mainState = currentRoom.selected_devices[key];
//         const resKey = `${key}_Res`;
//         const resState = currentRoom.selected_devices[resKey];
        
//         const isStateSynced = mainState === resState;
//         const isUpdating = !isStateSynced;
        
//         let speed = 0;
//         if (type === 'fan' && mainState === 1 && isStateSynced) {
//           speed = resState || 1;
//         }

//         devices.push({
//           id: key,
//           name: key.replace('_', ' '),
//           type,
//           status: mainState,
//           resStatus: resState,
//           isStateSynced,
//           isUpdating,
//           speed: speed
//         });
//       }
//     });

//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-3 md:p-4">
//         <div className="max-w-7xl mx-auto">
//           <div className="mb-6">
//             <button
//               onClick={() => setViewingRoom(null)}
//               className="flex items-center gap-2 text-slate-600 hover:text-slate-800 mb-4 transition-colors"
//             >
//               <ArrowLeft size={20} />
//               <span className="font-medium">Back to Rooms</span>
//             </button>
            
//             <h1 className="text-lg sm:text-lg md:text-lg   font-bold text-teal-600 mb-0.5">
//               {currentRoom.room_name}
//             </h1>
//             <p className="text-slate-600 text-xs sm:text-base md:text-sm">Board: {getBoardName(currentRoom.board_id)}</p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
//             <div className="bg-white rounded-xl p-5 shadow-sm">
//               <p className="text-slate-600 text-sm uppercase tracking-wide mb-1 font-medium">Total Devices</p>
//               <p className="text-3xl font-bold text-slate-800">{currentRoom.total_devices}</p>
//             </div>
//             <div className="bg-white rounded-xl p-5 shadow-sm">
//               <p className="text-green-600 text-sm uppercase tracking-wide mb-1 font-medium">Active Devices</p>
//               <p className="text-3xl font-bold text-green-700">{currentRoom.active_devices}</p>
//             </div>
//             <div className="bg-white rounded-xl p-5 shadow-sm">
//               <p className="text-blue-600 text-sm uppercase tracking-wide mb-1 font-medium">Inactive Devices</p>
//               <p className="text-3xl font-bold text-blue-700">{currentRoom.total_devices - currentRoom.active_devices}</p>
//             </div>
//           </div>

//           <div>
//             <h2 className="text-md font-semibold text-slate-800 mb-2">Device Controls</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {console.log("========",devices)}
//               {devices.map(device => {
//                 const isOn = device.status === device.resStatus;
//                 const showYellowIndicator = device.isUpdating;
//                 const isSpeedUpdating = speedUpdating === device.id;
                
//                 return (
//                   <div
//                     key={device.id}
//                     className={`bg-white rounded-2xl p-5 transition-all duration-300 ease-in-out relative overflow-hidden ${
//                       isOn ? 'shadow-lg shadow-teal-500/20' : 'shadow-md'
//                     } ${
//                       showYellowIndicator ? 'opacity-90' : 'hover:shadow-xl hover:-translate-y-1.5'
//                     }`}
//                   >
//                     {showYellowIndicator && (
//                       <div className="absolute top-0 left-0 right-0 h-1 w-full overflow-hidden">
//                         <div className="h-full w-full bg-yellow-400 animate-pulse" />
//                       </div>
//                     )}

//                     <div className="flex items-start justify-between mb-4">
//                       <div className="flex items-center gap-4">
//                         <div className={`p-3.5 rounded-lg transition-colors duration-300 ${
//                           isOn ? "bg-teal-100 text-teal-600" : "bg-slate-100 text-slate-400"
//                         }`}>
//                           {getDeviceIcon(device.type)}
//                         </div>
//                         <div>
//                           <h3 className="font-semibold text-slate-800 text-lg">{device.name}</h3>
//                           <p className="text-sm text-slate-500 capitalize">{device.type}</p>
//                         </div>
//                       </div>
//                       <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
//                         showYellowIndicator
//                           ? "bg-yellow-100 text-yellow-700"
//                           : isOn ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-600"
//                       }`}>
//                         {showYellowIndicator ? "SYNCING" : (isOn ? "ON" : "OFF")}
//                       </span>
//                     </div>

//                     <div className="mt-6 pt-5 border-t border-slate-100">
//                       <div className="flex items-center justify-between mb-5">
//                         <span className="text-sm font-medium text-slate-700">
//                           {showYellowIndicator ? "Syncing state..." : (isOn ? "Device is ON" : "Device is OFF")}
//                         </span>
                        
//                         <div className="relative w-12 h-7 flex items-center">
//                           {showYellowIndicator ? (
//                             <Loader2 size={24} className="animate-spin text-yellow-600" />
//                           ) : (
//                             <button
//                               onClick={() => toggleDevice(viewingRoom, device.id, device.status)}
//                               disabled={showYellowIndicator}
//                               role="switch"
//                               aria-checked={isOn}
//                               className={`relative inline-flex h-7 w-12 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent 
//                                         transition-colors duration-200 ease-in-out group
//                                         focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2
//                                         ${isOn ? 'bg-teal-600' : 'bg-slate-200'}
//                                         ${showYellowIndicator ? 'cursor-not-allowed opacity-50' : 'hover:bg-opacity-80'}`}
//                             >
//                               <span
//                                 aria-hidden="true"
//                                 className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow ring-0 
//                                           transition duration-200 ease-in-out
//                                           ${isOn ? 'translate-x-5' : 'translate-x-0'}`}
//                               />
//                             </button>
//                           )}
//                         </div>
//                       </div>

//                       {device.type === 'fan' && isOn && device.isStateSynced && (
//                         <div className="mt-5 pt-5 border-t border-slate-100">
//                           <div className="flex items-center justify-between mb-3">
//                             <h4 className="text-sm font-medium text-slate-700">Fan Speed</h4>
//                             {isSpeedUpdating && <Loader2 size={16} className="animate-spin text-teal-600" />}
//                           </div>
//                           <div className="grid grid-cols-3 gap-2">
//                             <button
//                               onClick={() => toggleFanSpeed(viewingRoom, device.id, 1)}
//                               disabled={isSpeedUpdating || showYellowIndicator}
//                               className={`w-full py-2.5 rounded-lg font-semibold text-sm transition-all ${
//                                 device.speed === 1
//                                   ? 'bg-teal-600 text-white shadow-md'
//                                   : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
//                               } disabled:opacity-50 disabled:cursor-not-allowed`}
//                             >
//                               Slow
//                             </button>
                            
//                             <button
//                               onClick={() => toggleFanSpeed(viewingRoom, device.id, 2)}
//                               disabled={isSpeedUpdating || showYellowIndicator}
//                               className={`w-full py-2.5 rounded-lg font-semibold text-sm transition-all ${
//                                 device.speed === 2
//                                   ? 'bg-teal-600 text-white shadow-md'
//                                   : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
//                               } disabled:opacity-50 disabled:cursor-not-allowed`}
//                             >
//                               Medium
//                             </button>
                            
//                             <button
//                               onClick={() => toggleFanSpeed(viewingRoom, device.id, 3)}
//                               disabled={isSpeedUpdating || showYellowIndicator}
//                               className={`w-full py-2.5 rounded-lg font-semibold text-sm transition-all ${
//                                 device.speed === 3
//                                   ? 'bg-teal-600 text-white shadow-md'
//                                   : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
//                               } disabled:opacity-50 disabled:cursor-not-allowed`}
//                             >
//                               High
//                             </button>
//                           </div>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // ROOMS LIST VIEW
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-3 md:p-4">
//       <div className="max-w-7xl mx-auto space-y-6">
//         {error && (
//           <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg flex items-center gap-3">
//             <AlertCircle className="text-red-500" size={20} />
//             <p className="text-red-700 flex-1">{error}</p>
//             <button onClick={() => dispatch(clearError())} className="text-red-500 hover:text-red-700">
//               <X size={20} />
//             </button>
//           </div>
//         )}

//         {success && (
//           <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-lg flex items-center gap-3">
//             <CheckCircle className="text-green-500" size={20} />
//             <p className="text-green-700 flex-1">Operation completed successfully!</p>
//             <button onClick={() => dispatch(clearSuccess())} className="text-green-500 hover:text-green-700">
//               <X size={20} />
//             </button>
//           </div>
//         )}

//         {/* <div className="flex flex-col-2 sm:flex-row justify-between items-start sm:items-center gap-4">
//           <div>
//             <h1 className="text-lg md:text-lg font-bold text-slate-800 mb-2">Room Management</h1>
//             <p className="text-slate-600 text-md">Track and control devices by room</p>
//           </div>
//           <div>
//           <button
//             onClick={() => setShowModal(true)}
//             disabled={loading}
//             className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white px-3 py-3 rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-teal-500/50 hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed">
//             {loading ? <Loader2 size={20} className="animate-spin" /> : <Plus size={20} />}
//             <span className="font-semibold">Add New Room</span>
//           </button>
//           </div>
//         </div> */}

//         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//   <div>
//     <h1 className="text-lg sm:text-lg md:text-lg   font-bold text-teal-600 mb-0.5">
//       Room Management
//     </h1>
//     <p className="text-slate-600 text-xs sm:text-base md:text-sm">
//       Track and control devices by room
//     </p>
//   </div>
//   <div>
//     <button
//       onClick={() => setShowModal(true)}
//       disabled={loading}
//       className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white 
//                  px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-xl flex items-center gap-2 transition-all 
//                  shadow-lg shadow-teal-500/50 hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed 
//                  text-sm sm:text-base md:text-lg font-semibold"
//     >
//       {loading ? <Loader2 size={20} className="animate-spin" /> : <Plus size={20} />}
//       <span>Add New Room</span>
//     </button>
//   </div>
// </div>


//         {loading && rooms.length === 0 ? (
//           <div className="flex justify-center items-center py-20">
//             <Loader2 className="animate-spin text-teal-600" size={48} />
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//             {rooms.length === 0 ? (
//               <div className="col-span-full bg-white rounded-2xl p-12 text-center shadow-sm">
//                 <div className="max-w-md mx-auto">
//                   <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                     <Plus size={40} className="text-slate-400" />
//                   </div>
//                   <h3 className="text-xl font-semibold text-slate-800 mb-2">No rooms yet</h3>
//                   <p className="text-slate-600 mb-6">Get started by creating your first room</p>
//                   <button
//                     onClick={() => setShowModal(true)}
//                     className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-3 rounded-xl inline-flex items-center gap-2 transition-colors">
//                     <Plus size={20} />
//                     Create Room
//                   </button>
//                 </div>
//               </div>
//             ) : (
//               rooms.map(room => (
//                 <div key={room.roomId} className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-lg transition-all">
//                   <div className="flex justify-between items-start mb-4">
//                     <div className="flex items-center gap-4">
//                       <div className="bg-gradient-to-br from-purple-100 to-purple-200 p-3 rounded-xl">
//                         <Layers className="text-purple-600" size={24} />
//                       </div>
//                       <div>
//                         <h2 className="text-sm font-semibold text-slate-800">{room.room_name}</h2>
//                         <p className="text-slate-600 text-sm">{room.total_devices} devices</p>
//                       </div>
//                     </div>
//                     <div className="flex gap-2">
//                       <button
//                         onClick={() => handleEdit(room)}
//                         disabled={loading}
//                         className="p-2 text-teal-600 hover:bg-teal-50 rounded-lg transition-colors disabled:opacity-50"
//                         title="Edit Room">
//                         <Edit2 size={18} />
//                       </button>
//                       <button
//                         onClick={() => deleteRoomHandler(room.roomId)}
//                         disabled={loading}
//                         className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
//                         title="Delete Room">
//                         <Trash2 size={18} />
//                       </button>
//                     </div>
//                   </div>

//                   <div className="space-y-4">
//                     <div className="bg-slate-50 p-4 rounded-xl">
//                       <p className="text-slate-800 text-sm font-semibold uppercase tracking-wide mb-1">Connected Board</p>
//                       <p className="text-xs font-semibold text-slate-600">{getBoardName(room.board_id)}</p>
//                     </div>

//                     <div className="bg-blue-50 p-4 rounded-xl">
//                       <p className="text-sm  uppercase font-semibold text-blue-700 mb-1">Active Devices</p>
//                       <p className="text-xs tracking-wide  font-medium">{room.active_devices} / {room.total_devices}</p>
//                     </div>
//                   </div>

//                   <button
//                     onClick={() => setViewingRoom(room.roomId)}
//                     className="w-full mt-6 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white py-3 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-teal-500/30 hover:shadow-xl font-semibold">
//                     Control Devices
//                     <span>→</span>
//                   </button>
//                 </div>
//               ))
//             )}
//           </div>
//         )}

//         {showModal && (
//           <div className="fixed inset-0 bg-black/40 bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
//             <div className="bg-white rounded-xl w-full max-w-xl max-h-[90vh] overflow-hidden shadow-2xl">
//               <div className="bg-gradient-to-r from-slate-700 to-slate-900 text-white px-6 py-5 flex justify-between items-center">
//                 <h2 className="text-2xl font-bold">{editMode ? 'Edit Room' : 'Add New Room'}</h2>
//                 <button onClick={handleClose} className="hover:bg-white/20 p-2 rounded-lg transition-colors">
//                   <X size={24} />
//                 </button>
//               </div>

//               <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
//                 <div className="space-y-5">
//                   <div>
//                     <label className="block text-slate-700 font-semibold mb-2">
//                       Room Name <span className="text-red-500">*</span>
//                     </label>
//                     <input
//                       type="text"
//                       value={roomName}
//                       onChange={(e) => setRoomName(e.target.value)}
//                       placeholder="e.g., Living Room"
//                       className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all ${
//                         errors.roomName ? 'border-red-500' : 'border-slate-200'
//                       }`}
//                     />
//                     {errors.roomName && <p className="text-red-500 text-sm mt-1">{errors.roomName}</p>}
//                   </div>

//                   <div>
//                     <label className="block text-slate-700 font-semibold mb-2">
//                       Select Board <span className="text-red-500">*</span>
//                     </label>
//                     <select
//                       value={selectedBoardId}
//                       onChange={(e) => {
//                         setSelectedBoardId(e.target.value);
//                         setSelectedDevices({ fans: [], switches: [] });
//                       }}
//                       disabled={editMode}
//                       className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all ${
//                         errors.board ? 'border-red-500' : 'border-slate-200'
//                       } ${editMode ? 'bg-slate-100 cursor-not-allowed' : ''}`}>
//                       <option value="">Choose a board</option>
//                       {boards.map(board => (
//                         <option key={board.boardId} value={board.boardId}>
//                           {board.board_name} - {board.num_switches} Switches, {board.num_fans} Fans
//                         </option>
//                       ))}
//                     </select>
//                     {errors.board && <p className="text-red-500 text-sm mt-1">{errors.board}</p>}
//                   </div>

//                   {selectedBoardId && !editMode && (
//                     <div className="border-t-2 border-slate-200 pt-5">
//                       <div className="flex justify-between items-center mb-4">
//                         <label className="block text-slate-700 font-semibold">
//                           Select Devices <span className="text-red-500">*</span>
//                         </label>
//                         <span className="text-sm text-slate-600 bg-slate-100 px-3 py-1 rounded-full font-medium">
//                           {(selectedDevices.fans?.length || 0) + (selectedDevices.switches?.length || 0)} selected
//                         </span>
//                       </div>

//                       <div className="relative mb-4">
//                         <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
//                         <input
//                           type="text"
//                           value={searchQuery}
//                           onChange={(e) => setSearchQuery(e.target.value)}
//                           placeholder="Search devices..."
//                           className="w-full pl-10 pr-4 py-2.5 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
//                         />
//                       </div>

//                       <div className="max-h-64 overflow-y-auto bg-slate-50 rounded-xl p-3 space-y-2">
//                         {getAvailableDevices().map(device => (
//                           <div
//                             key={device.id}
//                             onClick={() => toggleDeviceSelection(device)}
//                             className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all ${
//                               isDeviceSelected(device)
//                                 ? 'bg-teal-100 border-2 border-teal-500'
//                                 : 'bg-white border-2 border-slate-200 hover:border-teal-300'
//                             }`}>
//                             <div className="flex items-center gap-3">
//                               <div className={`p-2 rounded-lg ${
//                                 isDeviceSelected(device)
//                                   ? 'bg-teal-200 text-teal-700'
//                                   : 'bg-slate-200 text-slate-600'
//                               }`}>
//                                 {getDeviceIcon(device.type)}
//                               </div>
//                               <div>
//                                 <p className="font-semibold text-slate-800">{device.name}</p>
//                                 <p className="text-xs text-slate-500 capitalize">{device.type}</p>
//                               </div>
//                             </div>
//                             <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
//                               isDeviceSelected(device)
//                                 ? 'bg-teal-500 border-teal-500'
//                                 : 'border-slate-300'
//                             }`}>
//                               {isDeviceSelected(device) && (
//                                 <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
//                                 </svg>
//                               )}
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                       {errors.devices && <p className="text-red-500 text-sm mt-2">{errors.devices}</p>}
//                     </div>
//                   )}

//                   {editMode && (
//                     <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg">
//                       <p className="text-blue-800 text-sm">
//                         <strong>Note:</strong> Device selection cannot be changed when editing. Only the room name can be updated.
//                       </p>
//                     </div>
//                   )}
//                 </div>
//               </div>

//               <div className="bg-slate-50 px-6 py-4 flex flex-col-reverse sm:flex-row gap-3 sm:justify-end border-t-2 border-slate-200">
//                 <button
//                   onClick={handleClose}
//                   disabled={loading}
//                   className="px-6 py-3 border-2 border-slate-300 text-slate-700 rounded-xl hover:bg-slate-100 transition-colors font-semibold disabled:opacity-50">
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleSave}
//                   disabled={loading}
//                   className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white px-6 py-3 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-teal-500/30 font-semibold hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed">
//                   {loading ? (
//                     <Loader2 size={20} className="animate-spin" />
//                   ) : editMode ? (
//                     <Edit2 size={20} />
//                   ) : (
//                     <Plus size={20} />
//                   )}
//                   {editMode ? 'Update Room' : 'Save Room'}
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Rooms;




import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
// import { initializeApp } from 'firebase/app';
// import { getDatabase, ref, onValue, off } from 'firebase/database';
import { Layers, Edit2, Trash2, Plus, X, Search, Lightbulb, Fan, Wind, ArrowLeft, Loader2, AlertCircle, CheckCircle } from 'lucide-react';
import {
  fetchRooms,
  fetchRoomById,
  createRoom,
  updateRoom,
  deleteRoom,
  updateDeviceState,
  fetchBoards,
  clearError,
  clearSuccess,
  clearCurrentRoom,
  toggleDeviceInRoomOptimistic,
  clearDeviceUpdating
} from "../components/redux/slices/roomSlice";

import { database } from "../config/firebase";  // <-- use module
import { ref, onValue, off } from "firebase/database";


const Rooms = () => {
  const dispatch = useDispatch();
  
  // Redux state
  const { rooms, boards, currentRoom, loading, error, success, deviceUpdating } = useSelector(state => state.rooms);
  
  // Local UI state
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentRoomId, setCurrentRoomId] = useState(null);
  const [roomName, setRoomName] = useState('');
  const [selectedBoardId, setSelectedBoardId] = useState('');
  const [selectedDevices, setSelectedDevices] = useState({ fans: [], switches: [] });
  const [searchQuery, setSearchQuery] = useState('');
  const [errors, setErrors] = useState({});
  const [viewingRoom, setViewingRoom] = useState(null);
  const [speedUpdating, setSpeedUpdating] = useState(null);

  // Firebase real-time state
  const [firebaseDeviceStates, setFirebaseDeviceStates] = useState({});
  const [connectionStatus, setConnectionStatus] = useState('connecting');
  
  // Your actual Firebase path values
  // const userId = "TFi4sVt5vLYYQli7uMSCLsAKGH43";
  const userId = localStorage.getItem("userId");


  // Fetch boards and rooms on mount
  useEffect(() => {
    dispatch(fetchBoards());
    dispatch(fetchRooms());
  }, [dispatch]);

  // Auto-clear success message
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        dispatch(clearSuccess());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success, dispatch]);

  // Auto-clear error message
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        dispatch(clearError());
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, dispatch]);

  // Fetch current room when viewing
  useEffect(() => {
    if (viewingRoom) {
      dispatch(fetchRoomById(viewingRoom));
      return () => {
        dispatch(clearCurrentRoom());
      };
    }
  }, [viewingRoom, dispatch]);

  // 🔥 Firebase Real-time Listeners for Device States
  useEffect(() => {
    if (!viewingRoom || !currentRoom) return;

    const listeners = [];
    const roomId = viewingRoom;
    const basePath = `users/${userId}/rooms/${roomId}/selected_devices`;

    try {
      setConnectionStatus('connected');

      // Get all device names from currentRoom
      const deviceNames = Object.keys(currentRoom.selected_devices || {}).filter(
        key => !key.includes('_Res')
      );

      deviceNames.forEach(deviceName => {
        const devicePath = `${basePath}/${deviceName}`;
        const deviceResPath = `${basePath}/${deviceName}_Res`;

        // Listen to main device state
        const deviceRef = ref(database, devicePath);
        const deviceListener = onValue(
          deviceRef,
          (snapshot) => {
            if (snapshot.exists()) {
              const value = snapshot.val();
              setFirebaseDeviceStates(prev => ({
                ...prev,
                [deviceName]: value
              }));
              console.log(`${deviceName} updated:`, value);
            }
          },
          (error) => {
            console.error(`Error listening to ${deviceName}:`, error);
            setConnectionStatus('error');
          }
        );
        listeners.push({ ref: deviceRef, listener: deviceListener });

        // Listen to response state
        const deviceResRef = ref(database, deviceResPath);
        const deviceResListener = onValue(
          deviceResRef,
          (snapshot) => {
            if (snapshot.exists()) {
              const value = snapshot.val();
              setFirebaseDeviceStates(prev => ({
                ...prev,
                [`${deviceName}_Res`]: value
              }));
              console.log(`${deviceName}_Res updated:`, value);
            }
          },
          (error) => {
            console.error(`Error listening to ${deviceName}_Res:`, error);
            setConnectionStatus('error');
          }
        );
        listeners.push({ ref: deviceResRef, listener: deviceResListener });
      });

    } catch (err) {
      console.error('Firebase initialization error:', err);
      setConnectionStatus('error');
    }

    // Cleanup listeners on unmount or room change
    return () => {
      listeners.forEach(({ ref: deviceRef }) => {
        try {
          off(deviceRef);
        } catch (err) {
          console.error('Error cleaning up listener:', err);
        }
      });
      setFirebaseDeviceStates({});
    };
  }, [viewingRoom, currentRoom, userId]);

  // Auto-clear updating status when states match
  useEffect(() => {
    if (currentRoom && currentRoom.selected_devices) {
      Object.keys(deviceUpdating).forEach(deviceName => {
        const resDeviceName = `${deviceName}_Res`;
        const mainState = firebaseDeviceStates[deviceName] ?? currentRoom.selected_devices[deviceName];
        const resState = firebaseDeviceStates[resDeviceName] ?? currentRoom.selected_devices[resDeviceName];
        
        // If states match, clear the updating status
        if (mainState === resState) {
          dispatch(clearDeviceUpdating({ deviceName }));
        }
      });
    }
  }, [firebaseDeviceStates, currentRoom, deviceUpdating, dispatch]);

  const getAvailableDevices = () => {
    if (!selectedBoardId) return [];
    
    const board = boards.find(b => b.boardId === selectedBoardId);
    if (!board) return [];

    const devices = [];
    
    // Add fans
    for (let i = 1; i <= board.num_fans; i++) {
      devices.push({ 
        id: `Fan_${i}`, 
        name: `Fan ${i}`, 
        type: 'fan',
        category: 'fans'
      });
    }
    
    // Add switches
    for (let i = 1; i <= board.num_switches; i++) {
      devices.push({ 
        id: `Switch_${i}`, 
        name: `Switch ${i}`, 
        type: 'switch',
        category: 'switches'
      });
    }

    return devices.filter(device => 
      device.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const toggleDeviceSelection = (device) => {
    const category = device.category;
    const exists = selectedDevices[category]?.includes(device.id);
    
    if (exists) {
      setSelectedDevices({
        ...selectedDevices,
        [category]: selectedDevices[category].filter(id => id !== device.id)
      });
    } else {
      setSelectedDevices({
        ...selectedDevices,
        [category]: [...(selectedDevices[category] || []), device.id]
      });
    }
  };

  const isDeviceSelected = (device) => {
    return selectedDevices[device.category]?.includes(device.id) || false;
  };

  const validateForm = () => {
    const newErrors = {};
    if (!roomName.trim()) newErrors.roomName = 'Room name is required';
    if (!selectedBoardId) newErrors.board = 'Please select a board';
    
    if (!editMode) {
      const totalSelected = (selectedDevices.fans?.length || 0) + (selectedDevices.switches?.length || 0);
      if (totalSelected === 0) newErrors.devices = 'Please select at least one device';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    try {
      if (editMode) {
        await dispatch(updateRoom({ 
          id: currentRoomId, 
          data: { room_name: roomName } 
        })).unwrap();
      } else {
        const roomData = {
          room_name: roomName,
          board_id: selectedBoardId,
          selected_devices: {
            fans: selectedDevices.fans || [],
            switches: selectedDevices.switches || []
          }
        };
        await dispatch(createRoom(roomData)).unwrap();
      }
      
      dispatch(fetchRooms());
      handleClose();
    } catch (err) {
      console.error('Failed to save room:', err);
    }
  };

  const handleClose = () => {
    setShowModal(false);
    setEditMode(false);
    setCurrentRoomId(null);
    setRoomName('');
    setSelectedBoardId('');
    setSelectedDevices({ fans: [], switches: [] });
    setSearchQuery('');
    setErrors({});
  };

  const handleEdit = async (room) => {
    try {
      const roomDetails = await dispatch(fetchRoomById(room.roomId)).unwrap();
      
      setEditMode(true);
      setCurrentRoomId(room.roomId);
      setRoomName(roomDetails.room_name);
      setSelectedBoardId(roomDetails.board_id);
      
      const devices = { fans: [], switches: [] };
      Object.keys(roomDetails.selected_devices).forEach(key => {
        if (key.startsWith('Fan_') && !key.includes('_Res')) {
          devices.fans.push(key);
        } else if (key.startsWith('Switch_') && !key.includes('_Res')) {
          devices.switches.push(key);
        }
      });
      setSelectedDevices(devices);
      setShowModal(true);
    } catch (err) {
      console.error('Failed to load room for editing:', err);
    }
  };

  const deleteRoomHandler = async (roomId) => {
    if (window.confirm('Are you sure you want to delete this room?')) {
      try {
        await dispatch(deleteRoom(roomId)).unwrap();
      } catch (err) {
        console.error('Failed to delete room:', err);
      }
    }
  };

  const toggleDevice = async (roomId, deviceName, currentState) => {
    try {
      const newState = currentState === 1 ? 0 : 1;

      dispatch(toggleDeviceInRoomOptimistic({ roomId, deviceName, newState }));

      await dispatch(updateDeviceState({
        roomId,
        deviceName,
        state: newState
      })).unwrap();

    } catch (err) {
      console.error("Failed to toggle device:", err);
    }
  };

  const toggleFanSpeed = async (roomId, deviceId, newSpeed) => {
    setSpeedUpdating(deviceId);

    try {
      await dispatch(updateDeviceState({
        roomId,
        deviceName: `${deviceId}_Res`,
        state: newSpeed
      })).unwrap();

    } catch (err) {
      console.error("Failed to update fan speed:", err);
    } finally {
      setTimeout(() => setSpeedUpdating(null), 500);
    }
  };

  const getDeviceIcon = (type) => {
    switch (type) {
      case 'fan':
        return <Fan size={20} />;
      case 'curtain':
        return <Wind size={20} />;
      default:
        return <Lightbulb size={20} />;
    }
  };

  const getBoardName = (boardId) => {
    const board = boards.find(b => b.boardId === boardId);
    return board ? board.board_name : boardId;
  };

  // ROOM DETAILS VIEW
  if (viewingRoom) {
    if (loading || !currentRoom) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
          <Loader2 className="animate-spin text-teal-600" size={48} />
        </div>
      );
    }

    const devices = [];
    Object.keys(currentRoom.selected_devices).forEach(key => {
      if (!key.includes('_Res')) {
        const type = key.startsWith('Fan_') ? 'fan' : 'switch';
        
        // Use Firebase real-time state if available, otherwise use Redux state
        const mainState = firebaseDeviceStates[key] ?? currentRoom.selected_devices[key];
        const resKey = `${key}_Res`;
        const resState = firebaseDeviceStates[resKey] ?? currentRoom.selected_devices[resKey];
        
        const isStateSynced = mainState === resState;
        const isUpdating = !isStateSynced;
        
        let speed = 0;
        if (type === 'fan' && mainState === 1 && isStateSynced) {
          speed = resState || 1;
        }

        devices.push({
          id: key,
          name: key.replace('_', ' '),
          type,
          status: mainState,
          resStatus: resState,
          isStateSynced,
          isUpdating,
          speed: speed
        });
      }
    });

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-3 md:p-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <button
              onClick={() => setViewingRoom(null)}
              className="flex items-center gap-2 text-slate-600 hover:text-slate-800 mb-4 transition-colors"
            >
              <ArrowLeft size={20} />
              <span className="font-medium">Back to Rooms</span>
            </button>
            
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-lg sm:text-lg md:text-lg font-bold text-teal-600 mb-0.5">
                  {currentRoom.room_name}
                </h1>
                <p className="text-slate-600 text-xs sm:text-base md:text-sm">
                  Board: {getBoardName(currentRoom.board_id)}
                </p>
              </div>
              
              {/* Connection Status Indicator */}
              <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold ${
                connectionStatus === 'connected'
                  ? 'bg-green-100 text-green-700'
                  : connectionStatus === 'error'
                  ? 'bg-red-100 text-red-700'
                  : 'bg-yellow-100 text-yellow-700'
              }`}>
                <div className={`w-2 h-2 rounded-full ${
                  connectionStatus === 'connected' 
                    ? 'bg-green-500 animate-pulse' 
                    : connectionStatus === 'error' 
                    ? 'bg-red-500' 
                    : 'bg-yellow-500 animate-pulse'
                }`} />
                <span>
                  {connectionStatus === 'connected' 
                    ? 'Live' 
                    : connectionStatus === 'error' 
                    ? 'Error' 
                    : 'Connecting'}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white rounded-xl p-5 shadow-sm">
              <p className="text-slate-600 text-sm uppercase tracking-wide mb-1 font-medium">Total Devices</p>
              <p className="text-3xl font-bold text-slate-800">{currentRoom.total_devices}</p>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-sm">
              <p className="text-green-600 text-sm uppercase tracking-wide mb-1 font-medium">Active Devices</p>
              <p className="text-3xl font-bold text-green-700">{currentRoom.active_devices}</p>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-sm">
              <p className="text-blue-600 text-sm uppercase tracking-wide mb-1 font-medium">Inactive Devices</p>
              <p className="text-3xl font-bold text-blue-700">{currentRoom.total_devices - currentRoom.active_devices}</p>
            </div>
          </div>

          <div>
            <h2 className="text-md font-semibold text-slate-800 mb-2">Device Controls</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {devices.map(device => {
                const isOn = [1, 2, 3].includes(device.status);
                const showYellowIndicator = device.isUpdating;
                const isSpeedUpdating = speedUpdating === device.id;
                
                return (
                  <div
                    key={device.id}
                    className={`bg-white rounded-2xl p-5 transition-all duration-300 ease-in-out relative overflow-hidden ${
                      isOn ? 'shadow-lg shadow-teal-500/20' : 'shadow-md'
                    } ${
                      showYellowIndicator ? 'opacity-90' : 'hover:shadow-xl hover:-translate-y-1.5'
                    }`}
                  >
                    {showYellowIndicator && (
                      <div className="absolute top-0 left-0 right-0 h-1 w-full overflow-hidden">
                        <div className="h-full w-full bg-yellow-400 animate-pulse" />
                      </div>
                    )}

                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className={`p-3.5 rounded-lg transition-colors duration-300 ${
                          isOn ? "bg-teal-100 text-teal-600" : "bg-slate-100 text-slate-400"
                        }`}>
                          {getDeviceIcon(device.type)}
                        </div>
                        <div>
                          <h3 className="font-semibold text-slate-800 text-lg">{device.name}</h3>
                          <p className="text-sm text-slate-500 capitalize">{device.type}</p>
                        </div>
                      </div>
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                        showYellowIndicator
                          ? "bg-yellow-100 text-yellow-700"
                          : isOn ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-600"
                      }`}>
                        {showYellowIndicator ? "SYNCING" : (isOn ? "ON" : "OFF")}
                      </span>
                    </div>

                    {/* Real-time State Display */}
                    {/* <div className="mb-4 grid grid-cols-2 gap-2 text-xs">
                      <div className="bg-blue-50 rounded p-2">
                        <p className="text-blue-600 font-semibold mb-1">Main State</p>
                        <p className="text-blue-900 font-bold text-lg">{device.status}</p>
                      </div>
                      <div className="bg-purple-50 rounded p-2">
                        <p className="text-purple-600 font-semibold mb-1">Response</p>
                        <p className="text-purple-900 font-bold text-lg">{device.resStatus}</p>
                      </div>
                    </div> */}

                    <div className="mt-6 pt-5 border-t border-slate-100">
                      <div className="flex items-center justify-between mb-5">
                        <span className="text-sm font-medium text-slate-700">
                          {showYellowIndicator ? "Syncing state..." : (isOn ? "Device is ON" : "Device is OFF")}
                        </span>
                        
                        <div className="relative w-12 h-7 flex items-center">
                          {showYellowIndicator ? (
                            <Loader2 size={24} className="animate-spin text-yellow-600" />
                          ) : (
                            <button
                              onClick={() => toggleDevice(viewingRoom, device.id, device.status)}
                              disabled={showYellowIndicator}
                              role="switch"
                              aria-checked={isOn}
                              className={`relative inline-flex h-7 w-12 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent 
                                        transition-colors duration-200 ease-in-out group
                                        focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2
                                        ${isOn ? 'bg-teal-600' : 'bg-slate-200'}
                                        ${showYellowIndicator ? 'cursor-not-allowed opacity-50' : 'hover:bg-opacity-80'}`}
                            >
                              <span
                                aria-hidden="true"
                                className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow ring-0 
                                          transition duration-200 ease-in-out
                                          ${isOn ? 'translate-x-5' : 'translate-x-0'}`}
                              />
                            </button>
                          )}
                        </div>
                      </div>

                      {device.type === 'fan' && isOn && device.isStateSynced && (
                        <div className="mt-5 pt-5 border-t border-slate-100">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="text-sm font-medium text-slate-700">Fan Speed</h4>
                            {isSpeedUpdating && <Loader2 size={16} className="animate-spin text-teal-600" />}
                          </div>
                          <div className="grid grid-cols-3 gap-2">
                            <button
                              onClick={() => toggleFanSpeed(viewingRoom, device.id, 1)}
                              disabled={isSpeedUpdating || showYellowIndicator}
                              className={`w-full py-2.5 rounded-lg font-semibold text-sm transition-all ${
                                device.status === 1
                                  ? 'bg-teal-600 text-white shadow-md'
                                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                              } disabled:opacity-50 disabled:cursor-not-allowed`}
                            >
                              Slow
                            </button>
                            
                            <button
                              onClick={() => toggleFanSpeed(viewingRoom, device.id, 2)}
                              disabled={isSpeedUpdating || showYellowIndicator}
                              className={`w-full py-2.5 rounded-lg font-semibold text-sm transition-all ${
                                device.status === 2
                                  ? 'bg-teal-600 text-white shadow-md'
                                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                              } disabled:opacity-50 disabled:cursor-not-allowed`}
                            >
                              Medium
                            </button>
                            
                            <button
                              onClick={() => toggleFanSpeed(viewingRoom, device.id, 3)}
                              disabled={isSpeedUpdating || showYellowIndicator}
                              className={`w-full py-2.5 rounded-lg font-semibold text-sm transition-all ${
                                device.status === 3
                                  ? 'bg-teal-600 text-white shadow-md'
                                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                              } disabled:opacity-50 disabled:cursor-not-allowed`}
                            >
                              High
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ROOMS LIST VIEW
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-3 md:p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg flex items-center gap-3">
            <AlertCircle className="text-red-500" size={20} />
            <p className="text-red-700 flex-1">{error}</p>
            <button onClick={() => dispatch(clearError())} className="text-red-500 hover:text-red-700">
              <X size={20} />
            </button>
          </div>
        )}

        {success && (
          <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-lg flex items-center gap-3">
            <CheckCircle className="text-green-500" size={20} />
            <p className="text-green-700 flex-1">Operation completed successfully!</p>
            <button onClick={() => dispatch(clearSuccess())} className="text-green-500 hover:text-green-700">
              <X size={20} />
            </button>
          </div>
        )}

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-lg sm:text-lg md:text-lg font-bold text-teal-600 mb-0.5">
              Room Management
            </h1>
            <p className="text-slate-600 text-xs sm:text-base md:text-sm">
              Track and control devices by room
            </p>
          </div>
          <div>
            <button
              onClick={() => setShowModal(true)}
              disabled={loading}
              className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white 
                         px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-xl flex items-center gap-2 transition-all 
                         shadow-lg shadow-teal-500/50 hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed 
                         text-sm sm:text-base md:text-lg font-semibold"
            >
              {loading ? <Loader2 size={20} className="animate-spin" /> : <Plus size={20} />}
              <span>Add New Room</span>
            </button>
          </div>
        </div>

        {loading && rooms.length === 0 ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="animate-spin text-teal-600" size={48} />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {rooms.length === 0 ? (
              <div className="col-span-full bg-white rounded-2xl p-12 text-center shadow-sm">
                <div className="max-w-md mx-auto">
                  <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Plus size={40} className="text-slate-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">No rooms yet</h3>
                  <p className="text-slate-600 mb-6">Get started by creating your first room</p>
                  <button
                    onClick={() => setShowModal(true)}
                    className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-3 rounded-xl inline-flex items-center gap-2 transition-colors">
                    <Plus size={20} />
                    Create Room
                  </button>
                </div>
              </div>
            ) : (
              rooms.map(room => (
                <div key={room.roomId} className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-lg transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-4">
                      <div className="bg-gradient-to-br from-purple-100 to-purple-200 p-3 rounded-xl">
                        <Layers className="text-purple-600" size={24} />
                      </div>
                      <div>
                        <h2 className="text-sm font-semibold text-slate-800">{room.room_name}</h2>
                        <p className="text-slate-600 text-sm">{room.total_devices} devices</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(room)}
                        disabled={loading}
                        className="p-2 text-teal-600 hover:bg-teal-50 rounded-lg transition-colors disabled:opacity-50"
                        title="Edit Room">
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => deleteRoomHandler(room.roomId)}
                        disabled={loading}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                        title="Delete Room">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-slate-50 p-4 rounded-xl">
                      <p className="text-slate-800 text-sm font-semibold uppercase tracking-wide mb-1">Connected Board</p>
                      <p className="text-xs font-semibold text-slate-600">{getBoardName(room.board_id)}</p>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-xl">
                      <p className="text-sm uppercase font-semibold text-blue-700 mb-1">Active Devices</p>
                      <p className="text-xs tracking-wide font-medium">{room.active_devices} / {room.total_devices}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => setViewingRoom(room.roomId)}
                    className="w-full mt-6 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white py-3 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-teal-500/30 hover:shadow-xl font-semibold">
                    Control Devices
                    <span>→</span>
                  </button>
                </div>
              ))
            )}
          </div>
        )}

        {showModal && (
          <div className="fixed inset-0 bg-black/40 bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
            <div className="bg-white rounded-xl w-full max-w-xl max-h-[90vh] overflow-hidden shadow-2xl">
              <div className="bg-gradient-to-r from-slate-700 to-slate-900 text-white px-6 py-5 flex justify-between items-center">
                <h2 className="text-2xl font-bold">{editMode ? 'Edit Room' : 'Add New Room'}</h2>
                <button onClick={handleClose} className="hover:bg-white/20 p-2 rounded-lg transition-colors">
                  <X size={24} />
                </button>
              </div>

              <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
                <div className="space-y-5">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-2">
                      Room Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={roomName}
                      onChange={(e) => setRoomName(e.target.value)}
                      placeholder="e.g., Living Room"
                      className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all ${
                        errors.roomName ? 'border-red-500' : 'border-slate-200'
                      }`}
                    />
                    {errors.roomName && <p className="text-red-500 text-sm mt-1">{errors.roomName}</p>}
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-2">
                      Select Board <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={selectedBoardId}
                      onChange={(e) => {
                        setSelectedBoardId(e.target.value);
                        setSelectedDevices({ fans: [], switches: [] });
                      }}
                      disabled={editMode}
                      className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all ${
                        errors.board ? 'border-red-500' : 'border-slate-200'
                      } ${editMode ? 'bg-slate-100 cursor-not-allowed' : ''}`}>
                      <option value="">Choose a board</option>
                      {boards.map(board => (
                        <option key={board.boardId} value={board.boardId}>
                          {board.board_name} - {board.num_switches} Switches, {board.num_fans} Fans
                        </option>
                      ))}
                    </select>
                    {errors.board && <p className="text-red-500 text-sm mt-1">{errors.board}</p>}
                  </div>

                  {selectedBoardId && !editMode && (
                    <div className="border-t-2 border-slate-200 pt-5">
                      <div className="flex justify-between items-center mb-4">
                        <label className="block text-slate-700 font-semibold">
                          Select Devices <span className="text-red-500">*</span>
                        </label>
                        <span className="text-sm text-slate-600 bg-slate-100 px-3 py-1 rounded-full font-medium">
                          {(selectedDevices.fans?.length || 0) + (selectedDevices.switches?.length || 0)} selected
                        </span>
                      </div>

                      <div className="relative mb-4">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                        <input
                          type="text"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder="Search devices..."
                          className="w-full pl-10 pr-4 py-2.5 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                      </div>

                      <div className="max-h-64 overflow-y-auto bg-slate-50 rounded-xl p-3 space-y-2">
                        {getAvailableDevices().map(device => (
                          <div
                            key={device.id}
                            onClick={() => toggleDeviceSelection(device)}
                            className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all ${
                              isDeviceSelected(device)
                                ? 'bg-teal-100 border-2 border-teal-500'
                                : 'bg-white border-2 border-slate-200 hover:border-teal-300'
                            }`}>
                            <div className="flex items-center gap-3">
                              <div className={`p-2 rounded-lg ${
                                isDeviceSelected(device)
                                  ? 'bg-teal-200 text-teal-700'
                                  : 'bg-slate-200 text-slate-600'
                              }`}>
                                {getDeviceIcon(device.type)}
                              </div>
                              <div>
                                <p className="font-semibold text-slate-800">{device.name}</p>
                                <p className="text-xs text-slate-500 capitalize">{device.type}</p>
                              </div>
                            </div>
                            <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                              isDeviceSelected(device)
                                ? 'bg-teal-500 border-teal-500'
                                : 'border-slate-300'
                            }`}>
                              {isDeviceSelected(device) && (
                                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                      {errors.devices && <p className="text-red-500 text-sm mt-2">{errors.devices}</p>}
                    </div>
                  )}

                  {editMode && (
                    <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg">
                      <p className="text-blue-800 text-sm">
                        <strong>Note:</strong> Device selection cannot be changed when editing. Only the room name can be updated.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-slate-50 px-6 py-4 flex flex-col-reverse sm:flex-row gap-3 sm:justify-end border-t-2 border-slate-200">
                <button
                  onClick={handleClose}
                  disabled={loading}
                  className="px-6 py-3 border-2 border-slate-300 text-slate-700 rounded-xl hover:bg-slate-100 transition-colors font-semibold disabled:opacity-50">
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={loading}
                  className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white px-6 py-3 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-teal-500/30 font-semibold hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed">
                  {loading ? (
                    <Loader2 size={20} className="animate-spin" />
                  ) : editMode ? (
                    <Edit2 size={20} />
                  ) : (
                    <Plus size={20} />
                  )}
                  {editMode ? 'Update Room' : 'Save Room'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Rooms;

// store/roomSlice.js
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { roomApi } from '../../../api/apiService';

// // // Async Thunks
// // export const fetchRooms = createAsyncThunk(
// //   'rooms/fetchRooms',
// //   async (_, { rejectWithValue }) => {
// //     try {
// //       const response = await roomApi.getRooms();
// //       return response.data;
// //     } catch (error) {
// //       return rejectWithValue(
// //         error.response?.data?.message || error.message || 'Failed to fetch rooms'
// //       );
// //     }
// //   }
// // );

// // export const fetchRoomById = createAsyncThunk(
// //   'rooms/fetchRoomById',
// //   async (id, { rejectWithValue }) => {
// //     try {
// //       const response = await roomApi.getRoomById(id);
// //       return response.data;
// //     } catch (error) {
// //       return rejectWithValue(
// //         error.response?.data?.message || error.message || 'Failed to fetch room'
// //       );
// //     }
// //   }
// // );

// // export const createRoom = createAsyncThunk(
// //   'rooms/createRoom',
// //   async (roomData, { rejectWithValue }) => {
// //     try {
// //       const response = await roomApi.createRoom(roomData);
// //       return response.data;
// //     } catch (error) {
// //       return rejectWithValue(
// //         error.response?.data?.message || error.message || 'Failed to create room'
// //       );
// //     }
// //   }
// // );

// // export const updateRoom = createAsyncThunk(
// //   'rooms/updateRoom',
// //   async ({ id, data }, { rejectWithValue }) => {
// //     try {
// //       const response = await roomApi.updateRoom(id, data);
// //       return response.data;
// //     } catch (error) {
// //       return rejectWithValue(
// //         error.response?.data?.message || error.message || 'Failed to update room'
// //       );
// //     }
// //   }
// // );

// // export const deleteRoom = createAsyncThunk(
// //   'rooms/deleteRoom',
// //   async (id, { rejectWithValue }) => {
// //     try {
// //       await roomApi.deleteRoom(id);
// //       return id;
// //     } catch (error) {
// //       return rejectWithValue(
// //         error.response?.data?.message || error.message || 'Failed to delete room'
// //       );
// //     }
// //   }
// // );

// // // Initial State
// // const initialState = {
// //   rooms: [],
// //   currentRoom: null,
// //   loading: false,
// //   error: null,
// //   success: false,
// // };

// // // Slice
// // const roomSlice = createSlice({
// //   name: 'rooms',
// //   initialState,
// //   reducers: {
// //     clearError: (state) => {
// //       state.error = null;
// //     },
// //     clearSuccess: (state) => {
// //       state.success = false;
// //     },
// //     setCurrentRoom: (state, action) => {
// //       state.currentRoom = action.payload;
// //     },
// //     // Local state updates for device controls
// //     toggleDeviceInRoom: (state, action) => {
// //       const { roomId, deviceId } = action.payload;
// //       const room = state.rooms.find(r => r.id === roomId);
// //       if (room) {
// //         const device = room.devices.find(d => d.id === deviceId);
// //         if (device) {
// //           device.status = !device.status;
// //         }
// //       }
// //     },
// //     changeFanSpeedInRoom: (state, action) => {
// //       const { roomId, deviceId, speed } = action.payload;
// //       const room = state.rooms.find(r => r.id === roomId);
// //       if (room) {
// //         const device = room.devices.find(d => d.id === deviceId);
// //         if (device && device.type === 'fan') {
// //           device.speed = speed;
// //           device.status = speed > 0;
// //         }
// //       }
// //     },
// //   },
// //   extraReducers: (builder) => {
// //     builder
// //       // Fetch Rooms
// //       .addCase(fetchRooms.pending, (state) => {
// //         state.loading = true;
// //         state.error = null;
// //       })
// //       .addCase(fetchRooms.fulfilled, (state, action) => {
// //         state.loading = false;
// //         state.rooms = action.payload;
// //         state.error = null;
// //       })
// //       .addCase(fetchRooms.rejected, (state, action) => {
// //         state.loading = false;
// //         state.error = action.payload;
// //       })
// //       // Fetch Room By ID
// //       .addCase(fetchRoomById.pending, (state) => {
// //         state.loading = true;
// //         state.error = null;
// //       })
// //       .addCase(fetchRoomById.fulfilled, (state, action) => {
// //         state.loading = false;
// //         state.currentRoom = action.payload;
// //         state.error = null;
// //       })
// //       .addCase(fetchRoomById.rejected, (state, action) => {
// //         state.loading = false;
// //         state.error = action.payload;
// //       })
// //       // Create Room
// //       .addCase(createRoom.pending, (state) => {
// //         state.loading = true;
// //         state.error = null;
// //         state.success = false;
// //       })
// //       .addCase(createRoom.fulfilled, (state, action) => {
// //         state.loading = false;
// //         state.rooms.push(action.payload);
// //         state.success = true;
// //         state.error = null;
// //       })
// //       .addCase(createRoom.rejected, (state, action) => {
// //         state.loading = false;
// //         state.error = action.payload;
// //         state.success = false;
// //       })
// //       // Update Room
// //       .addCase(updateRoom.pending, (state) => {
// //         state.loading = true;
// //         state.error = null;
// //         state.success = false;
// //       })
// //       .addCase(updateRoom.fulfilled, (state, action) => {
// //         state.loading = false;
// //         const index = state.rooms.findIndex(
// //           (room) => room.id === action.payload.id
// //         );
// //         if (index !== -1) {
// //           state.rooms[index] = action.payload;
// //         }
// //         state.success = true;
// //         state.error = null;
// //       })
// //       .addCase(updateRoom.rejected, (state, action) => {
// //         state.loading = false;
// //         state.error = action.payload;
// //         state.success = false;
// //       })
// //       // Delete Room
// //       .addCase(deleteRoom.pending, (state) => {
// //         state.loading = true;
// //         state.error = null;
// //       })
// //       .addCase(deleteRoom.fulfilled, (state, action) => {
// //         state.loading = false;
// //         state.rooms = state.rooms.filter(
// //           (room) => room.id !== action.payload
// //         );
// //         state.error = null;
// //       })
// //       .addCase(deleteRoom.rejected, (state, action) => {
// //         state.loading = false;
// //         state.error = action.payload;
// //       });
// //   },
// // });

// // export const { 
// //   clearError, 
// //   clearSuccess, 
// //   setCurrentRoom,
// //   toggleDeviceInRoom,
// //   changeFanSpeedInRoom
// // } = roomSlice.actions;

// // export default roomSlice.reducer;

// // Async Thunks
// export const fetchRooms = createAsyncThunk(
//   'rooms/fetchRooms',
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await roomApi.getRooms();
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.message || error.message || 'Failed to fetch rooms'
//       );
//     }
//   }
// );

// export const fetchRoomById = createAsyncThunk(
//   'rooms/fetchRoomById',
//   async (id, { rejectWithValue }) => {
//     try {
//       const response = await roomApi.getRoomById(id);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.message || error.message || 'Failed to fetch room'
//       );
//     }
//   }
// );

// export const createRoom = createAsyncThunk(
//   'rooms/createRoom',
//   async (roomData, { rejectWithValue }) => {
//     try {
//       const response = await roomApi.createRoom(roomData);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.message || error.message || 'Failed to create room'
//       );
//     }
//   }
// );

// export const updateRoom = createAsyncThunk(
//   'rooms/updateRoom',
//   async ({ id, data }, { rejectWithValue }) => {
//     try {
//       const response = await roomApi.updateRoom(id, data);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.message || error.message || 'Failed to update room'
//       );
//     }
//   }
// );

// export const deleteRoom = createAsyncThunk(
//   'rooms/deleteRoom',
//   async (id, { rejectWithValue }) => {
//     try {
//       await roomApi.deleteRoom(id);
//       return id;
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.message || error.message || 'Failed to delete room'
//       );
//     }
//   }
// );

// // Initial State
// const initialState = {
//   rooms: [],
//   currentRoom: null,
//   loading: false,
//   error: null,
//   success: false,
// };

// // Slice
// const roomSlice = createSlice({
//   name: 'rooms',
//   initialState,
//   reducers: {
//     clearError: (state) => {
//       state.error = null;
//     },
//     clearSuccess: (state) => {
//       state.success = false;
//     },
//     setCurrentRoom: (state, action) => {
//       state.currentRoom = action.payload;
//     },
//     // Local state updates for device controls
//     toggleDeviceInRoom: (state, action) => {
//       const { roomId, deviceId } = action.payload;
//       const room = state.rooms.find(r => r.id === roomId);
//       if (room) {
//         const device = room.devices.find(d => d.id === deviceId);
//         if (device) {
//           device.status = !device.status;
//         }
//       }
//     },
//     changeFanSpeedInRoom: (state, action) => {
//       const { roomId, deviceId, speed } = action.payload;
//       const room = state.rooms.find(r => r.id === roomId);
//       if (room) {
//         const device = room.devices.find(d => d.id === deviceId);
//         if (device && device.type === 'fan') {
//           device.speed = speed;
//           device.status = speed > 0;
//         }
//       }
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       // Fetch Rooms
//       .addCase(fetchRooms.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchRooms.fulfilled, (state, action) => {
//         state.loading = false;
//         // Handle both array and object responses
//         state.rooms = Array.isArray(action.payload) 
//           ? action.payload 
//           : action.payload.rooms || [];
//         state.error = null;
//       })
//       .addCase(fetchRooms.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       // Fetch Room By ID
//       .addCase(fetchRoomById.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchRoomById.fulfilled, (state, action) => {
//         state.loading = false;
//         state.currentRoom = action.payload;
//         state.error = null;
//       })
//       .addCase(fetchRoomById.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       // Create Room
//       .addCase(createRoom.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//         state.success = false;
//       })
//       .addCase(createRoom.fulfilled, (state, action) => {
//         state.loading = false;
//         state.rooms.push(action.payload);
//         state.success = true;
//         state.error = null;
//       })
//       .addCase(createRoom.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//         state.success = false;
//       })
//       // Update Room
//       .addCase(updateRoom.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//         state.success = false;
//       })
//       .addCase(updateRoom.fulfilled, (state, action) => {
//         state.loading = false;
//         const updatedRoom = action.payload.room || action.payload;
//         const index = state.rooms.findIndex(
//           (room) => room.id === updatedRoom.id || room.roomId === updatedRoom.roomId
//         );
//         if (index !== -1) {
//           state.rooms[index] = updatedRoom;
//         }
//         state.success = true;
//         state.error = null;
//       })
//       .addCase(updateRoom.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//         state.success = false;
//       })
//       // Delete Room
//       .addCase(deleteRoom.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(deleteRoom.fulfilled, (state, action) => {
//         state.loading = false;
//         state.rooms = state.rooms.filter(
//           (room) => room.id !== action.payload
//         );
//         state.error = null;
//       })
//       .addCase(deleteRoom.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export const { 
//   clearError, 
//   clearSuccess, 
//   setCurrentRoom,
//   toggleDeviceInRoom,
//   changeFanSpeedInRoom
// } = roomSlice.actions;

// export default roomSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { roomApi } from '../../../api/apiService';

// Async Thunks
export const fetchRooms = createAsyncThunk(
  'rooms/fetchRooms',
  async (_, { rejectWithValue }) => {
    try {
      const response = await roomApi.getRooms();
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Failed to fetch rooms'
      );
    }
  }
);

export const fetchRoomById = createAsyncThunk(
  'rooms/fetchRoomById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await roomApi.getRoomById(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Failed to fetch room'
      );
    }
  }
);

export const createRoom = createAsyncThunk(
  'rooms/createRoom',
  async (roomData, { rejectWithValue }) => {
    try {
      const response = await roomApi.createRoom(roomData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Failed to create room'
      );
    }
  }
);

export const updateRoom = createAsyncThunk(
  'rooms/updateRoom',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await roomApi.updateRoom(id, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Failed to update room'
      );
    }
  }
);

export const deleteRoom = createAsyncThunk(
  'rooms/deleteRoom',
  async (id, { rejectWithValue }) => {
    try {
      await roomApi.deleteRoom(id);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Failed to delete room'
      );
    }
  }
);

export const updateDeviceState = createAsyncThunk(
  'rooms/updateDeviceState',
  async ({ roomId, deviceName, state }, { rejectWithValue }) => {
    try {
      const response = await roomApi.updateDeviceState(roomId, {
        deviceName,
        state
      });
      return { roomId, deviceName, state, response: response.data };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Failed to update device state'
      );
    }
  }
);

export const fetchBoards = createAsyncThunk(
  'rooms/fetchBoards',
  async (_, { rejectWithValue }) => {
    try {
      const { boardApi } = await import('../../../api/apiService');
      const response = await boardApi.getBoards();
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Failed to fetch boards'
      );
    }
  }
);

// Initial State
const initialState = {
  rooms: [],
  boards: [],
  currentRoom: null,
  loading: false,
  error: null,
  success: false,
  deviceUpdating: false,
};

// Slice
const roomSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSuccess: (state) => {
      state.success = false;
    },
    setCurrentRoom: (state, action) => {
      state.currentRoom = action.payload;
    },
    clearCurrentRoom: (state) => {
      state.currentRoom = null;
    },
    // Optimistic local state updates for device controls
    toggleDeviceInRoomOptimistic: (state, action) => {
      const { roomId, deviceName } = action.payload;
      
      // Update in rooms list
      const room = state.rooms.find(r => r.roomId === roomId);
      if (room) {
        // Toggle active_devices count
        const currentState = state.currentRoom?.selected_devices?.[deviceName];
        if (currentState === 1) {
          room.active_devices = Math.max(0, room.active_devices - 1);
        } else {
          room.active_devices = room.active_devices + 1;
        }
      }
      
      // Update in currentRoom if viewing details
      if (state.currentRoom && state.currentRoom.roomId === roomId) {
        if (state.currentRoom.selected_devices && state.currentRoom.selected_devices[deviceName] !== undefined) {
          state.currentRoom.selected_devices[deviceName] = 
            state.currentRoom.selected_devices[deviceName] === 1 ? 0 : 1;
          
          // Update active_devices count
          state.currentRoom.active_devices = Object.keys(state.currentRoom.selected_devices)
            .filter(key => !key.includes('_Res'))
            .reduce((count, key) => count + (state.currentRoom.selected_devices[key] === 1 ? 1 : 0), 0);
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Boards
      .addCase(fetchBoards.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBoards.fulfilled, (state, action) => {
        state.loading = false;
        state.boards = action.payload.boards || [];
        state.error = null;
      })
      .addCase(fetchBoards.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Rooms
      .addCase(fetchRooms.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRooms.fulfilled, (state, action) => {
        state.loading = false;
        state.rooms = Array.isArray(action.payload) 
          ? action.payload 
          : action.payload.rooms || [];
        state.error = null;
      })
      .addCase(fetchRooms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Room By ID
      .addCase(fetchRoomById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRoomById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentRoom = action.payload;
        state.error = null;
      })
      .addCase(fetchRoomById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create Room
      .addCase(createRoom.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createRoom.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(createRoom.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      // Update Room
      .addCase(updateRoom.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateRoom.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(updateRoom.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      // Delete Room
      .addCase(deleteRoom.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteRoom.fulfilled, (state, action) => {
        state.loading = false;
        state.rooms = state.rooms.filter(
          (room) => room.roomId !== action.payload
        );
        state.error = null;
      })
      .addCase(deleteRoom.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update Device State
      .addCase(updateDeviceState.pending, (state) => {
        state.deviceUpdating = true;
      })
      .addCase(updateDeviceState.fulfilled, (state, action) => {
        state.deviceUpdating = false;
        const { roomId, deviceName, state: deviceState } = action.payload;
        
        // Update in currentRoom
        if (state.currentRoom && state.currentRoom.roomId === roomId) {
          if (state.currentRoom.selected_devices) {
            state.currentRoom.selected_devices[deviceName] = deviceState;
            
            // Recalculate active devices
            state.currentRoom.active_devices = Object.keys(state.currentRoom.selected_devices)
              .filter(key => !key.includes('_Res'))
              .reduce((count, key) => count + (state.currentRoom.selected_devices[key] === 1 ? 1 : 0), 0);
          }
        }
        
        // Update in rooms list
        const room = state.rooms.find(r => r.roomId === roomId);
        if (room) {
          // Just refresh the count from server next time
          // or you can calculate it here too
        }
      })
      .addCase(updateDeviceState.rejected, (state, action) => {
        state.deviceUpdating = false;
        state.error = action.payload;
      });
  },
});

export const { 
  clearError, 
  clearSuccess, 
  setCurrentRoom,
  clearCurrentRoom,
  toggleDeviceInRoomOptimistic
} = roomSlice.actions;

export default roomSlice.reducer;

// // Helper function to transform room data from API
// const transformRoomData = (apiRoom, boardData = null) => {
//   const devices = [];
  
//   if (apiRoom.selected_devices) {
//     // Transform selected_devices object to devices array
//     Object.keys(apiRoom.selected_devices).forEach(key => {
//       // Skip _Res keys
//       if (key.endsWith('_Res')) return;
      
//       const [deviceType, deviceNum] = key.split('_');
//       const state = apiRoom.selected_devices[key];
//       const speedKey = `${key}_Res`;
//       const speed = apiRoom.selected_devices[speedKey] || 0;
      
//       devices.push({
//         id: key,
//         name: `${deviceType} ${deviceNum}`,
//         type: deviceType.toLowerCase(),
//         status: state === 1,
//         speed: speed,
//         consumption: 0 // API doesn't provide this yet
//       });
//     });
//   }
  
//   return {
//     id: apiRoom.roomId,
//     roomId: apiRoom.roomId,
//     name: apiRoom.room_name,
//     boardId: apiRoom.board_id,
//     board: boardData?.board_name || 'Unknown Board',
//     devices: devices,
//     totalDevices: apiRoom.total_devices || devices.length,
//     activeDevices: apiRoom.active_devices || 0,
//     consumption: 0, // API doesn't provide this yet
//     created_at: apiRoom.created_at
//   };
// };

// // Async Thunks
// export const fetchRooms = createAsyncThunk(
//   'rooms/fetchRooms',
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await roomApi.getRooms();
//       const roomsData = response.data.rooms || [];
      
//       // Fetch board data for each room to get board names
//       const roomsWithBoards = await Promise.all(
//         roomsData.map(async (room) => {
//           try {
//             const boardResponse = await boardApi.getBoardById(room.board_id);
//             return transformRoomData(room, boardResponse.data);
//           } catch (error) {
//             console.error(`Failed to fetch board for room ${room.roomId}:`, error);
//             return transformRoomData(room);
//           }
//         })
//       );
      
//       return roomsWithBoards;
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.message || error.message || 'Failed to fetch rooms'
//       );
//     }
//   }
// );

// export const fetchRoomById = createAsyncThunk(
//   'rooms/fetchRoomById',
//   async (id, { rejectWithValue }) => {
//     try {
//       const response = await roomApi.getRoomById(id);
//       const roomData = response.data;
      
//       // Fetch board data
//       try {
//         const boardResponse = await boardApi.getBoardById(roomData.board_id);
//         return transformRoomData(roomData, boardResponse.data);
//       } catch (error) {
//         return transformRoomData(roomData);
//       }
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.message || error.message || 'Failed to fetch room'
//       );
//     }
//   }
// );

// export const createRoom = createAsyncThunk(
//   'rooms/createRoom',
//   async (roomData, { rejectWithValue }) => {
//     try {
//       const response = await roomApi.createRoom(roomData);
//       // Fetch the created room to get complete data
//       if (response.data.roomId) {
//         const roomResponse = await roomApi.getRoomById(response.data.roomId);
//         const boardResponse = await boardApi.getBoardById(roomResponse.data.board_id);
//         return transformRoomData(roomResponse.data, boardResponse.data);
//       }
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.message || error.message || 'Failed to create room'
//       );
//     }
//   }
// );

// export const updateRoom = createAsyncThunk(
//   'rooms/updateRoom',
//   async ({ id, data }, { rejectWithValue }) => {
//     try {
//       await roomApi.updateRoom(id, data);
//       // Fetch updated room
//       const roomResponse = await roomApi.getRoomById(id);
//       const boardResponse = await boardApi.getBoardById(roomResponse.data.board_id);
//       return transformRoomData(roomResponse.data, boardResponse.data);
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.message || error.message || 'Failed to update room'
//       );
//     }
//   }
// );

// export const deleteRoom = createAsyncThunk(
//   'rooms/deleteRoom',
//   async (id, { rejectWithValue }) => {
//     try {
//       await roomApi.deleteRoom(id);
//       return id;
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.message || error.message || 'Failed to delete room'
//       );
//     }
//   }
// );

// export const updateDeviceState = createAsyncThunk(
//   'rooms/updateDeviceState',
//   async ({ roomId, deviceName, state }, { rejectWithValue }) => {
//     try {
//       await roomApi.updateDeviceState(roomId, { deviceName, state });
//       // Fetch updated room
//       const roomResponse = await roomApi.getRoomById(roomId);
//       const boardResponse = await boardApi.getBoardById(roomResponse.data.board_id);
//       return transformRoomData(roomResponse.data, boardResponse.data);
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.message || error.message || 'Failed to update device state'
//       );
//     }
//   }
// );

// export const addSwitch = createAsyncThunk(
//   'rooms/addSwitch',
//   async ({ roomId, switchData }, { rejectWithValue }) => {
//     try {
//       await switchApi.addSwitch(roomId, switchData);
//       // Fetch updated room
//       const roomResponse = await roomApi.getRoomById(roomId);
//       const boardResponse = await boardApi.getBoardById(roomResponse.data.board_id);
//       return transformRoomData(roomResponse.data, boardResponse.data);
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.message || error.message || 'Failed to add switch'
//       );
//     }
//   }
// );

// export const updateSwitchState = createAsyncThunk(
//   'rooms/updateSwitchState',
//   async ({ roomId, switchId, state }, { rejectWithValue }) => {
//     try {
//       await switchApi.updateSwitchState(roomId, switchId, { state });
//       // Fetch updated room
//       const roomResponse = await roomApi.getRoomById(roomId);
//       const boardResponse = await boardApi.getBoardById(roomResponse.data.board_id);
//       return transformRoomData(roomResponse.data, boardResponse.data);
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.message || error.message || 'Failed to update switch state'
//       );
//     }
//   }
// );

// export const deleteSwitch = createAsyncThunk(
//   'rooms/deleteSwitch',
//   async ({ roomId, switchId }, { rejectWithValue }) => {
//     try {
//       await switchApi.deleteSwitch(roomId, switchId);
//       // Fetch updated room
//       const roomResponse = await roomApi.getRoomById(roomId);
//       const boardResponse = await boardApi.getBoardById(roomResponse.data.board_id);
//       return transformRoomData(roomResponse.data, boardResponse.data);
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.message || error.message || 'Failed to delete switch'
//       );
//     }
//   }
// );

// // Initial State
// const initialState = {
//   rooms: [],
//   currentRoom: null,
//   loading: false,
//   error: null,
//   success: false,
// };

// // Slice
// const roomSlice = createSlice({
//   name: 'rooms',
//   initialState,
//   reducers: {
//     clearError: (state) => {
//       state.error = null;
//     },
//     clearSuccess: (state) => {
//       state.success = false;
//     },
//     setCurrentRoom: (state, action) => {
//       state.currentRoom = action.payload;
//     },
//     // Optimistic local updates (will be overwritten by API response)
//     toggleDeviceInRoom: (state, action) => {
//       const { roomId, deviceId } = action.payload;
//       const room = state.rooms.find(r => r.id === roomId || r.roomId === roomId);
//       if (room) {
//         const device = room.devices.find(d => d.id === deviceId);
//         if (device) {
//           device.status = !device.status;
//         }
//       }
//     },
//     changeFanSpeedInRoom: (state, action) => {
//       const { roomId, deviceId, speed } = action.payload;
//       const room = state.rooms.find(r => r.id === roomId || r.roomId === roomId);
//       if (room) {
//         const device = room.devices.find(d => d.id === deviceId);
//         if (device && device.type === 'fan') {
//           device.speed = speed;
//           device.status = speed > 0;
//         }
//       }
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       // Fetch Rooms
//       .addCase(fetchRooms.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchRooms.fulfilled, (state, action) => {
//         state.loading = false;
//         state.rooms = action.payload;
//         state.error = null;
//       })
//       .addCase(fetchRooms.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//         state.rooms = [];
//       })
//       // Fetch Room By ID
//       .addCase(fetchRoomById.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchRoomById.fulfilled, (state, action) => {
//         state.loading = false;
//         state.currentRoom = action.payload;
//         state.error = null;
//       })
//       .addCase(fetchRoomById.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       // Create Room
//       .addCase(createRoom.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//         state.success = false;
//       })
//       .addCase(createRoom.fulfilled, (state, action) => {
//         state.loading = false;
//         state.rooms.push(action.payload);
//         state.success = true;
//         state.error = null;
//       })
//       .addCase(createRoom.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//         state.success = false;
//       })
//       // Update Room
//       .addCase(updateRoom.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//         state.success = false;
//       })
//       .addCase(updateRoom.fulfilled, (state, action) => {
//         state.loading = false;
//         const index = state.rooms.findIndex(
//           (room) => room.id === action.payload.id || room.roomId === action.payload.roomId
//         );
//         if (index !== -1) {
//           state.rooms[index] = action.payload;
//         }
//         if (state.currentRoom?.id === action.payload.id) {
//           state.currentRoom = action.payload;
//         }
//         state.success = true;
//         state.error = null;
//       })
//       .addCase(updateRoom.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//         state.success = false;
//       })
//       // Delete Room
//       .addCase(deleteRoom.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(deleteRoom.fulfilled, (state, action) => {
//         state.loading = false;
//         state.rooms = state.rooms.filter(
//           (room) => room.id !== action.payload && room.roomId !== action.payload
//         );
//         if (state.currentRoom?.id === action.payload) {
//           state.currentRoom = null;
//         }
//         state.error = null;
//       })
//       .addCase(deleteRoom.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       // Update Device State
//       .addCase(updateDeviceState.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(updateDeviceState.fulfilled, (state, action) => {
//         state.loading = false;
//         const index = state.rooms.findIndex(
//           (room) => room.id === action.payload.id || room.roomId === action.payload.roomId
//         );
//         if (index !== -1) {
//           state.rooms[index] = action.payload;
//         }
//         if (state.currentRoom?.id === action.payload.id) {
//           state.currentRoom = action.payload;
//         }
//         state.error = null;
//       })
//       .addCase(updateDeviceState.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       // Add Switch
//       .addCase(addSwitch.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(addSwitch.fulfilled, (state, action) => {
//         state.loading = false;
//         const index = state.rooms.findIndex(
//           (room) => room.id === action.payload.id || room.roomId === action.payload.roomId
//         );
//         if (index !== -1) {
//           state.rooms[index] = action.payload;
//         }
//         state.error = null;
//       })
//       .addCase(addSwitch.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       // Update Switch State
//       .addCase(updateSwitchState.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(updateSwitchState.fulfilled, (state, action) => {
//         state.loading = false;
//         const index = state.rooms.findIndex(
//           (room) => room.id === action.payload.id || room.roomId === action.payload.roomId
//         );
//         if (index !== -1) {
//           state.rooms[index] = action.payload;
//         }
//         if (state.currentRoom?.id === action.payload.id) {
//           state.currentRoom = action.payload;
//         }
//         state.error = null;
//       })
//       .addCase(updateSwitchState.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       // Delete Switch
//       .addCase(deleteSwitch.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(deleteSwitch.fulfilled, (state, action) => {
//         state.loading = false;
//         const index = state.rooms.findIndex(
//           (room) => room.id === action.payload.id || room.roomId === action.payload.roomId
//         );
//         if (index !== -1) {
//           state.rooms[index] = action.payload;
//         }
//         state.error = null;
//       })
//       .addCase(deleteSwitch.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export const { 
//   clearError, 
//   clearSuccess, 
//   setCurrentRoom,
//   toggleDeviceInRoom,
//   changeFanSpeedInRoom
// } = roomSlice.actions;

// export default roomSlice.reducer;
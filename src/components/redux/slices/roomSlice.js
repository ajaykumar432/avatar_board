
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { roomApi } from '../../../api/apiService';

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

// export const updateDeviceState = createAsyncThunk(
//   'rooms/updateDeviceState',
//   async ({ roomId, deviceName, state }, { rejectWithValue }) => {
//     try {
//       const response = await roomApi.updateDeviceState(roomId, {
//         deviceName,
//         state
//       });
//       return { roomId, deviceName, state, response: response.data };
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.message || error.message || 'Failed to update device state'
//       );
//     }
//   }
// );

// export const fetchBoards = createAsyncThunk(
//   'rooms/fetchBoards',
//   async (_, { rejectWithValue }) => {
//     try {
//       const { boardApi } = await import('../../../api/apiService');
//       const response = await boardApi.getBoards();
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.message || error.message || 'Failed to fetch boards'
//       );
//     }
//   }
// );

// // Initial State
// const initialState = {
//   rooms: [],
//   boards: [],
//   currentRoom: null,
//   loading: false,
//   error: null,
//   success: false,
//   deviceUpdating: false,
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
//     clearCurrentRoom: (state) => {
//       state.currentRoom = null;
//     },
//     // Optimistic local state updates for device controls
//     toggleDeviceInRoomOptimistic: (state, action) => {
//       const { roomId, deviceName } = action.payload;
      
//       // Update in rooms list
//       const room = state.rooms.find(r => r.roomId === roomId);
//       if (room) {
//         // Toggle active_devices count
//         const currentState = state.currentRoom?.selected_devices?.[deviceName];
//         if (currentState === 1) {
//           room.active_devices = Math.max(0, room.active_devices - 1);
//         } else {
//           room.active_devices = room.active_devices + 1;
//         }
//       }
      
//       // Update in currentRoom if viewing details
//       if (state.currentRoom && state.currentRoom.roomId === roomId) {
//         if (state.currentRoom.selected_devices && state.currentRoom.selected_devices[deviceName] !== undefined) {
//           state.currentRoom.selected_devices[deviceName] = 
//             state.currentRoom.selected_devices[deviceName] === 1 ? 0 : 1;
          
//           // Update active_devices count
//           state.currentRoom.active_devices = Object.keys(state.currentRoom.selected_devices)
//             .filter(key => !key.includes('_Res'))
//             .reduce((count, key) => count + (state.currentRoom.selected_devices[key] === 1 ? 1 : 0), 0);
//         }
//       }
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       // Fetch Boards
//       .addCase(fetchBoards.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchBoards.fulfilled, (state, action) => {
//         state.loading = false;
//         state.boards = action.payload.boards || [];
//         state.error = null;
//       })
//       .addCase(fetchBoards.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       // Fetch Rooms
//       .addCase(fetchRooms.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchRooms.fulfilled, (state, action) => {
//         state.loading = false;
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
//           (room) => room.roomId !== action.payload
//         );
//         state.error = null;
//       })
//       .addCase(deleteRoom.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       // Update Device State
//       .addCase(updateDeviceState.pending, (state) => {
//         state.deviceUpdating = true;
//       })
//       .addCase(updateDeviceState.fulfilled, (state, action) => {
//         state.deviceUpdating = false;
//         const { roomId, deviceName, state: deviceState } = action.payload;
        
//         // Update in currentRoom
//         if (state.currentRoom && state.currentRoom.roomId === roomId) {
//           if (state.currentRoom.selected_devices) {
//             state.currentRoom.selected_devices[deviceName] = deviceState;
            
//             // Recalculate active devices
//             state.currentRoom.active_devices = Object.keys(state.currentRoom.selected_devices)
//               .filter(key => !key.includes('_Res'))
//               .reduce((count, key) => count + (state.currentRoom.selected_devices[key] === 1 ? 1 : 0), 0);
//           }
//         }
        
//         // Update in rooms list
//         const room = state.rooms.find(r => r.roomId === roomId);
//         if (room) {
//           // Just refresh the count from server next time
//           // or you can calculate it here too
//         }
//       })
//       .addCase(updateDeviceState.rejected, (state, action) => {
//         state.deviceUpdating = false;
//         state.error = action.payload;
//       });
//   },
// });

// export const { 
//   clearError, 
//   clearSuccess, 
//   setCurrentRoom,
//   clearCurrentRoom,
//   toggleDeviceInRoomOptimistic
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
  deviceUpdating: {}, // Changed to object to track multiple devices
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
      const { roomId, deviceName, newState } = action.payload;
      
      // Mark this device as updating
      state.deviceUpdating[deviceName] = true;
      
      // Update in currentRoom if viewing details
      if (state.currentRoom && state.currentRoom.roomId === roomId) {
        if (state.currentRoom.selected_devices && state.currentRoom.selected_devices[deviceName] !== undefined) {
          // Update the main device state
          state.currentRoom.selected_devices[deviceName] = newState;
        }
      }
    },
    // Clear device updating status
    clearDeviceUpdating: (state, action) => {
      const { deviceName } = action.payload;
      delete state.deviceUpdating[deviceName];
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
        
        // Clear all device updating states for this room
        state.deviceUpdating = {};
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
      .addCase(updateDeviceState.pending, (state, action) => {
        const { deviceName } = action.meta.arg;
        state.deviceUpdating[deviceName] = true;
      })
      .addCase(updateDeviceState.fulfilled, (state, action) => {
        const { roomId, deviceName, state: deviceState } = action.payload;
        
        // We don't clear the updating state here anymore
        // It will be cleared when we detect matching states in the component
        
        // Update in currentRoom
        if (state.currentRoom && state.currentRoom.roomId === roomId) {
          if (state.currentRoom.selected_devices) {
            state.currentRoom.selected_devices[deviceName] = deviceState;
            
            // Recalculate active devices
          //   state.currentRoom.active_devices = Object.keys(state.currentRoom.selected_devices)
          //     .filter(key => !key.includes('_Res'))
          //     .reduce((count, key) => count + (state.currentRoom.selected_devices[key] === 1 ? 1 : 0), 0);
          // }
          state.currentRoom.active_devices = Object.keys(state.currentRoom.selected_devices)
  .filter(key => !key.includes('_Res'))
  .reduce((count, key) => {
    const val = state.currentRoom.selected_devices[key];
    return count + (val === 1 || val === 2 || val === 3 ? 1 : 0);
  }, 0);
          }
        }
        
        // Update in rooms list
        // const room = state.rooms.find(r => r.roomId === roomId);
        // if (room) {
        //   // Recalculate active devices count based on the update
        //   if (deviceState === 1 || deviceState === 2 || deviceState === 3) {
        //     room.active_devices = Math.min(room.total_devices, room.active_devices + 1);
        //   } else {
        //     room.active_devices = Math.max(0, room.active_devices - 1);
        //   }
        // }

        // Update in rooms list
const room = state.rooms.find(r => r.roomId === roomId);
if (room) {
  if (room.selected_devices) {
    room.active_devices = Object.keys(room.selected_devices)
      .filter(key => !key.includes('_Res'))
      .reduce((count, key) => {
        const val = room.selected_devices[key];
        return count + (val === 1 || val === 2 || val === 3 ? 1 : 0);
      }, 0);
  }
}

      })
      .addCase(updateDeviceState.rejected, (state, action) => {
        const { deviceName } = action.meta.arg;
        delete state.deviceUpdating[deviceName];
        state.error = action.payload;
      });
  },
});

export const { 
  clearError, 
  clearSuccess, 
  setCurrentRoom,
  clearCurrentRoom,
  toggleDeviceInRoomOptimistic,
  clearDeviceUpdating
} = roomSlice.actions;

export default roomSlice.reducer;
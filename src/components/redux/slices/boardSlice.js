
// import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
// import { boardApi } from '../../../api/apiService';

// // Async Thunks
// export const fetchBoards = createAsyncThunk(
//   'boards/fetchBoards',
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await boardApi.getBoards();
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.message || error.message || 'Failed to fetch boards'
//       );
//     }
//   }
// );

// export const fetchBoardById = createAsyncThunk(
//   'boards/fetchBoardById',
//   async (id, { rejectWithValue }) => {
//     try {
//       const response = await boardApi.getBoardById(id);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.message || error.message || 'Failed to fetch board'
//       );
//     }
//   }
// );

// export const createBoard = createAsyncThunk(
//   'boards/createBoard',
//   async (boardData, { rejectWithValue }) => {
//     try {
//       const response = await boardApi.createBoard(boardData);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.message || error.message || 'Failed to create board'
//       );
//     }
//   }
// );

// export const updateBoard = createAsyncThunk(
//   'boards/updateBoard',
//   async ({ id, data }, { rejectWithValue }) => {
//     try {
//       const response = await boardApi.updateBoardById(id, data);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.message || error.message || 'Failed to update board'
//       );
//     }
//   }
// );

// export const deleteBoard = createAsyncThunk(
//   'boards/deleteBoard',
//   async (id, { rejectWithValue }) => {
//     try {
//       await boardApi.deleteBoard(id);
//       return id;
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.message || error.message || 'Failed to delete board'
//       );
//     }
//   }
// );

// // Initial State
// const initialState = {
//   boards: [],
//   currentBoard: null,
//   loading: false,
//   error: null,
//   success: false,
// };

// // Slice
// const boardSlice = createSlice({
//   name: 'boards',
//   initialState,
//   reducers: {
//     clearError: (state) => {
//       state.error = null;
//     },
//     clearSuccess: (state) => {
//       state.success = false;
//     },
//     setCurrentBoard: (state, action) => {
//       state.currentBoard = action.payload;
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
//         state.boards = action.payload;
//         state.error = null;
//       })
//       .addCase(fetchBoards.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       // Fetch Board By ID
//       .addCase(fetchBoardById.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchBoardById.fulfilled, (state, action) => {
//         state.loading = false;
//         state.currentBoard = action.payload;
//         state.error = null;
//       })
//       .addCase(fetchBoardById.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       // Create Board
//       .addCase(createBoard.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//         state.success = false;
//       })
//       .addCase(createBoard.fulfilled, (state, action) => {
//         state.loading = false;
//         state.boards.push(action.payload);
//         state.success = true;
//         state.error = null;
//       })
//       .addCase(createBoard.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//         state.success = false;
//       })
//       // Update Board
//       .addCase(updateBoard.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//         state.success = false;
//       })
//       .addCase(updateBoard.fulfilled, (state, action) => {
//         state.loading = false;
//         const index = state.boards.findIndex(
//           (board) => board.id === action.payload.id
//         );
//         if (index !== -1) {
//           state.boards[index] = action.payload;
//         }
//         state.success = true;
//         state.error = null;
//       })
//       .addCase(updateBoard.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//         state.success = false;
//       })
//       // Delete Board
//       .addCase(deleteBoard.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(deleteBoard.fulfilled, (state, action) => {
//         state.loading = false;
//         state.boards = state.boards.filter(
//           (board) => board.id !== action.payload
//         );
//         state.error = null;
//       })
//       .addCase(deleteBoard.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export const { clearError, clearSuccess, setCurrentBoard } = boardSlice.actions;
// export default boardSlice.reducer;

import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import { boardApi } from '../../../api/apiService';

// Helper function to transform API response to component format
const transformBoardData = (apiBoard) => {
  // Extract board ID (it's boardId in API response)
  const id = apiBoard.boardId;
  
  // Create device list from switches and fans
  const deviceList = [];
  for (let i = 1; i <= apiBoard.num_switches; i++) {
    deviceList.push(`Switch ${i}`);
  }
  for (let i = 1; i <= apiBoard.num_fans; i++) {
    deviceList.push(`Fan ${i}`);
  }
  
  return {
    id: id,
    name: apiBoard.board_name,
    devices: apiBoard.num_switches + apiBoard.num_fans,
    switches: apiBoard.num_switches,
    fans: apiBoard.num_fans,
    customDevices: [], // API doesn't support this yet
    deviceList: deviceList,
    created_at: apiBoard.created_at,
    created_by: apiBoard.created_by,
    created_by_email: apiBoard.created_by_email
  };
};

// Async Thunks
export const fetchBoards = createAsyncThunk(
  'boards/fetchBoards',
  async (_, { rejectWithValue }) => {
    try {
      const response = await boardApi.getBoards();
      // If response.data is an array of boards
      if (Array.isArray(response.data)) {
        return response.data.map(transformBoardData);
      }
      // If response.data is an object with a boards property
      if (response.data.boards && Array.isArray(response.data.boards)) {
        return response.data.boards.map(transformBoardData);
      }
      // If no boards found, return empty array
      return [];
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Failed to fetch boards'
      );
    }
  }
);

export const fetchBoardById = createAsyncThunk(
  'boards/fetchBoardById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await boardApi.getBoardById(id);
      return transformBoardData(response.data);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Failed to fetch board'
      );
    }
  }
);

export const createBoard = createAsyncThunk(
  'boards/createBoard',
  async (boardData, { rejectWithValue }) => {
    try {
      const response = await boardApi.createBoard(boardData);
      // API returns: { message, boardId, board }
      const newBoard = response.data.board;
      return transformBoardData({
        ...newBoard,
        boardId: response.data.boardId
      });
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Failed to create board'
      );
    }
  }
);

export const updateBoard = createAsyncThunk(
  'boards/updateBoard',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await boardApi.updateBoardById(id, data);
      // API might return updated board or just success message
      // Fetch the updated board to ensure we have latest data
      const updatedBoardResponse = await boardApi.getBoardById(id);
      return transformBoardData(updatedBoardResponse.data);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Failed to update board'
      );
    }
  }
);

export const deleteBoard = createAsyncThunk(
  'boards/deleteBoard',
  async (id, { rejectWithValue }) => {
    try {
      await boardApi.deleteBoard(id);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Failed to delete board'
      );
    }
  }
);

// Initial State
const initialState = {
  boards: [],
  currentBoard: null,
  loading: false,
  error: null,
  success: false,
};

// Slice
const boardSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSuccess: (state) => {
      state.success = false;
    },
    setCurrentBoard: (state, action) => {
      state.currentBoard = action.payload;
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
        state.boards = action.payload;
        state.error = null;
      })
      .addCase(fetchBoards.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.boards = []; // Set to empty array on error
      })
      // Fetch Board By ID
      .addCase(fetchBoardById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBoardById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentBoard = action.payload;
        state.error = null;
      })
      .addCase(fetchBoardById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create Board
      .addCase(createBoard.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createBoard.fulfilled, (state, action) => {
        state.loading = false;
        state.boards.push(action.payload);
        state.success = true;
        state.error = null;
      })
      .addCase(createBoard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      // Update Board
      .addCase(updateBoard.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateBoard.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.boards.findIndex(
          (board) => board.id === action.payload.id
        );
        if (index !== -1) {
          state.boards[index] = action.payload;
        }
        if (state.currentBoard?.id === action.payload.id) {
          state.currentBoard = action.payload;
        }
        state.success = true;
        state.error = null;
      })
      .addCase(updateBoard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      // Delete Board
      .addCase(deleteBoard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBoard.fulfilled, (state, action) => {
        state.loading = false;
        state.boards = state.boards.filter(
          (board) => board.id !== action.payload
        );
        if (state.currentBoard?.id === action.payload) {
          state.currentBoard = null;
        }
        state.error = null;
      })
      .addCase(deleteBoard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearSuccess, setCurrentBoard } = boardSlice.actions;
export default boardSlice.reducer;


// import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
// import { boardApi } from '../../../api/apiService';

// // Helper function to transform API response to component format
// const transformBoardData = (apiBoard) => {
//   // Extract board ID (it's boardId in API response)
//   const id = apiBoard.boardId;
  
//   // Create device list from switches and fans
//   const deviceList = [];
//   for (let i = 1; i <= apiBoard.num_switches; i++) {
//     deviceList.push(`Switch ${i}`);
//   }
//   for (let i = 1; i <= apiBoard.num_fans; i++) {
//     deviceList.push(`Fan ${i}`);
//   }
  
//   return {
//     id: id,
//     name: apiBoard.board_name,
//     devices: apiBoard.num_switches + apiBoard.num_fans,
//     switches: apiBoard.num_switches,
//     fans: apiBoard.num_fans,
//     customDevices: [], // API doesn't support this yet
//     deviceList: deviceList,
//     created_at: apiBoard.created_at,
//     created_by: apiBoard.created_by,
//     created_by_email: apiBoard.created_by_email
//   };
// };

// // Async Thunks
// export const fetchBoards = createAsyncThunk(
//   'boards/fetchBoards',
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await boardApi.getBoards();
//       // If response.data is an array of boards
//       if (Array.isArray(response.data)) {
//         return response.data.map(transformBoardData);
//       }
//       // If response.data is an object with a boards property
//       if (response.data.boards && Array.isArray(response.data.boards)) {
//         return response.data.boards.map(transformBoardData);
//       }
//       // If no boards found, return empty array
//       return [];
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.message || error.message || 'Failed to fetch boards'
//       );
//     }
//   }
// );

// export const fetchBoardById = createAsyncThunk(
//   'boards/fetchBoardById',
//   async (id, { rejectWithValue }) => {
//     try {
//       const response = await boardApi.getBoardById(id);
//       return transformBoardData(response.data);
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.message || error.message || 'Failed to fetch board'
//       );
//     }
//   }
// );

// export const createBoard = createAsyncThunk(
//   'boards/createBoard',
//   async (boardData, { rejectWithValue }) => {
//     try {
//       const response = await boardApi.createBoard(boardData);
//       // API returns: { message, boardId, board }
//       const newBoard = response.data.board;
//       return transformBoardData({
//         ...newBoard,
//         boardId: response.data.boardId
//       });
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.message || error.message || 'Failed to create board'
//       );
//     }
//   }
// );

// export const updateBoard = createAsyncThunk(
//   'boards/updateBoard',
//   async ({ id, data }, { rejectWithValue }) => {
//     try {
//       const response = await boardApi.updateBoardById(id, data);
//       // API might return updated board or just success message
//       // Fetch the updated board to ensure we have latest data
//       const updatedBoardResponse = await boardApi.getBoardById(id);
//       return transformBoardData(updatedBoardResponse.data);
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.message || error.message || 'Failed to update board'
//       );
//     }
//   }
// );

// export const deleteBoard = createAsyncThunk(
//   'boards/deleteBoard',
//   async (id, { rejectWithValue }) => {
//     try {
//       await boardApi.deleteBoard(id);
//       return id;
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.message || error.message || 'Failed to delete board'
//       );
//     }
//   }
// );

// // Initial State
// const initialState = {
//   boards: [],
//   currentBoard: null,
//   loading: false,
//   error: null,
//   success: false,
// };

// // Slice
// const boardSlice = createSlice({
//   name: 'boards',
//   initialState,
//   reducers: {
//     clearError: (state) => {
//       state.error = null;
//     },
//     clearSuccess: (state) => {
//       state.success = false;
//     },
//     setCurrentBoard: (state, action) => {
//       state.currentBoard = action.payload;
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
//         state.boards = action.payload;
//         state.error = null;
//       })
//       .addCase(fetchBoards.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//         state.boards = []; // Set to empty array on error
//       })
//       // Fetch Board By ID
//       .addCase(fetchBoardById.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchBoardById.fulfilled, (state, action) => {
//         state.loading = false;
//         state.currentBoard = action.payload;
//         state.error = null;
//       })
//       .addCase(fetchBoardById.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       // Create Board
//       .addCase(createBoard.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//         state.success = false;
//       })
//       .addCase(createBoard.fulfilled, (state, action) => {
//         state.loading = false;
//         state.boards.push(action.payload);
//         state.success = true;
//         state.error = null;
//       })
//       .addCase(createBoard.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//         state.success = false;
//       })
//       // Update Board
//       .addCase(updateBoard.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//         state.success = false;
//       })
//       .addCase(updateBoard.fulfilled, (state, action) => {
//         state.loading = false;
//         const index = state.boards.findIndex(
//           (board) => board.id === action.payload.id
//         );
//         if (index !== -1) {
//           state.boards[index] = action.payload;
//         }
//         if (state.currentBoard?.id === action.payload.id) {
//           state.currentBoard = action.payload;
//         }
//         state.success = true;
//         state.error = null;
//       })
//       .addCase(updateBoard.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//         state.success = false;
//       })
//       // Delete Board
//       .addCase(deleteBoard.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(deleteBoard.fulfilled, (state, action) => {
//         state.loading = false;
//         state.boards = state.boards.filter(
//           (board) => board.id !== action.payload
//         );
//         if (state.currentBoard?.id === action.payload) {
//           state.currentBoard = null;
//         }
//         state.error = null;
//       })
//       .addCase(deleteBoard.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export const { clearError, clearSuccess, setCurrentBoard } = boardSlice.actions;
// export default boardSlice.reducer;
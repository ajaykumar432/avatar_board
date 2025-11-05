// store/store.js
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../store/combinedReducer';

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
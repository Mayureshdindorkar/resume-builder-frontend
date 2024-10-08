import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import resumeReducer from './resumeSlice';

export const store = configureStore({
  reducer: {
    authReducer: authReducer,
    resumeReducer: resumeReducer,
  },
});

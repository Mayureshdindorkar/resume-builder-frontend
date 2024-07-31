import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { setUserData } from './resumeSlice';
import {BASE_URI} from './constants';

const initialState = {
  username: null,
  token: null,
  isUserSignedUp: false,
  isUserLoggedIn: false,
  error: null,
};

export const signup = createAsyncThunk('auth/signup', async ({ username, password }) => {
  const response = await axios.post(`${BASE_URI}/auth/signup`, { username, password });
  return response.data;
});

export const login = createAsyncThunk('auth/login', async ({ username, password }, { dispatch }) => {
  try {
    const response = await axios.post(`${BASE_URI}/auth/login`, { username, password });
    
    if (response.data.token) {
      const userResponse = await axios.get(`${BASE_URI}/getUser/${username}`, {
        headers: {
          Authorization: `Bearer ${response.data.token}`,
        },
      });

      dispatch(setUserData(userResponse.data));
      
      return { ...response.data, userData: userResponse.data };
    }
    
    throw new Error('No token received');
  } catch (error) {
    throw new Error(error.message);
  }
});

const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    logout(state) {
      state.username = null;
      state.token = null;
      state.isUserSignedUp = false;
      state.isUserLoggedIn = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.fulfilled, (state, action) => {
        state.isUserSignedUp = true;
        state.username = action.payload.username;
        state.error = null;
      })
      .addCase(signup.rejected, (state, action) => {
        state.isUserSignedUp = false;
        state.error = action.error.message;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isUserLoggedIn = true;
        state.token = action.payload.token;
        state.username = action.meta.arg.username;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.isUserLoggedIn = false;
        state.error = 'Invalid username or password';
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;

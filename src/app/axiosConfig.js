import axios from 'axios';
import { store } from '../redux/store';

axios.interceptors.request.use((config) => {
  const token = store.getState().authReducer.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default axios;

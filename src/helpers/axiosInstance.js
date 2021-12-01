import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
// import envs from '../config/env';
// import {LOGOUT} from '../constants/routeNames';
// import {navigate} from '../navigations/SideMenu/RootNavigator';

let headers = {};

const axiosInstance = axios.create({
  baseURL: 'https://instagram.thenabilarta.com',
  headers,
});

axiosInstance.interceptors.request.use(
  async config => {
    // const token = await AsyncStorage.getItem('token');
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJ1c2VybmFtZSI6ImFkbWluIiwicHJvZmlsZVBpYyI6Imh0dHBzOi8vd3d3LmdyYXZhdGFyLmNvbS9hdmF0YXIvMTYzNzUwODc4Nz9kPWlkZW50aWNvbiIsInN0YXR1cyI6Im9rIiwiaXNMb2dnZWRJbiI6dHJ1ZSwiaWF0IjoxNjM4MDc3NDYzfQ.2K7Dk4ylN9LyL5B-AEdAS4D5qrqFhrFipZwSuiv1I5A';
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

// axiosInstance.interceptors.response.use(
//   response =>
//     new Promise((resolve, reject) => {
//       resolve(response);
//     }),
//   error => {
//     if (!error.response) {
//       return new Promise((resolve, reject) => {
//         reject(error);
//       });
//     }

//     if (error.response.status === 403) {
//       navigate(LOGOUT, {tokenExpired: true});
//     } else {
//       return new Promise((resolve, reject) => {
//         reject(error);
//       });
//     }
//   },
// );

export default axiosInstance;

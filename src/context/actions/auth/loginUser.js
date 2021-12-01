import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  LOGIN_FAIL,
  LOGIN_LOADING,
  LOGIN_SUCCESS,
} from '../../../constants/actionTypes';
import axiosInstance from '../../../helpers/axiosInstance';

export default ({password, userName: username}) =>
  dispatch => {
    dispatch({
      type: LOGIN_LOADING,
    });
    console.log('ACTION', password, username);
    axiosInstance
      .post(
        'api/users/login',
        {
          password,
          username,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      .then(res => {
        console.log(res.data);
        AsyncStorage.setItem('token', res.data.token);
        AsyncStorage.setItem('username', res.data.username);
        // dispatch({
        //   type: LOGIN_SUCCESS,
        //   payload: res.data,
        // });
      })
      .catch(err => {
        // dispatch({
        //   type: LOGIN_FAIL,
        //   payload: err.response
        //     ? err.response.data
        //     : {error: 'Something went wrong, try agin'},
        // });
      });
  };

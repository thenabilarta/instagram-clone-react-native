import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {
  LOGIN_FAIL,
  LOGIN_LOADING,
  LOGIN_SUCCESS,
} from '../../../constants/actionTypes';

export default ({password, userName: username}) =>
  dispatch => {
    dispatch({
      type: LOGIN_LOADING,
    });
    axios
      .post(
        'https://instagram.thenabilarta.com/api/users/login',
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
        if (res.status === 'Error') {
          console.log('ERRRORR');
          dispatch({
            type: LOGIN_FAIL,
            payload: err.response
              ? err.response.data
              : {error: 'Something went wrong, try agin'},
          });
        } else {
          console.log('TESTESTSET');
          console.log(res.data);
          AsyncStorage.setItem('token', res.data.token);
          AsyncStorage.setItem('username', res.data.username);
          dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data,
          });
        }
      })
      .catch(err => {
        console.log('ERRRORR2');
        dispatch({
          type: LOGIN_FAIL,
          payload: err.response
            ? err.response.data
            : {error: 'Something went wrong, try agin'},
        });
      });
  };

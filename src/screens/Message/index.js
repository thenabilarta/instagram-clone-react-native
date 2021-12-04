import React, {useRef, useEffect, useState} from 'react';
import {View, Text, Image, TouchableWithoutFeedback} from 'react-native';
import axiosInstance from '../../helpers/axiosInstance';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';
import styles from './styles';
import {CHAT} from '../../constants/routeNames';
import {useNavigation} from '@react-navigation/native';

const Message = () => {
  const socket = useRef(null);

  const navigation = useNavigation();

  const [_messageList, _setMessageList] = useState([]);

  const [userList, setUserList] = useState([]);

  const fetchUser = () => {
    axiosInstance.get('api/users').then(res => {
      console.log('user', res.data);
      setUserList(res.data);
    });
  };

  let decoded;

  useEffect(() => {
    console.log('CALLL');

    (async function () {
      const test = await AsyncStorage.getItem('token');

      console.log(test);

      try {
        decoded = jwtDecode(test);
        console.log('decoded', decoded);
        const _userList = [];
        axiosInstance.get('api/users').then(res => {
          res.data.forEach(r => {
            if (r.id !== decoded.id) {
              _userList.push(r);
            }
          });

          console.log('user', res.data);
          setUserList(_userList);
        });
      } catch (error) {
        decoded = error;
      }
    })();
  }, []);

  return (
    <View style={styles.userWrapper}>
      {userList.length > 0 &&
        userList.map(u => (
          <TouchableWithoutFeedback
            key={u.id}
            onPress={() => {
              navigation.navigate(CHAT, {
                message: _messageList,
                chosedChat: u.id,
                username: u.username,
                socket: socket,
              });
            }}>
            <View style={styles.userMessage}>
              <Image
                source={{
                  uri: u.profilePictureSRC,
                }}
                style={styles.userProfilePicture}
              />
              <Text style={styles.username}>{u.username}</Text>
            </View>
          </TouchableWithoutFeedback>
        ))}
    </View>
  );
};

export default Message;

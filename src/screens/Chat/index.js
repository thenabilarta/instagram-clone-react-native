import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import jwtDecode from 'jwt-decode';
import {io} from 'socket.io-client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import styles from './styles';

const Chat = ({route}) => {
  const [userId, setUserId] = useState(0);
  const [_messageList, _setMessageList] = useState([]);
  const [messageList, setMessageList] = useState([]);
  const [messageInput, setMessageInput] = useState('');

  const chosedChat = route.params.chosedChat;
  const username = route.params.username;
  const socket = useRef(null);

  const scrollViewRef = useRef();

  const {setOptions} = useNavigation();

  useEffect(() => {
    setOptions({
      title: username,
    });
    let mounted = true;
    if (mounted) {
      socket.current = io('https://instagram.thenabilarta.com', {
        autoConnect: false,
      });
      socket.current.connect();
      socket.current.on('private message', res => {
        _setMessageList(res);
      });
      socket.current.onAny((event, ...args) => {
        console.log(event, args);
      });
    }
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    let decoded;
    const msgData = [];
    let currentDate;

    // console.log('chosed', chosedChat);
    // console.log('chosed', route.params.message);

    (async function () {
      const test = await AsyncStorage.getItem('token');

      try {
        decoded = jwtDecode(test);
        setUserId(decoded.id);

        _messageList.forEach((m, index) => {
          if (
            m._to === decoded.id.toString() ||
            m._from === decoded.id.toString()
          ) {
            if (chosedChat !== null) {
              if (
                m._to === chosedChat.toString() ||
                m._from === chosedChat.toString()
              ) {
                if (msgData.length === 0) {
                  currentDate = moment(m.date, 'DD-MM-YYYYTHH-mm-ss');
                  msgData.push({...m, showDate: true});
                } else if (index !== 0) {
                  if (
                    moment(currentDate).isSame(
                      moment(m.date, 'DD-MM-YYYYTHH-mm-ss'),
                      'day',
                    )
                  ) {
                    msgData.push({...m, showDate: false});
                  } else {
                    currentDate = moment(m.date, 'DD-MM-YYYYTHH-mm-ss');
                    msgData.push({...m, showDate: true});
                  }
                }
              }
            }
          }
        });
        setMessageList(msgData);
        // console.log(msgData);
      } catch (error) {
        decoded = error;
      }
    })();
  }, [_messageList]);

  useEffect(() => {
    console.log('CHANGE SOCKET');
  }, [_messageList]);

  return (
    <>
      <ScrollView
        style={styles.chatWrapper}
        ref={scrollViewRef}
        onContentSizeChange={() =>
          scrollViewRef.current.scrollToEnd({animated: true})
        }>
        {messageList.map(m => {
          if (m._to === userId.toString()) {
            if (m.showDate) {
              return (
                <View style={styles.messageWrapper} key={m.id}>
                  <View style={styles.date}>
                    <Text style={styles.dateText}>
                      {moment(m.date, 'DD-MM-YYYYTHH-mm-ss').format(
                        'dddd, MMMM Do YYYY',
                      )}
                    </Text>
                  </View>
                  <View style={styles.textWrapper}>
                    <Text style={styles.text}>{m.content}</Text>
                  </View>
                </View>
              );
            } else {
              return (
                <View style={styles.messageWrapperChild} key={m.id}>
                  <View style={styles.textWrapper}>
                    <Text style={styles.text}>{m.content}</Text>
                  </View>
                </View>
              );
            }
          }

          if (m._from === userId.toString()) {
            if (m.showDate) {
              return (
                <View style={styles.messageWrapper} key={m.id}>
                  <View style={styles.date}>
                    <Text style={styles.dateText}>
                      {moment(m.date, 'DD-MM-YYYYTHH-mm-ss').format(
                        'dddd, MMMM Do YYYY',
                      )}
                    </Text>
                  </View>
                  <View style={styles.textWrapperUser}>
                    <Text style={styles.textUser}>{m.content}</Text>
                  </View>
                </View>
              );
            } else {
              return (
                <View style={styles.messageWrapperChild} key={m.id}>
                  <View style={styles.textWrapperUser}>
                    <Text style={styles.textUser}>{m.content}</Text>
                  </View>
                </View>
              );
            }
          }
        })}
        <View style={styles.spacer}></View>
      </ScrollView>
      <View style={styles.inputWrapper}>
        <TextInput
          placeholder="Send a message.."
          style={styles.textInput}
          onChangeText={e => {
            setMessageInput(e);
          }}
          value={messageInput}
        />
        <TouchableOpacity
          onPress={() => {
            socket.current.emit('private message', {
              content: messageInput,
              from: userId,
              to: chosedChat,
              date: moment().format('DD-MM-YYYYTHH-mm-ss'),
            });
            Keyboard.dismiss();
            setMessageInput('');
          }}>
          <Text style={styles.sendButton}>Send</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Chat;

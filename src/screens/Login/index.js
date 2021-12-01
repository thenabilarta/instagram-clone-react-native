import React, {useState, useContext} from 'react';
import {Image, Text, View, TouchableOpacity} from 'react-native';
// import Container from '../../components/Common/Container';
import Container from '../../components/Common/Container';
import CustomButton from '../../components/Common/CustomButton';
import Input from '../../components/Common/Input';
import Message from '../../components/Common/Message';
import loginUser from '../../context/actions/auth/loginUser';
import {GlobalContext} from '../../context/Provider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
// import {REGISTER} from '../../constants/routeNames';
import styles from './styles';

const App = ({form, justSignedUp, onChange, onSubmit}) => {
  // const {navigate} = useNavigation();
  const [isSecureEntry, setIsSecureEntry] = useState(true);

  const {
    authDispatch,
    authState: {error, loading},
  } = useContext(GlobalContext);

  console.log(error, loading);

  return (
    <Container>
      <Image
        height={70}
        width={70}
        source={require('../../assets/loginlogo.png')}
        style={styles.logoImage}
      />

      <View>
        {/* <Text style={styles.title}>Welcome to RNContacts</Text>
        <Text style={styles.subTitle}>Please login here</Text> */}

        <View style={styles.form}>
          {/* {justSignedUp && (
            <Message
              onDismiss={() => {}}
              success
              message="Account created successfully"
            />
          )}
          {error && !error.error && (
            <Message
              onDismiss={() => {}}
              danger
              message="invalid credentials"
            />
          )} */}

          {/* {error?.error && <Message danger onDismiss message={error?.error} />} */}

          <Input
            label="Username"
            iconPosition="right"
            placeholder="Enter Username"
            // value={form.userName || null}
            onChangeText={value => {
              onChange({name: 'userName', value});
            }}
          />

          <Input
            label="Password"
            placeholder="Enter Password"
            secureTextEntry={isSecureEntry}
            icon={
              <TouchableOpacity
                onPress={() => {
                  setIsSecureEntry(prev => !prev);
                }}>
                <Text>{isSecureEntry ? 'Show' : 'Hide'}</Text>
              </TouchableOpacity>
            }
            iconPosition="right"
            onChangeText={value => {
              // onChange({name: 'password', value});
              console.log(value);
            }}
          />

          <CustomButton
            // disabled={loading}
            onPress={() => {
              console.log('pwaereawre');
              loginUser({
                userName: 'admin',
                password: '123123',
              })(authDispatch);
            }}
            // loading={loading}
            primary
            title={`Submit`}
          />

          <View style={styles.createSection}>
            <Text style={styles.infoText}>Need a new account?</Text>
            <TouchableOpacity
              onPress={async () => {
                // navigate(REGISTER);
                const test = await AsyncStorage.getItem('token');
                console.log('token', test);
              }}>
              <Text style={styles.linkBtn}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Container>
  );
};

export default App;

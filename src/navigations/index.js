import React, {useEffect, useContext, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthNavigator from './AuthNavigator';
import BottomTabNavigator from './BottomTabNavigator';
import {GlobalContext} from '../context/Provider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ActivityIndicator} from 'react-native';
import SplashScreen from 'react-native-splash-screen';

const AppNavContainer = () => {
  const {
    // authState: {loading},
    authState: {isLoggedIn},
  } = useContext(GlobalContext);

  // const [isAuthenticated, setIsAuthenticated] = React.useState(isLoggedIn);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authLoaded, setAuthLoaded] = useState(false);

  // useEffect(() => {
  //   console.log('HAHAHA', isLoggedIn);
  //   if (isLoggedIn) {
  //     setIsAuthenticated(true);
  //   } else {
  //     setIsAuthenticated(false);
  //   }
  // }, [isLoggedIn]);

  const getUser = async () => {
    try {
      const user = await AsyncStorage.getItem('token');
      if (user) {
        setAuthLoaded(true);

        setIsAuthenticated(true);
      } else {
        setAuthLoaded(true);

        setIsAuthenticated(false);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getUser();
    console.log('isLoggedIn', isLoggedIn);
  }, [isLoggedIn]);

  React.useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <>
      {authLoaded ? (
        <NavigationContainer>
          {isAuthenticated ? <BottomTabNavigator /> : <AuthNavigator />}
        </NavigationContainer>
      ) : (
        <ActivityIndicator />
      )}
    </>
    // <>
    //   {authLoaded ? (
    //     <NavigationContainer>
    //       {/* {isAuthenticated ? <BottomTabNavigator /> : <AuthNavigator />} */}
    //       <AuthNavigator />
    //     </NavigationContainer>
    //   ) : (
    //     <ActivityIndicator />
    //   )}
    // </>
  );
};

export default AppNavContainer;

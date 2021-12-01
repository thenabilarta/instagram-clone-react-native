import React, {useEffect, useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthNavigator from './AuthNavigator';
import BottomTabNavigator from './BottomTabNavigator';
import {GlobalContext} from '../context/Provider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ActivityIndicator} from 'react-native';
import SplashScreen from 'react-native-splash-screen';

const AppNavContainer = () => {
  const {
    authState: {loading},
    // authState: {isLoggedIn},
  } = useContext(GlobalContext);

  // const [isAuthenticated, setIsAuthenticated] = React.useState(isLoggedIn);
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [authLoaded, setAuthLoaded] = React.useState(false);

  useEffect(() => {
    console.log('HAHAHA');
    if (loading) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [loading]);

  // const getUser = async () => {
  //   try {
  //     const user = await AsyncStorage.getItem('token');
  //     if (user) {
  //       setAuthLoaded(true);

  //       setIsAuthenticated(true);
  //     } else {
  //       setAuthLoaded(true);

  //       setIsAuthenticated(false);
  //     }
  //   } catch (error) {}
  // };

  // useEffect(() => {
  //   getUser();
  // }, [isLoggedIn]);

  React.useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <NavigationContainer>
      {isAuthenticated ? <BottomTabNavigator /> : <AuthNavigator />}
      {/* <AuthNavigator /> */}
    </NavigationContainer>
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

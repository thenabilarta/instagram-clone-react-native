import 'react-native-gesture-handler';
import React from 'react';
import Login from './src/screens/Login';
// import AppNavContainer from './src/navigations';
import GlobalProvider from './src/context/Provider';

import BottomTabNavigator from './src/navigations/BottomTabNavigator';
import AppNavContainer from './src/navigations';

const App = () => {
  return (
    <GlobalProvider>
      <AppNavContainer />
      {/* <AppNavContainer /> */}
    </GlobalProvider>
  );
};

export default App;

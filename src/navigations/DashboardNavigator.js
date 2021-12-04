import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {DASHBOARD, ADD_COMMENT, MESSAGE, CHAT} from '../constants/routeNames';
import {useNavigation} from '@react-navigation/native';

import Dashboard from '../screens/Dashboard';
import Comments from '../screens/Comments';
import Message from '../screens/Message';
import Chat from '../screens/Chat';

const DashboardNavigator = () => {
  const HomeStack = createStackNavigator();
  const navigation = useNavigation();
  return (
    <HomeStack.Navigator initialRouteName={DASHBOARD}>
      <HomeStack.Screen
        name={DASHBOARD}
        component={Dashboard}
        options={{
          headerTitle: '',
          headerLeft: () => (
            <Image
              style={styles.image}
              source={require('../assets/loginlogo.png')}
            />
          ),
          headerRight: () => (
            <View style={styles.rightIconWrapper}>
              <Icon
                style={styles.rightIcon}
                name="ios-add-circle-outline"
                size={28}
              />
              <TouchableWithoutFeedback
                onPress={() => {
                  navigation.navigate(MESSAGE);
                }}>
                <Icon
                  style={styles.rightIcon}
                  name="paper-plane-outline"
                  size={28}
                />
              </TouchableWithoutFeedback>
            </View>
          ),
          headerShadowVisible: true,
        }}
      />
      <HomeStack.Screen
        name={ADD_COMMENT}
        component={Comments}
        options={{
          title: 'Comments',
        }}
      />
      <HomeStack.Screen
        name={MESSAGE}
        component={Message}
        options={{
          title: 'Message',
        }}
      />
      <HomeStack.Screen
        name={CHAT}
        component={Chat}
        options={{
          title: 'Chat',
        }}
      />
    </HomeStack.Navigator>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    aspectRatio: 2.2,
    marginLeft: 10,
    resizeMode: 'contain',
  },
  rightIcon: {
    marginRight: 10,
  },
  rightIconWrapper: {
    marginRight: 10,
    display: 'flex',
    flexDirection: 'row',
  },
});

export default DashboardNavigator;

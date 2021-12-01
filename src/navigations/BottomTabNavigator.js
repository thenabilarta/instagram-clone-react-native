import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import Profile from '../screens/Profile';
import Dashboard from '../screens/Dashboard';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator initialRouteName="Home" activeColor="#fff">
      <Tab.Screen
        name="Product List"
        component={Dashboard}
        options={{
          // tabBarLabel: 'Product',
          tabBarColor: '#009387',
          tabBarIcon: ({color}) => (
            <Icon name="ios-home" color={color} size={22} />
          ),
          // headerShown: false,
          tabBarShowLabel: false,
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
              <Icon
                style={styles.rightIcon}
                name="paper-plane-outline"
                size={28}
              />
            </View>
          ),
          headerShadowVisible: true,
        }}
      />
      <Tab.Screen
        name="Insert Product"
        component={Profile}
        options={{
          tabBarLabel: 'Insert',
          tabBarColor: '#1f65ff',
          tabBarIcon: ({color}) => (
            <Icon name="add-circle-outline" color={color} size={22} />
          ),
        }}
      />
    </Tab.Navigator>
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

export default BottomTabNavigator;

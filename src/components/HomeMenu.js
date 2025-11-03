import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

const Tab = createBottomTabNavigator();

export default function HomeMenu() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={Home} options={ { tabBarIcon: () => <FontAwesome5 name="warehouse" size={24} color="black" /> }} />
      <Tab.Screen name="Profile" component={Profile} options={ { tabBarIcon: () => <AntDesign name="profile" size={24} color="black" /> }} />
    </Tab.Navigator>
  );
}



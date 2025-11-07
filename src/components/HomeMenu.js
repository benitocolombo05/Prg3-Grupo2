import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStack from '../components/HomeStack';
import Profile from '../screens/Profile';
import NewPost from '../screens/NewPost';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

const Tab = createBottomTabNavigator();

export default function HomeMenu() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false, tabBarShowLabel: false }}>
      <Tab.Screen name="HomeStack" component={HomeStack} options={ { tabBarIcon: () => <FontAwesome5 name="home" size={24} color="black" /> }} />
      <Tab.Screen name="NewPost" component={NewPost} options={ { tabBarIcon: () => <FontAwesome5 name="plus" size={24} color="black" /> }} />
      <Tab.Screen name="Profile" component={Profile} options={ { tabBarIcon: () => <FontAwesome5 name="user" size={24} color="black" /> }} />
    </Tab.Navigator>
  );
}
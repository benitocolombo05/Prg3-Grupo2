import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import AddComment from '../screens/AddComment';

const Stack = createNativeStackNavigator();
export default function HomeStack() {
  return (
      <Stack.Navigator >
        <Stack.Screen name="Home" component={Home} options={ {headerShown: false}}/>
        <Stack.Screen name="AddComment" component={AddComment} options={ {headerShown: false}}/>
      </Stack.Navigator>
  );
}
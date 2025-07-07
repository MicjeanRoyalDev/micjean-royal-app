// apps/customer/navigation/ProfileStack.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from '../ProfileScreen';
import OrdersScreen from '../../Cart/Cart';
import ContactScreen from './ContactScreen.js';
import PolicyScreen from './PolicyScreen.js';
import EmptyCartScreen from '../../Cart/EmptyCart';

const Stack = createStackNavigator();

export default function ProfileStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProfileMain" component={ProfileScreen} />
      <Stack.Screen name="Orders" component={EmptyCartScreen} />
      <Stack.Screen name="Contact" component={ContactScreen} />
      <Stack.Screen name="Policy" component={PolicyScreen} />
    </Stack.Navigator>
  );
}

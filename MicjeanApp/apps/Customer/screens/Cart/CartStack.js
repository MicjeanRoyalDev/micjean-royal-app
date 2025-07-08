// CartStack.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CartScreen from './Cart';
import CheckoutScreen from './CheckoutScreen'; 

const Stack = createStackNavigator();

export default function CartStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CartMain" component={CartScreen} />
      <Stack.Screen name="Checkout" component={CheckoutScreen} />
    </Stack.Navigator>
  );
}

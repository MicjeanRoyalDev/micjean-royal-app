// apps/customer/App.js
import React from 'react';
import { AppRegistry } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './navigation/AuthStack';

const App = () => (
  <NavigationContainer>
    <AuthStack />
  </NavigationContainer>
);

// Register the app component with the name "main"
AppRegistry.registerComponent('main', () => App);

export default App;
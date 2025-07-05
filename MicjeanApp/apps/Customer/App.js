// apps/customer/App.js
import React, { useEffect, useState } from 'react';
import { AppRegistry } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './navigation/AuthStack';
import BottomNavbar from './navigation/BottomNavbar';
import { supabase } from './auth/clients';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      setIsAuthenticated(!!data.session);
      setLoading(false);
    };

    checkSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  if (loading) return null;

  return (
    <NavigationContainer>
      {isAuthenticated ? <BottomNavbar /> : <AuthStack />}
    </NavigationContainer>
  );
};

AppRegistry.registerComponent('main', () => App);

export default App;
{/*I am still working on the kinks*/}
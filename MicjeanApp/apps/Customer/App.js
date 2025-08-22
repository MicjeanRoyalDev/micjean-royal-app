// apps/customer/App.js
import React, { useEffect, useState } from 'react';
import { AppRegistry } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AuthStack from './navigation/AuthStack';
import BottomNavbar from './components/BottomNavbar';
import { supabase } from '../../backend/supabase/clients';
import { NavigationContainer } from '@react-navigation/native';
import { CartProvider } from './context/CartContext';

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
    <SafeAreaProvider>
      <CartProvider>
        <NavigationContainer>
          {isAuthenticated ? <BottomNavbar /> : <AuthStack />}
        </NavigationContainer>
      </CartProvider>
    </SafeAreaProvider>
  );
};

AppRegistry.registerComponent('main', () => App);

export default App;
{/*I am still working on the kinks*/}
import React, { useEffect, useState } from 'react';
import { AppRegistry, StatusBar } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import AuthStack from './navigation/AuthStack';
import BottomNavbar from './components/BottomNavbar';
import { supabase } from '../../backend/supabase/clients';
import { NavigationContainer } from '@react-navigation/native';
import { CartProvider } from './context/CartContext';

const SafeAreaLogger = () => {
  const insets = useSafeAreaInsets();
  useEffect(() => {
    console.log("App started running on device");
    console.log("Safe Area Insets:", insets);
  }, [insets]);
  return null;
};

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      setIsAuthenticated(!!data.session);
      setLoading(false);
    };
    checkSession();
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  if (loading) return null;

  return (
    <SafeAreaProvider style={{ flex: 1, paddingTop: 0, paddingBottom: 0 }}>
      {/* Force Android to draw behind system bars */}
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      <SafeAreaLogger />
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

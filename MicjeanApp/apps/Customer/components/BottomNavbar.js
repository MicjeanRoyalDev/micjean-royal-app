import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import ProfileStack from '../screens/Profile/parts/ProfileStack';
import HomeScreen from '../screens/HomeScreen';
import MenuScreen from '../screens/MenuScreen';
import CartScreen from '../screens/Cart/Cart'
import { ThemeProvider, createTheme } from '@rneui/themed';

const theme = createTheme({
  lightColors: {
    primary: '#ffff',
    secondary: '#000000',
    background: '#B71C1C',
  },
  darkColors: {
    primary: '#710707',
    secondary: '#d2dae2',
    background: '#1e272e',
  },
  mode: 'light', 
});

export default function BottomNavbar() {
  function Orders() {
    return null;
  }

  const Tab = createBottomTabNavigator();

  return (
    <ThemeProvider theme={theme}>
        <Tab.Navigator
        //making the home the initial route
         initialRouteName='Home'
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              
              if (route.name === 'Home') {
                iconName = 'home';
              } else if (route.name === 'Menu') {
                iconName = 'local-dining';
              } else if (route.name === 'Orders') {
                iconName = 'list-alt';
              } else if (route.name === 'Profile') {
                iconName = 'person';
              }
              
              return (
                <MaterialIcons name={iconName} color={color} size={size} />
              );
            },
            tabBarStyle: {
              backgroundColor: theme.lightColors.background,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              borderBottomLeftRadius:20,
              borderBottomRightRadius:20,
              height: 56,
              position: 'absolute',      
              bottom: 45,                 
              left: 0,                   
              right: 0,  
              alignSelf:'center',            
              elevation: 30,            
              shadowColor: '#000',       
              shadowOffset: { width: 0, height: -3 }, 
              shadowOpacity: 0.1,        
              shadowRadius: 5,           
              zIndex: 100,              
            },
            tabBarActiveTintColor: theme.lightColors.primary,
            tabBarInactiveTintColor: theme.lightColors.secondary,
            tabBarLabelStyle: {
              fontSize: 12,
              marginBottom: 10, 
            },
            tabBarItemStyle: {
              paddingVertical: 5, 
            },
          })}
        >
          <Tab.Screen 
            name="Home" 
            component={HomeScreen} 
            options={{ headerShown: false }} 
          />
          <Tab.Screen 
            name="Menu" 
            component={MenuScreen} 
            options={{ headerShown: false }} 
          />
          {/*I am yet to add the orders or cart screen*/}
          <Tab.Screen 
            name="Orders" 
            component={CartScreen} 
            options={{ headerShown: false }} 
          />
          <Tab.Screen 
            name="Profile" 
            component={ProfileStack} 
            options={{ 
              headerShown: true,
              headerStyle: {
                backgroundColor: theme.lightColors.background,
              },
              headerTintColor: theme.lightColors.primary,
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }} 
          />
        </Tab.Navigator>
    </ThemeProvider>
  );
}
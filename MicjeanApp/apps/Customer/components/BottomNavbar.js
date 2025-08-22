import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import ProfileStack from '../screens/Profile/parts/ProfileStack';
import HomeScreen from '../screens/HomeScreen';
import MenuScreen from '../screens/MenuScreen';
import CartStack from '../screens/Cart/CartStack';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
// Removed RNEUI ThemeProvider and createTheme
import { useCart } from '../context/CartContext';

const theme = {
  lightColors: {
    primary: '#ffff',
    secondary: '#000000',
    background: '#068a0fff',
  },
};

export default function BottomNavbar() {
  const { getCartItemCount } = useCart();
  
  function Orders() {
    return null;
  }

  const Tab = createBottomTabNavigator();

  const CartIcon = ({ focused, color, size }) => {
    const itemCount = getCartItemCount();
    return (
      <View style={styles.cartIconContainer}>
        <MaterialIcons name="list-alt" color={color} size={size} />
        {itemCount > 0 && (
          <View style={styles.cartBadge}>
            <Text style={styles.cartBadgeText}>{itemCount}</Text>
          </View>
        )}
      </View>
    );
  };

  return (
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
                return <CartIcon focused={focused} color={color} size={size} />;
              } else if (route.name === 'Profile') {
                iconName = 'person';
              }
              
              return (
                <MaterialIcons name={iconName} color={color} size={size} />
              );
            },
            tabBarStyle: {
              backgroundColor: theme.lightColors.background,
              borderRadius: 20,
              height: 56,
              position: 'absolute',      
              bottom: 45,                   
              marginHorizontal:8,                  
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
            component={CartStack} 
           options={({ route }) => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'Orders';
    const hideTabBar = routeName == 'Orders';
    return {
      headerShown: false,
      tabBarStyle: hideTabBar? { display: 'none' }
        : {
            backgroundColor: theme.lightColors.background,
            borderRadius: 20,
            height: 56,
            position: 'absolute',
            bottom: 45,
            marginHorizontal: 8,
            alignSelf: 'center',
            elevation: 30,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: -3 },
            shadowOpacity: 0.1,
            shadowRadius: 5,
            zIndex: 100,
          },
    };
  }}
          />
       <Tab.Screen
  name="Profile"
  component={ProfileStack}
  options={({ route }) => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'ProfileMain';
    const hideTabBar = routeName !== 'ProfileMain';
    return {
      headerShown: false,
      tabBarStyle: hideTabBar? { display: 'none' }
        : {
            backgroundColor: theme.lightColors.background,
            borderRadius: 20,
            height: 56,
            position: 'absolute',
            bottom: 45,
            marginHorizontal: 8,
            alignSelf: 'center',
            elevation: 30,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: -3 },
            shadowOpacity: 0.1,
            shadowRadius: 5,
            zIndex: 100,
          },
    };
  }}
/>



        </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  cartIconContainer: {
    position: 'relative',
  },
  cartBadge: {
    position: 'absolute',
    right: -6,
    top: -3,
    backgroundColor: '#f3c807ff',
    borderRadius: 10,
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
});

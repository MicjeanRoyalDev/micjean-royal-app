import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const BottomNavbar = ({ activeTab = 'home', onTabPress }) => {
  const navigation = useNavigation();
  
  const navItems = [
    { id: 'home', icon: '🏠', label: 'Home' },
    { id: 'menu', icon: '🍽️', label: 'Menu' },
    { id: 'cart', icon: '🛒', label: 'Cart' },
    { id: 'profile', icon: '👤', label: 'Profile' }
  ];

  const handleTabPress = (tabId) => {
    // Navigate to appropriate screens
    if (tabId === 'home') {
      navigation.navigate('Home');
    } else if (tabId === 'menu') {
      navigation.navigate('Menu');
    }
    // Add navigation for cart and profile when ready
    
    // Call parent onTabPress if provided
    if (onTabPress) {
      onTabPress(tabId);
    }
  };

  return (
    <View style={styles.navContainer}>
      <View style={styles.bottomNav}>
        {navItems.map((item) => (
          <TouchableOpacity 
            key={item.id}
            style={[
              styles.navItem,
              activeTab === item.id && styles.activeNavItem
            ]}
            onPress={() => handleTabPress(item.id)}
          >
            <Text style={[
              styles.navIcon,
              activeTab === item.id && styles.activeNavIcon
            ]}>
              {item.icon}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  navContainer: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    paddingHorizontal: 5,
    paddingBottom: 10,
  },
  bottomNav: {
    backgroundColor: '#B71C1C',
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -5,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 5,
    borderRadius: 15,
  },
  activeNavItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  navIcon: {
    fontSize: 26,
    color: 'white',
  },
  activeNavIcon: {
    color: '#FFD700', // Gold color for active state
  },
});

export default BottomNavbar;

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from '../ProfileScreen';
import OrderHistory from '../../Cart/OrderHistory.js';
import ContactScreen from './ContactScreen.js';
import PolicyScreen from './PolicyScreen.js';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const Stack = createStackNavigator();

const CustomHeader = ({ navigation, title }) => (
  <View style={styles.headerContainer}>
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <MaterialIcons name="arrow-back" size={24} color='#1b5e20' />
    </TouchableOpacity>
    <Text style={styles.headerTitle}>{title}</Text>
  </View>
);

export default function ProfileStack({ navigation }) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProfileMain"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="OrderHistory"
        component={OrderHistory}
        options={({ navigation }) => ({
          header: () => <CustomHeader navigation={navigation} title="My Orders" />,
        })}
      />
      <Stack.Screen
        name="Contact"
        component={ContactScreen}
        options={({ navigation }) => ({
          header: () => <CustomHeader navigation={navigation} title="Contact Us" />,
        })}
      />
      <Stack.Screen
        name="Policy"
        component={PolicyScreen}
        options={({ navigation }) => ({
          header: () => <CustomHeader navigation={navigation} title="Privacy Policy" />,
        })}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingTop: 50,
    backgroundColor: 'white',
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 16,
    color: '#068a0fff',
  },
});

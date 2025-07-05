import React from 'react';
import { Button } from '@rneui/themed';
import { StyleSheet, Alert } from 'react-native';
import { supabase } from './clients'; 

export default function LogoutBtn({ onLogoutSuccess }) {
  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        Alert.alert('Logout Error', error.message);
        return;
      }
      
      // Call the success callback if provided
      if (onLogoutSuccess) {
        onLogoutSuccess();
      }
      
    } catch (error) {
      Alert.alert('Error', 'An unexpected error occurred during logout');
      console.error('Logout error:', error);
    }
  };

  return (
    <Button
      title="Logout"
      type="solid"
      buttonStyle={styles.button}
      titleStyle={styles.buttonText}
      //onPress={handleLogout}
    />
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#ba272e',
    borderRadius: 25,
    paddingVertical: 12,
    width: 160,
    alignSelf: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 19,
    fontWeight: '600',
  },
});
import React from 'react';
import { Button } from '@rneui/themed';
import { StyleSheet, Alert } from 'react-native';
import { auth } from '../../../../../backend/supabase/auth'

export default function LogoutBtn({ onLogoutSuccess }) {
  const logout = async () => {
    try {
      const { error } = await auth.logout();
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
      onPress={logout}
    />
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#01860aff',
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
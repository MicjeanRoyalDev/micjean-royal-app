import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { testAuth } from '../../../backend/supabase/testAuth';

const AuthTestComponent = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Auth Test Panel</Text>
      
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => testAuth.testRegister()}
      >
        <Text style={styles.buttonText}>Test Register</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => testAuth.testLogin()}
      >
        <Text style={styles.buttonText}>Test Login</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => testAuth.testGetProfile()}
      >
        <Text style={styles.buttonText}>Test Get Profile</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => testAuth.testLogout()}
      >
        <Text style={styles.buttonText}>Test Logout</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[styles.button, styles.primaryButton]} 
        onPress={() => testAuth.runAllTests()}
      >
        <Text style={[styles.buttonText, styles.primaryButtonText]}>Run All Tests</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f5f5f5',
    margin: 10,
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#fff',
    padding: 12,
    marginVertical: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  primaryButton: {
    backgroundColor: '#B80000',
    borderColor: '#B80000',
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#333',
  },
  primaryButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default AuthTestComponent;

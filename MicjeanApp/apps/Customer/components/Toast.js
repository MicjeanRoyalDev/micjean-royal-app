import React from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

const Toast = ({ message, type = 'info', visible }) => {
  if (!visible) return null;

  let backgroundColor = '#069910ff'; // default (primary green)
  if (type === 'error') backgroundColor = '#e74c3c';
  if (type === 'success') backgroundColor = '#44a81cff';
  if (type === 'warning') backgroundColor = '#f1c40f';

  return (
    <Animated.View style={[styles.toast, { backgroundColor }]}> 
      <Text style={styles.toastText}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  toast: {
    position: 'absolute',
    top: '30%',
    left: 20,
    right: 20,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    zIndex: 9999,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 8,
  },
  toastText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Toast;

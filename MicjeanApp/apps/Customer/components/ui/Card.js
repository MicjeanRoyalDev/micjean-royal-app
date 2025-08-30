import React from 'react';
import { View, StyleSheet } from 'react-native';

export default function Card({ containerStyle, children, ...rest }) {
  return (
    <View {...rest} style={[styles.container, containerStyle]} accessibilityRole="summary">
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    padding: 16,
  },
});



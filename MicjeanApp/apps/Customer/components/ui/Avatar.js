import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const sizeMap = { small: 34, medium: 50, large: 64 };

export default function Avatar({
  size = 'small',
  rounded = false,
  title = '',
  overlayContainerStyle = {},
  containerStyle,
}) {
  const dimension = typeof size === 'number' ? size : sizeMap[size] || sizeMap.small;
  const borderRadius = rounded ? dimension / 2 : 8;
  const backgroundColor = overlayContainerStyle?.backgroundColor || '#cccccc';

  return (
    <View
      style={[
        styles.container,
        {
          width: dimension,
          height: dimension,
          borderRadius,
          backgroundColor,
        },
        containerStyle,
      ]}
      accessible
      accessibilityRole="image"
    >
      {!!title && <Text style={[styles.titleText, { fontSize: dimension / 2.5 }]}>{title}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  titleText: {
    color: '#ffffff',
    fontWeight: '600',
  },
});



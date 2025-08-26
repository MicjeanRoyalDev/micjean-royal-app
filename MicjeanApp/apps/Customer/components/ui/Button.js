import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';

export default function Button({
  title,
  onPress,
  type = 'solid',
  buttonStyle,
  titleStyle,
  disabled,
  loading,
  accessibilityLabel,
  ...rest
}) {
  const isDisabled = !!disabled || !!loading;
  const containerStyles = [
    styles.base,
    type === 'outline' ? styles.outline : type === 'clear' ? styles.clear : styles.solid,
    isDisabled && styles.disabled,
    buttonStyle,
  ];
  const textStyles = [
    styles.text,
    type === 'outline' && styles.textOutline,
    type === 'clear' && styles.textClear,
    titleStyle,
  ];

  return (
    <TouchableOpacity
      {...rest}
      accessible
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled }}
      accessibilityLabel={accessibilityLabel || title}
      onPress={isDisabled ? undefined : onPress}
      style={containerStyles}
      activeOpacity={0.7}
      disabled={isDisabled}
    >
      {loading ? (
        <ActivityIndicator color={type === 'outline' || type === 'clear' ? '#1b5e20' : '#ffffff'} />
      ) : (
        <Text style={textStyles}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 0,
  },
  solid: {
    backgroundColor: '#1b5e20',
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#1b5e20',
  },
  clear: {
    backgroundColor: 'transparent',
  },
  disabled: {
    opacity: 0.6,
  },
  text: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  textOutline: {
    color: '#1b5e20',
  },
  textClear: {
    color: '#1b5e20',
  },
});



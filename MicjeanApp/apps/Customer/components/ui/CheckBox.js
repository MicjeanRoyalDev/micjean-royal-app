import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function CheckBox({
  title,
  checked = false,
  onPress,
  containerStyle,
  textStyle,
  checkedColor = '#1b5e20',
  uncheckedColor = '#cccccc',
  ...rest
}) {
  return (
    <TouchableOpacity
      {...rest}
      onPress={onPress}
      style={[styles.container, containerStyle]}
      accessible
      accessibilityRole="checkbox"
      accessibilityState={{ checked }}
    >
      <View
        style={[
          styles.box,
          {
            borderColor: checked ? checkedColor : uncheckedColor,
            backgroundColor: checked ? checkedColor : 'transparent',
          },
        ]}
      >
        {checked && <MaterialIcons name="check" size={16} color="#ffffff" />}
      </View>
      <Text style={[styles.label, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  box: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  label: {
    fontSize: 16,
    color: '#333333',
  },
});



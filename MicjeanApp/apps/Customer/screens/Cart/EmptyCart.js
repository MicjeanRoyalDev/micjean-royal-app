import React from 'react';
import { View, Text,StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Button } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';

export default function EmptyCartScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
     <MaterialIcons
    name="remove-shopping-cart"
    size={120}
    color="#AC030A"
    style={{ marginBottom: 24 }}
  />
      {/* Main Message */}
      <Text style={styles.title}>Your Cart is Empty</Text>
      <Text style={styles.description}>
        Looks like you haven’t added anything to your cart yet.
      </Text>

      {/* Button to go back to Menu */}
      <Button
        title="Go to Menu"
        onPress={() => navigation.navigate('Menu')}
        buttonStyle={styles.button}
        titleStyle={styles.buttonText}
      />
    </View>
  );
}
//maybe an image would be used for the background later
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center',   
    padding: 20,
    backgroundColor: '#fff',  
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#ba272e',
    borderRadius: 25,
    paddingHorizontal: 30,
    paddingVertical: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});


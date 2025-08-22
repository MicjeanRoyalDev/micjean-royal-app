import React from 'react';
import { TouchableOpacity,View, Text,StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function EmptyCartScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
        {/* Back Button */}
        <View style={styles.backButton}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
              <MaterialIcons name="arrow-back" size={28} color='#03940dff' />
            </TouchableOpacity>
            <Text style={styles.heading}>Your Cart</Text>
      </View>
     <MaterialIcons
    name="remove-shopping-cart"
    size={120}
    color='#009b0aff'
    style={{ marginBottom: 24 }}
  />
      {/* Main Message */}
      <Text style={styles.title}>Your Cart is Empty</Text>
      <Text style={styles.description}>
       Go to the menu to start shopping!.
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
    heading: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 20,
    marginTop:27,
    textAlign: 'center',
    marginLeft: 110,
    color: '#03940dff',
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
   backButton: {
    position: 'absolute',
    top: 26,
    left: 6,
    zIndex: 10,
    padding: 8,
  },
  button: {
    backgroundColor: '#03940dff',
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


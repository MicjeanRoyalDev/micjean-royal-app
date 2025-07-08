import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { Button } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons'; 

export default function CheckoutScreen() {
  const navigation = useNavigation();
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');

  const dummyItems = [
    { id: 1, name: 'Jollof Rice', quantity: 2, price: 25 },
    { id: 2, name: 'Chicken Wings', quantity: 1, price: 18 },
  ];

  const total = dummyItems.reduce((sum, item) => sum + item.quantity * item.price, 0);

  const placeOrder = () => {
    if (!fullName || !address || !phone) {
      Alert.alert('Missing Information', 'Please fill in all the fields.');
      return;
    }

    Alert.alert('Order Placed', 'Thank you! Your food is on the way.', [
      { text: 'OK', onPress: () => navigation.navigate('Home') },
    ]);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 100 }}>
      {/* Back Button */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <MaterialIcons name="arrow-back" size={24} color="#ba272e" />
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Order Summary</Text>
      {dummyItems.map((item) => (
        <View key={item.id} style={styles.itemRow}>
          <Text style={styles.itemName}>
            {item.name} x{item.quantity}
          </Text>
          <Text style={styles.itemPrice}>
            GH¢ {(item.price * item.quantity).toFixed(2)}
          </Text>
        </View>
      ))}
      <View style={styles.totalRow}>
        <Text style={styles.totalLabel}>Total:</Text>
        <Text style={styles.totalAmount}>GH¢ {total.toFixed(2)}</Text>
      </View>

      <Text style={styles.sectionTitle}>Delivery Information</Text>
      <TextInput
        placeholder="Full Name"
        value={fullName}
        onChangeText={setFullName}
        style={styles.input}
      />
      <TextInput
        placeholder="Delivery Address"
        value={address}
        onChangeText={setAddress}
        style={styles.input}
        multiline
      />
      <TextInput
        placeholder="Phone Number"
        value={phone}
        onChangeText={setPhone}
        style={styles.input}
        keyboardType="phone-pad"
      />

      <Button
        title="Place Order"
        buttonStyle={styles.orderButton}
        onPress={placeOrder}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 0,
    zIndex: 10,
    padding: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 20,
    left:50,
    marginTop: 30, 
    color: '#ba272e',
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '500',
  },
  itemPrice: {
    fontSize: 16,
    color: '#444',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 14,
    borderTopWidth: 1,
    borderColor: '#eee',
    paddingTop: 10,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '700',
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ba272e',
  },
  input: {
    backgroundColor: '#f9f9f9',
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 12,
  },
  orderButton: {
    backgroundColor: '#ba272e',
    borderRadius: 25,
    marginTop: 20,
    paddingVertical: 12,
    width: 150,
    alignSelf: 'center',
  },
});

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  Alert,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Button from '../../components/ui/Button';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons'; 
import { useCart } from '../../context/CartContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context'; 

export default function CheckoutScreen() {
  const navigation = useNavigation();
  const { cart, getCartTotal, clearCart } = useCart();
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const insets = useSafeAreaInsets();

  const placeOrder = () => {
    if (!fullName || !address || !phone) {
      Alert.alert('Missing Information', 'Please fill in all the fields.');
      return;
    }

    if (cart.items.length === 0) {
      Alert.alert('Empty Cart', 'Your cart is empty. Add some items before placing an order.');
      return;
    }

    Alert.alert('Order Placed', 'Thank you! Your food is on the way.', [
      { text: 'OK', onPress: () => {
        clearCart(); // Clear cart after successful order
        navigation.navigate('Home');
      }},
    ]);
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
    >
      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={[styles.scrollContent, { paddingBottom: 56 + insets.bottom }]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Back Button */}
        <TouchableOpacity onPress={() => navigation.goBack()} style={[styles.backButton, { top: insets.top + 20 }]}>
          <MaterialIcons name="arrow-back" size={24} color="#0f9902ff" />
        </TouchableOpacity>

        <Text style={[styles.sectionTitle, { marginTop: insets.top + 60 }]}>Order Summary</Text>
        {cart.items.length > 0 ? (
          <>
            {cart.items.map((item) => (
              <View key={item.cartId} style={styles.itemRow}>
                <View style={styles.itemDetails}>
                  <Text style={styles.itemName}>
                    {item.name} x{item.quantity}
                  </Text>
                  {item.selectedAddons.length > 0 && (
                    <Text style={styles.addonsText}>
                      + {item.selectedAddons.map(addon => addon.name).join(', ')}
                    </Text>
                  )}
                </View>
                <Text style={styles.itemPrice}>
                  GHC {(item.totalPrice * item.quantity).toFixed(2)}
                </Text>
              </View>
            ))}
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total:</Text>
              <Text style={styles.totalAmount}>GHC {getCartTotal()}</Text>
            </View>
          </>
        ) : (
          <View style={styles.emptyCart}>
            <Text style={styles.emptyCartText}>No items in cart</Text>
            <Button 
              title="Go to Menu" 
              buttonStyle={styles.menuButton}
              onPress={() => navigation.navigate('Menu')}
            />
          </View>
        )}

        <Text style={styles.sectionTitle}>Delivery Information</Text>
        <TextInput
          placeholder="Full Name"
          value={fullName}
          onChangeText={setFullName}
          style={styles.input}
          returnKeyType="next"
        />
        <TextInput
          placeholder="Delivery Address"
          value={address}
          onChangeText={setAddress}
          style={styles.input}
          multiline
          returnKeyType="next"
        />
        <TextInput
          placeholder="Phone Number"
          value={phone}
          onChangeText={setPhone}
          style={styles.input}
          keyboardType="phone-pad"
          returnKeyType="done"
        />

        <Button
          title="Place Order"
          buttonStyle={[styles.orderButton, cart.items.length === 0 && styles.disabledButton]}
          onPress={placeOrder}
          disabled={cart.items.length === 0}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  backButton: {
    position: 'absolute',
    left: 0,
    zIndex: 10,
    padding: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 20,
    left: 50,
    color: '#1b5e20',
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0ff',
  },
  itemDetails: {
    flex: 1,
    marginRight: 10,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  addonsText: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
    fontStyle: 'italic',
  },
  itemPrice: {
    fontSize: 16,
    color: '#02850aff',
    fontWeight: '600',
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
    color: '#006e07ff',
  },
  emptyCart: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  emptyCartText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  menuButton: {
    backgroundColor: '#319138ff',
    borderRadius: 20,
    paddingHorizontal: 30,
  },
  input: {
    backgroundColor: '#fdfffcff',
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#0a0a0aff',
    marginBottom: 12,
    color: '#000000ff',
  },
  orderButton: {
    backgroundColor: '#1b5e20',
    borderRadius: 25,
    marginTop: 20,
    paddingVertical: 12,
    width: 150,
    alignSelf: 'center',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
});

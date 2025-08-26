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
import Button from '../../components/ui/Button';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons'; 
import { useCart } from '../../context/CartContext'; 
import { orders } from '../../../../backend/supabase/orders';
import { auth } from '../../../../backend/supabase/auth';

export default function CheckoutScreen() {
  const navigation = useNavigation();
  const { cart, getCartTotal, clearCart } = useCart();
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [instructions, setInstructions] = useState('');

  const placeOrder = async () => {
    if (!fullName || !address || !phone) {
      Alert.alert('Missing Information', 'Please fill in all the fields.');
      return;
    }

    if (cart.items.length === 0) {
      Alert.alert('Empty Cart', 'Your cart is empty. Add some items before placing an order.');
      return;
    }

    try {
      // Get user profile for userId
      const { profile, error: authError } = await auth.getProfile();
      if (authError || !profile?.sub) {
        Alert.alert('Error', 'User not authenticated.');
        return;
      }

      // Place an order for each cart item (or adapt to your backend's batch order API)
      for (const item of cart.items) {
        // Ensure each addon has a quantity (default to 1 if missing)
        const safeAddons = (item.selectedAddons || []).map(addon => ({
          ...addon,
          quantity: addon.quantity != null ? addon.quantity : 1,
        }));
        const orderPayload = {
          userId: profile.sub,
          menuId: item.id,
          addons: safeAddons,
          locationId: null, // You can add location logic if needed
          total: item.totalPrice * item.quantity,
          quantity: item.quantity,
          instructions: instructions,
          packageId: null, // Add if you support packages
          deliveryInfo: {
            fullName,
            address,
            phone,
          },
        };
        const { success, error } = await orders.createOrder(orderPayload);
        if (!success) {
          Alert.alert('Order Error', error || 'Could not place order.');
          return;
        }
      }

      Alert.alert('Order Placed', 'Thank you! Your food is on the way.', [
        { text: 'OK', onPress: () => {
          clearCart();
          navigation.navigate('Home');
        }},
      ]);
    } catch (err) {
      Alert.alert('Order Error', err.message || 'Could not place order.');
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 100 }}>
      {/* Back Button */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <MaterialIcons name="arrow-back" size={24} color="#0f9902ff" />
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Order Summary</Text>
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
          {/* Show instructions if present */}
          {instructions ? (
            <View style={{ marginVertical: 10 }}>
              <Text style={{ fontWeight: 'bold', color: '#333' }}>Order Instructions:</Text>
              <Text style={{ color: '#444', marginTop: 2 }}>{instructions}</Text>
            </View>
          ) : null}
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
        placeholder="Order Instructions (optional)"
        value={instructions}
        onChangeText={setInstructions}
        style={[styles.input, { minHeight: 40, marginBottom: 10 }]}
        multiline
      />
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
        buttonStyle={[styles.orderButton, cart.items.length === 0 && styles.disabledButton]}
        onPress={placeOrder}
        disabled={cart.items.length === 0}
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
    borderColor: '#ddd',
    marginBottom: 12,
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

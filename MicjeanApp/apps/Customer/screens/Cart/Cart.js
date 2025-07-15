import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Button } from '@rneui/themed';
import EmptyCartScreen from './EmptyCart';
import CheckoutScreen from './CheckoutScreen';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useCart } from '../../context/CartContext';

export default function CartScreen() {
  const navigation = useNavigation();
  const { cart, removeFromCart, updateQuantity, getCartTotal } = useCart();

  const handleRemoveItem = (cartId) => {
    removeFromCart(cartId);
  };

  const renderCartItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image_url }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.price}>GHC {item.totalPrice.toFixed(2)} x {item.quantity}</Text>
        {item.selectedAddons.length > 0 && (
          <Text style={styles.addons}>
            Add-ons: {item.selectedAddons.map(addon => addon.name).join(', ')}
          </Text>
        )}
      </View>
      <TouchableOpacity onPress={() => handleRemoveItem(item.cartId)}>
        <MaterialIcons name="close" size={20} color="#000" />
      </TouchableOpacity>
    </View>
  );
{/*logic for when the cart is empty*/}
if (cart.items.length === 0) {
  return <EmptyCartScreen />;
}

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <MaterialIcons name="arrow-back" size={25} color="#ba272e" />
      </TouchableOpacity>

      <Text style={styles.heading}>Your Cart</Text>

      <FlatList
        data={cart.items}
        keyExtractor={(item) => item.cartId}
        renderItem={renderCartItem}
        contentContainerStyle={{ paddingBottom: 100 }}
      />

      {/* Checkout Section */}
      <View style={styles.checkoutBar}>
        <Button 
          title="Go to checkout" 
          buttonStyle={styles.checkoutButton} 
          onPress={() => navigation.navigate('Checkout')} 
        />
        <Text style={styles.total}>GHC {getCartTotal()}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 120,
  },
  backButton: {
    position: 'absolute',
    top: 47,
    left: 16,
    zIndex: 10,
    padding: 8,
  },
  heading: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'center',
    color: '#AC030A',
  },
  card: {
    backgroundColor: '#fff5f5',
    borderRadius: 16,
    padding: 10,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  details: {
    flex: 1,
  },
  itemName: {
    fontWeight: '600',
  },
  price: {
    color: '#B71C1C',
    marginTop: 4,
  },
  checkoutBar: {
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 90,
    left: 0,
    right: 0,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  checkoutButton: {
    backgroundColor: '#B71C1C',
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  total: {
    fontWeight: '600',
    fontSize: 16,
  },
  addons: {
    color: '#666',
    fontSize: 12,
    marginTop: 2,
  },
  emptyCart: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyCartText: {
    fontSize: 18,
    color: '#666',
    marginBottom: 20,
  },
  startShoppingButton: {
    backgroundColor: '#B71C1C',
    paddingHorizontal: 30,
    borderRadius: 20,
  },
});

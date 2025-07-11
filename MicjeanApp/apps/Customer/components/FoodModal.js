import React, { useState } from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import { useCart } from '../context/CartContext';

const FoodModal = ({ visible, dish, onClose }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedAddons, setSelectedAddons] = useState([]);
  const { addToCart } = useCart();

  const increaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decreaseQuantity = () => {
    setQuantity(prev => prev > 1 ? prev - 1 : 1);
  };

  const toggleAddon = (addon) => {
    setSelectedAddons(prev => {
      const exists = prev.find(item => item.name === addon.name);
      if (exists) {
        return prev.filter(item => item.name !== addon.name);
      } else {
        return [...prev, addon];
      }
    });
  };

  const getBasePrice = () => {
    if (typeof dish?.price === 'number') {
      return dish.price;
    }
    const priceString = dish?.price?.toString() || '0';
    const price = parseFloat(priceString.replace(/[^0-9.]/g, ''));
    return isNaN(price) ? 0 : price;
  };

  const calculateTotal = () => {
    const basePrice = getBasePrice();
    const addonsPrice = selectedAddons.reduce((sum, addon) => sum + addon.price, 0);
    return (basePrice + addonsPrice) * quantity;
  };

  const defaultAddons = [
    { name: 'Egg', price: 2.00 },
    { name: 'Rice', price: 5.00 },
    { name: 'Chicken', price: 15.00 },
    { name: 'Sausage', price: 10.00 }
  ];

  const handleAddToCart = () => {
    if (!dish) return;

    const totalPrice = calculateTotal();
    const cartItem = {
      id: dish.id,
      cartId: `${dish.id}-${Date.now()}-${Math.random()}`, // Unique cart ID
      name: dish.name,
      image_url: dish.image_url,
      basePrice: getBasePrice(),
      selectedAddons: selectedAddons,
      quantity: quantity,
      totalPrice: totalPrice / quantity, // Price per item including addons
      totalAmount: totalPrice // Total amount for this cart item
    };

    addToCart(cartItem);
    
    // Show success message
    Alert.alert(
      'Added to Cart!',
      `${dish.name} has been added to your cart.`,
      [{ text: 'OK', onPress: () => onClose() }]
    );

    // Reset modal state
    setQuantity(1);
    setSelectedAddons([]);
  };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          {/* Food Image */}
          <Image source={{ uri: dish?.image_url }} style={styles.foodImage} />
          
          {/* Scrollable Content */}
          <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
            {/* Food Title */}
            <Text style={styles.modalTitle}>{dish?.name}</Text>
            
            {/* Price */}
            <Text style={styles.modalPrice}>GHC {dish?.price}</Text>
            
            {/* Add-ons Section */}
            <Text style={styles.modalSubtitle}>Add-ons:</Text>
            
            <View style={styles.addonsContainer}>
              {(dish?.addons || defaultAddons).map((addon, index) => {
                const isSelected = selectedAddons.find(item => item.name === addon.name);
                return (
                  <View key={index} style={styles.addonItem}>
                    <Text style={styles.addonName}>{addon.name}</Text>
                    <Text style={styles.addonPrice}>GHC {addon.price}</Text>
                    <TouchableOpacity 
                      style={[styles.checkbox, isSelected && styles.checkboxSelected]} 
                      onPress={() => toggleAddon(addon)}
                    >
                      <Text style={[styles.checkboxText, isSelected && styles.checkboxTextSelected]}>
                        {isSelected ? '☑' : '☐'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                );
              })}
            </View>
            
            {/* Quantity Section */}
            <View style={styles.quantitySection}>
             
              <View style={styles.quantityControls}>
                <TouchableOpacity style={styles.quantityButton} onPress={decreaseQuantity}>
                  <Text style={styles.quantityButtonText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantityNumber}>{quantity}</Text>
                <TouchableOpacity style={styles.quantityButton} onPress={increaseQuantity}>
                  <Text style={styles.quantityButtonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
            
            {/* Add to Cart Button */}
            <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
              <Text style={styles.addToCartText}>Add to order</Text>
              <Text style={styles.addToCartPrice}>GHC {calculateTotal().toFixed(2)}</Text>
            </TouchableOpacity>
          </ScrollView>
          
          {/* Close Button */}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.43)',
    justifyContent: 'flex-end',
    paddingTop: 0,
    marginTop: 0, 
  },
  modalContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    height: '85%',
    alignItems: 'center',
  },
  foodImage: {
    width: '110%',
    height: 210,
    borderRadius: 15,
    marginBottom: 15,
    resizeMode: 'cover',
  },
  scrollContent: {
    flex: 1,
    width: '100%',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#B71C1C',
    textAlign: 'center',
    marginBottom: 2,
  },
  modalPrice: {
    fontSize: 18,
    color: '#B71C1C',
    fontWeight: 'bold',
    marginBottom: 20,
    left:110,
  },
  modalSubtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    alignSelf: 'flex-start',
    marginBottom: 15,
  },
  addonsContainer: {
    width: '100%',
    marginBottom: 15,
  },
  addonItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: 'rgba(236, 178, 178, 0.2)',
    borderRadius: 20,
    marginBottom: 8,
  },
  addonName: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  addonPrice: {
    fontSize: 16,
    color: '#B71C1C',
    fontWeight: 'bold',
    marginRight: 10,
    
  },
  checkbox: {
    width: 25,
    height: 25,
    borderWidth: 0,
    borderColor: 'none',
    borderRadius: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  checkboxSelected: {
    backgroundColor: '#B71C1C',
  },
  checkboxText: {
    fontSize: 16,
    color: '#B71C1C',
  },
  checkboxTextSelected: {
    color: 'white',
  },
  quantitySection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'left',
    width: '90%',
    marginBottom: 0,
    paddingHorizontal: 1,
    backgroundColor:'',
    borderRadius:30,
    right: 10,
  },
  quantityLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',

  },
  quantityButton: {
    width: 30,
    height: 30,
    borderRadius: 8,
    backgroundColor: '#B71C1C',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    top:45,
  },
  quantityButtonText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  quantityNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    minWidth: 30,
    textAlign: 'center',
    top:45,
  },
  addToCartButton: {
    backgroundColor: '#B71C1C',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginBottom: 20,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    left: 67,
  },
  addToCartText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    marginRight: 10,
  },
  addToCartPrice: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  closeButton: {
    position: 'absolute',
    top: 15,
    right: 15,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
});

export default FoodModal;

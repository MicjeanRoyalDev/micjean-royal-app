import React, { useState, useEffect } from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import { useCart } from '../context/CartContext';

import { orders } from '../utils/orders';
const FoodModal = ({ visible, dish, onClose }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [packaging, setPackaging] = useState(null);
  const [packages, setPackages] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchPackages = async () => {
      const { data, error } = await orders.getPackages();
      if (!error && Array.isArray(data) && data.length > 0) {
        setPackages(data);
        setPackaging(data[0]);
      } else {
        setPackages([]);
        setPackaging({ type: 'Rubber', price: 0 }); // fallback
      }
    };
    fetchPackages();
  }, [visible]);

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
        return [...prev, { ...addon, quantity: 1 }];
      }
    });
  };

  const changeAddonQuantity = (addon, delta) => {
    setSelectedAddons(prev =>
      prev.map(item =>
        item.name === addon.name
          ? { ...item, quantity: Math.max(1, (item.quantity || 1) + delta) }
          : item
      )
    );
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
    const addonsPrice = selectedAddons.reduce((sum, addon) => sum + (addon.price * (addon.quantity || 1)), 0);
    const packagingPrice = packaging?.price || 0;
    return (basePrice + addonsPrice + packagingPrice) * quantity;
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
      packaging: packaging,
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
    setPackaging({ type: 'Rubber', price: 0 });
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
            <Text style={styles.modalSubtitle}>Packaging:</Text>
            <View style={styles.packagingContainer}>
              {packages.length > 0 ? (
                packages.map((pkg, idx) => (
                  <TouchableOpacity
                    key={pkg.id || idx}
                    style={[styles.packagingOption, packaging && packaging.id === pkg.id && styles.packagingSelected]}
                    onPress={() => setPackaging(pkg)}
                  >
                    <Text style={styles.packagingText}>{pkg.type || pkg.name || 'Package'}</Text>
                    <Text style={styles.packagingPrice}>{pkg.price} GHC</Text>
                  </TouchableOpacity>
                ))
              ) : (
                <Text style={{ color: '#888' }}>No packaging options available</Text>
              )}
            </View>

            {/* Add-ons Section */}
            <Text style={styles.modalSubtitle}>Add-ons:</Text>
            <View style={styles.addonsContainer}>
            
            <View style={styles.addonsContainer}>
              {(dish?.addons || defaultAddons).map((addon, index) => {
                const selected = selectedAddons.find(item => item.name === addon.name);
                return (
                  <View key={index} style={styles.addonItem}>
                    <Text style={styles.addonName}>{addon.name}</Text>
                    <Text style={styles.addonPrice}>GHC {addon.price}</Text>
                    <TouchableOpacity 
                      style={[styles.checkbox, selected && styles.checkboxSelected]} 
                      onPress={() => toggleAddon(addon)}
                    >
                      <Text style={[styles.checkboxText, selected && styles.checkboxTextSelected]}>
                        {selected ? '☑' : '☐'}
                      </Text>
                    </TouchableOpacity>
                    {/* Quantity selector for selected addon */}
                    {selected && (
                      <View style={styles.addonQtyControls}>
                        <TouchableOpacity style={styles.addonQtyBtn} onPress={() => changeAddonQuantity(addon, -1)}>
                          <Text style={styles.addonQtyBtnText}>-</Text>
                        </TouchableOpacity>
                        <Text style={styles.addonQtyNumber}>{selected.quantity || 1}</Text>
                        <TouchableOpacity style={styles.addonQtyBtn} onPress={() => changeAddonQuantity(addon, 1)}>
                          <Text style={styles.addonQtyBtnText}>+</Text>
                        </TouchableOpacity>
                      </View>
                    )}
                  </View>
                );
              })}
            </View>
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
  packagingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    gap: 10,
  },
  packagingOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e6fbe6',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#20bb2aff',
  },
  packagingSelected: {
    backgroundColor: '#20bb2aff',
  },
  packagingText: {
    fontSize: 15,
    color: '#333',
    fontWeight: 'bold',
    marginRight: 8,
  },
  packagingPrice: {
    fontSize: 15,
    color: '#0c6812ff',
    fontWeight: 'bold',
  },
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
    color: '#028a0bff',
    textAlign: 'center',
    marginBottom: 2,
  },
  modalPrice: {
    fontSize: 18,
    color: '#02880bff',
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
    backgroundColor: '#bfecb233',
    borderRadius: 20,
    marginBottom: 8,
    gap: 8,
  },
  addonQtyControls: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
    backgroundColor: '#e6fbe6',
    borderRadius: 8,
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
  addonQtyBtn: {
    width: 22,
    height: 22,
    borderRadius: 6,
    backgroundColor: '#20bb2aff',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 2,
  },
  addonQtyBtnText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    lineHeight: 18,
  },
  addonQtyNumber: {
    minWidth: 18,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#333',
    fontSize: 15,
  },
  addonName: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  addonPrice: {
    fontSize: 16,
    color: '#0c6812ff',
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
    backgroundColor: '#20bb2aff',
  },
  checkboxText: {
    fontSize: 16,
    color: '#068a0fff',
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
    backgroundColor: '#17851eff',
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
    backgroundColor: '#068a0fff',
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

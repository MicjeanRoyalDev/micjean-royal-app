import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
//import { supabase } from './orders';
import { Button } from '@rneui/themed';
import { MaterialIcons } from '@expo/vector-icons';

export default function CartScreen() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    const { data, error } = await supabase
      .from('orders') 
      .select('item_name, price, image_url');

    if (error) {
      console.error(error);
    } else {
      const grouped = {};
      data.forEach((item) => {
        const key = `${item.item_name}-${item.price}-${item.image_url}`;
        if (!grouped[key]) {
          grouped[key] = { ...item, quantity: 1 };
        } else {
          grouped[key].quantity += 1;
        }
      });

      setOrders(Object.values(grouped));
    }
  };

  const getTotal = () =>
    orders.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Your orders</Text>
      <FlatList
        data={orders}
        keyExtractor={(item, index) => `${item.item_name}-${index}`}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image_url }} style={styles.image} />
            <View style={styles.details}>
              <Text style={styles.itemName}>{item.item_name}</Text>
              <Text style={styles.price}>GH¢ {item.price.toFixed(2)} x {item.quantity}</Text>
            </View>
            <TouchableOpacity>
              <MaterialIcons name="close" size={20} color="#000" />
            </TouchableOpacity>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 100 }}
      />

      <View style={styles.checkoutBar}>
        <Button title="Go to checkout" buttonStyle={styles.checkoutButton} />
        <Text style={styles.total}>GH¢  {getTotal()}</Text>
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
    paddingBottom:120,
  },
  heading: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'center',
    color:'#AC030A'
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
    color: '#ba272e',
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
    backgroundColor: '#ba272e',
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  total: {
    fontWeight: '600',
    fontSize: 16,
  },
});

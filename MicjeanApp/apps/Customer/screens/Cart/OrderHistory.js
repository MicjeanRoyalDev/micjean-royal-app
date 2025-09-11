import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { orders } from '../../../../backend/supabase/orders';
import { auth } from '../../../../backend/supabase/auth';

export default function OrderHistory() {
  const navigation = useNavigation();
  const [orderHistory, setOrderHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { profile, error: authError } = await auth.getProfile();
        if (authError || !profile?.sub) {
          throw new Error('User not authenticated');
        }

        const { data, error } = await orders.getUserOrders(profile.sub);
        if (error) {
          console.error(error);
        } else {
          setOrderHistory(data);
        }
      } catch (err) {
        console.error('Error fetching order history:', err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const renderOrder = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.orderNumber}>Order #{item.order_number}</Text>
      <Text style={styles.date}>{new Date(item.created_at).toLocaleDateString()}</Text>
      <FlatList
        data={item.order_items}
  keyExtractor={(orderItem, index) => index.toString()}
  renderItem={({ item: orderItem }) => (
    <View style={styles.itemRow}>
      <Image source={{ uri: orderItem.menu.image_url }} style={styles.image} />
     <Text style={styles.itemName}>{orderItem.menu.name} x{orderItem.quantity}</Text>
    </View>
  )}
/>
      <Text style={styles.total}>Total: GHC {item.total_amount.toFixed(2)}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color='#03940dff' style={{ marginTop: 50 }} />
      ) : orderHistory.length === 0 ? (
        <View>
          <MaterialIcons name="no-food" size={100} color='#02810bff' style={{ alignSelf: 'center', marginTop: 150 }} /> 
          <Text style={styles.noOrders}>You haven't placed any orders yet.</Text>
        </View>
      ) : (
        <FlatList
          data={orderHistory}
          keyExtractor={(item) => item.order_number.toString()}
          renderItem={renderOrder}
          contentContainerStyle={{ paddingBottom: 56 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 60,
  },
  backButton: {
    position: 'absolute',
    top: 25,
    left: 16,
    zIndex: 10,
    padding: 8,
  },
  heading: {
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    color: '#03940dff',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff5f5',
    padding: 16,
    borderRadius: 16,
    marginBottom: 20,
    elevation: 2,
  },
  orderNumber: {
    fontWeight: '600',
    fontSize: 16,
    color: '#333',
  },
  date: {
    fontSize: 12,
    color: '#888',
    marginBottom: 10,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 10,
  },
  itemName: {
    fontSize: 14,
    color: '#444',
  },
  total: {
    fontWeight: '600',
    color:'#03940dff',
    marginTop: 10,
  },
  noOrders: {
    textAlign: 'center',
    color: '#888',
    fontSize: 17,
    marginTop: 20,
  },
});

import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import Toast from '../../components/Toast';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { orders } from '../../utils/orders';
import { auth } from '../../utils/auth';

export default function OrderHistory() {
  const navigation = useNavigation();
  const [orderHistory, setOrderHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancellingOrder, setCancellingOrder] = useState(null);
  const [toast, setToast] = useState({ visible: false, message: '', type: 'info' });

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
  // Hide cancelled orders
  const filtered = Array.isArray(data) ? data.filter(o => o.status !== 'cancelled').slice(0, 5) : [];
  setOrderHistory(filtered);
      }
    } catch (err) {
      console.error('Error fetching order history:', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleCancelOrder = async (orderId) => {
    setCancellingOrder(orderId);
    try {
      const { profile } = await auth.getProfile();
      const userId = profile?.sub;
      if (!userId) throw new Error('User not authenticated');
      const result = await orders.cancelOrder(orderId, userId);
      if (!result.success) {
        setToast({ visible: true, message: result.error || 'Failed to cancel order', type: 'error' });
      } else {
        setToast({ visible: true, message: 'Order cancelled successfully!', type: 'success' });
        await fetchOrders();
      }
    } catch (err) {
      setToast({ visible: true, message: err.message || 'Failed to cancel order', type: 'error' });
    } finally {
      setCancellingOrder(null);
      setTimeout(() => setToast({ ...toast, visible: false }), 2500);
    }
  };

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
      <Text style={{ color: item.status === 'cancelled' ? 'red' : '#03940dff', fontWeight: 'bold', marginTop: 5 }}>
        Status: {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
      </Text>
      {item.status !== 'completed' && item.status !== 'cancelled' && (
        <TouchableOpacity
          style={[styles.cancelButton, cancellingOrder === item.id && { opacity: 0.6 }]}
          onPress={() => handleCancelOrder(item.id)}
          disabled={cancellingOrder === item.id}
        >
          <Text style={styles.cancelButtonText}>
            {cancellingOrder === item.id ? 'Cancelling...' : 'Cancel Order'}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Toast message={toast.message} type={toast.type} visible={toast.visible} />
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
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  cancelButton: {
    backgroundColor: '#44a81cff',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
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

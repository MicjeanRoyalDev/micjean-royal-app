import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Card, Text } from '@rneui/themed';

export default function Options() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {/* Orders Card */}
      <TouchableOpacity onPress={() => navigation.navigate('Orders')}>
        <Card containerStyle={styles.card}>
          <View style={styles.cardContent}>
            <MaterialIcons name="fastfood" size={24} color="#333" />
            <Text style={styles.cardText}>My Orders</Text>
          </View>
        </Card>
      </TouchableOpacity>

      {/* Contact Card */}
      <TouchableOpacity onPress={() => navigation.navigate('Contact')}>
        <Card containerStyle={[styles.card, styles.contactCard]}>
          <View style={styles.cardContent}>
            <MaterialIcons name="support-agent" size={24} color="#333" />
            <Text style={[styles.cardText, styles.contactText]}>Contact Us</Text>
          </View>
        </Card>
      </TouchableOpacity>

      {/* Policy Card */}
      <TouchableOpacity onPress={() => navigation.navigate('Policy')}>
        <Card containerStyle={[styles.card, styles.policyCard]}>
          <View style={styles.cardContent}>
            <MaterialIcons name="security" size={24} color="#333" />
            <Text style={styles.cardText}>Privacy Policy</Text>
          </View>
        </Card>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
    padding: 16,
  },
  card: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    padding: 16,
    margin: 0,
    marginBottom: 0,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  cardText: {
    fontSize: 16,
    marginLeft: 10,
  },
  contactCard: {
    backgroundColor: '#ffff',
    borderColor: '#e2e8f0',
  },
  policyCard: {
    backgroundColor: '#ffff',
    borderColor: '#e2e8f0',
  },
  contactText: {
    color: '#333',
  },
});

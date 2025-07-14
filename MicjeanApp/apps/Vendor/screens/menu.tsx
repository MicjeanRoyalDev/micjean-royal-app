import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

export default function MenuScreen() {
  // Menu categories with Ghana Cedis (GHS) pricing
  const menuCategories = [
    {
      id: '1',
      name: 'Starters 🍢',
      color: '#FF9E00',
      items: [
        { id: '1-1', name: 'Kelewele', price: 'GHS 15.00' },
        { id: '1-2', name: 'Kofi Brokeman', price: 'GHS 12.50' },
        { id: '1-3', name: 'Tatale', price: 'GHS 18.00' },
      ],
    },
    {
      id: '2',
      name: 'Main Dishes 🍛',
      color: '#FF6B6B',
      items: [
        { id: '2-1', name: 'Jollof Rice', price: 'GHS 35.00' },
        { id: '2-2', name: 'Fufu & Light Soup', price: 'GHS 40.00' },
        { id: '2-3', name: 'Waakye', price: 'GHS 25.00' },
        { id: '2-4', name: 'Banku & Tilapia', price: 'GHS 45.00' },
      ],
    },
    {
      id: '3',
      name: 'Soups 🍲',
      color: '#4ECDC4',
      items: [
        { id: '3-1', name: 'Palm Nut Soup', price: 'GHS 30.00' },
        { id: '3-2', name: 'Groundnut Soup', price: 'GHS 28.00' },
      ],
    },
    {
      id: '4',
      name: 'Drinks 🥤',
      color: '#A05EB5',
      items: [
        { id: '4-1', name: 'Asaana', price: 'GHS 8.00' },
        { id: '4-2', name: 'Sobolo', price: 'GHS 10.00' },
        { id: '4-3', name: 'Palm Wine', price: 'GHS 15.00' },
      ],
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.header}> Dishes </Text>
      
      <ScrollView style={styles.scrollContainer}>
        {menuCategories.map((category) => (
          <View key={category.id} style={[styles.categoryContainer, { borderLeftColor: category.color }]}>
            <Text style={[styles.categoryTitle, { color: category.color }]}>{category.name}</Text>
            
            {category.items.map((item) => (
              <TouchableOpacity key={item.id} style={styles.itemContainer}>
                <View style={styles.itemTextContainer}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={[styles.itemPrice, { color: category.color }]}>{item.price}</Text>
                </View>
                <View style={styles.itemActions}>
                  <TouchableOpacity style={[styles.actionButton, { backgroundColor: category.color }]}>
                    <Text style={styles.buttonText}>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#FF4757' }]}>
                    <Text style={styles.buttonText}>Remove</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
            
            <TouchableOpacity style={[styles.addButton, { backgroundColor: category.color }]}>
              <Text style={styles.addButtonText}>+ Add {category.name.split(' ')[0]} Item</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      
      <TouchableOpacity style={[styles.addCategoryButton, { backgroundColor: '#2ED573' }]}>
        <Text style={styles.addButtonText}>+ Create New Category</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F2F6',
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2F3542',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  scrollContainer: {
    flex: 1,
    marginBottom: 16,
  },
  categoryContainer: {
    marginBottom: 24,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    borderLeftWidth: 6,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
    paddingBottom: 8,
    borderBottomWidth: 2,
    borderBottomColor: '#DFE4EA',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F2F6',
  },
  itemTextContainer: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    color: '#2F3542',
    fontWeight: '600',
  },
  itemPrice: {
    fontSize: 15,
    fontWeight: '700',
    marginTop: 4,
  },
  itemActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    minWidth: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  addButton: {
    marginTop: 16,
    padding: 12,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 15,
  },
  addCategoryButton: {
    padding: 16,
    borderRadius: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
});length = 34;

import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const CategoryTabs = ({ categories, activeCategory, onCategoryPress }) => {
  const handlePress = (categoryId) => {
    onCategoryPress(categoryId);
  };

  return (
    <View style={styles.tabsContainer}>
      {categories.map((cat) => (
        <TouchableOpacity
          key={cat.id}
          style={styles.tabBtn}
          onPress={() => handlePress(cat.id)}
        >
          <Text style={[styles.tabText, activeCategory === cat.id && styles.activeTabText]}>
            {cat.name}
          </Text>
          {activeCategory === cat.id && (
            <View style={[styles.activeLine, { width: '100%' }]} />
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  tabsContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    marginLeft: 16,
    marginTop: 2,
  },
  tabBtn: {
    marginRight: 18,
    alignItems: 'center',
  },
  tabText: {
    fontSize: 14,
    color: '#222',
    fontWeight: '400',
  },
  activeTabText: {
    color: '#068a0fff',
    fontWeight: 'bold',
  },
  activeLine: {
    height: 3,
    backgroundColor: '#08b914ff',
    marginTop: 4,
  },
});

export default CategoryTabs;

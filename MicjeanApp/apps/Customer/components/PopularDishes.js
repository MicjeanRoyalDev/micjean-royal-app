import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FoodCard from './FoodCard';

const PopularDishes = ({ dishes = [] }) => {
  // Default dishes if none provided
  const defaultDishes = [
    {
      id: 1,
      name: 'TILAPIA OKLAODE',
      price: 180.00,
      image_url: 'https://example.com/tilapia.jpg', // You can replace with actual image URLs
      imageSource: require('../../../shared/assets/images/tilapia pic for mock data.jpeg'),
    },
    {
      id: 2,
      name: 'TILAPIA OKLAODE',
      price: 180.00,
      image_url: 'https://example.com/tilapia.jpg',
      imageSource: require('../../../shared/assets/images/tilapia pic for mock data.jpeg'),
    },
    {
      id: 3,
      name: 'TILAPIA EN SAUCE',
      price: 180.00,
      image_url: 'https://example.com/tilapia.jpg',
      imageSource: require('../../../shared/assets/images/tilapia pic for mock data.jpeg'),
    },
    {
      id: 4,
      name: 'TILAPIA OKLAODE',
      price: 180.00,
      image_url: 'https://example.com/tilapia.jpg',
      imageSource: require('../../../shared/assets/images/tilapia pic for mock data.jpeg'),
    }
  ];

  const dishesToRender = dishes.length > 0 ? dishes : defaultDishes;

  return (
    <View style={styles.popularSection}>
      <Text style={styles.sectionTitle}>POPULAR DISHES</Text>
      <View style={styles.dishesGrid}>
        {dishesToRender.map((dish) => (
          <FoodCard
            key={dish.id}
            imageSource={dish.imageSource || { uri: dish.image_url }}
            dishName={dish.name || dish.dishName}
            price={typeof dish.price === 'number' ? `GHC ${dish.price}` : dish.price}
            dish={dish}
            pulseAnimation={true}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  popularSection: {
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  dishesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});

export default PopularDishes;

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FoodCard from './FoodCard';

const PopularDishes = ({ dishes = [] }) => {
  // Default dishes if none provided
  const defaultDishes = [
    {
      id: 1,
      imageSource: require('../../../shared/assets/images/tilapia pic for mock data.jpeg'),
      dishName: 'TILAPIA OKLAODE',
      price: 'Ghc180.00'
    },
    {
      id: 2,
      imageSource: require('../../../shared/assets/images/tilapia pic for mock data.jpeg'),
      dishName: 'TILAPIA OKLAODE',
      price: 'Ghc180.00'
    },
    {
      id: 3,
      imageSource: require('../../../shared/assets/images/tilapia pic for mock data.jpeg'),
      dishName: 'TILAPIA EN SAUCE',
      price: 'Ghc180'
    },
    {
      id: 4,
      imageSource: require('../../../shared/assets/images/tilapia pic for mock data.jpeg'),
      dishName: 'TILAPIA OKLAODE',
      price: 'Ghc180.00'
    }
  ];

  const dishesToRender = dishes.length > 0 ? dishes : defaultDishes;

  const handleDishPress = (dish) => {
    console.log('Dish pressed:', dish.dishName);
    // Add navigation or other logic here
  };

  return (
    <View style={styles.popularSection}>
      <Text style={styles.sectionTitle}>POPULAR DISHES</Text>
      <View style={styles.dishesGrid}>
        {dishesToRender.map((dish) => (
          <FoodCard
            key={dish.id}
            imageSource={dish.imageSource}
            dishName={dish.dishName}
            price={dish.price}
            onPress={() => handleDishPress(dish)}
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

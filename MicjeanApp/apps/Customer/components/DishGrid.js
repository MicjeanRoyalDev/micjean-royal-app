import React from 'react';
import { View, StyleSheet } from 'react-native';
import FoodCard from './FoodCard';

const DishGrid = ({ dishes }) => {
  return (
    <View style={styles.dishesRow}>
      {dishes.map((dish) => (
        <FoodCard
          key={dish.id}
          imageSource={{ uri: dish.image_url }}
          dishName={dish.name}
          price={`GHC ${dish.price}`}
          dish={dish}
          pulseAnimation={false}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  dishesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '100%',
  },
});

export default DishGrid;

import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

const DishGrid = ({ dishes }) => {
  return (
    <View style={styles.dishesRow}>
      {dishes.map((dish) => (
        <View key={dish.id} style={styles.dishCard}>
          <Image source={dish.image} style={styles.dishImage} />
          <Text style={styles.dishName}>{dish.name}</Text>
          <Text style={styles.dishPrice}>{dish.price}</Text>
        </View>
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
  dishCard: {
    width: 170,
    height: 180,
    backgroundColor: 'white',
    borderRadius: 16,
    margin: 3,
    padding: 3,
    alignItems: 'center',
    shadowColor: 'red',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  dishImage: {
    width: '98%',
    height: '70%',
    borderRadius: 12,
    marginBottom: 8,
  },
  dishName: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 0,
    textAlign: 'center',
  },
  dishPrice: {
    fontSize: 13,
    color: '#B71C1C',
    fontWeight: 'bold',
    marginBottom: 2,
  },
});

export default DishGrid;

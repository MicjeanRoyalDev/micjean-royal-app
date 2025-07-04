import React, { useRef, useEffect } from 'react';
import { TouchableOpacity, Image, Text, StyleSheet, Animated, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const FoodCard = ({ 
  imageSource, 
  dishName, 
  price, 
  onPress,
  pulseAnimation = true 
}) => {
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (pulseAnimation) {
      const startPulse = () => {
        Animated.loop(
          Animated.sequence([
            Animated.timing(pulseAnim, {
              toValue: 1.01,
              duration: 1000,
              useNativeDriver: true,
            }),
            Animated.timing(pulseAnim, {
              toValue: 1,
              duration: 1000,
              useNativeDriver: true,
            }),
          ])
        ).start();
      };
      startPulse();
    }
  }, [pulseAnimation, pulseAnim]);

  const CardContent = (
    <TouchableOpacity style={styles.dishCard} onPress={onPress}>
      <Image 
        source={imageSource} 
        style={styles.dishImage} 
      />
      <Text style={styles.dishName}>{dishName}</Text>
      <Text style={styles.dishPrice}>{price}</Text>
    </TouchableOpacity>
  );

  return pulseAnimation ? (
    <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
      {CardContent}
    </Animated.View>
  ) : (
    CardContent
  );
};

const styles = StyleSheet.create({
  dishCard: {
    width: (width - 60) / 2,
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 8,
    marginBottom: 15,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  dishImage: {
    width: '100%',
    height: 100,
    borderRadius: 8,
    marginBottom: 8,
  },
  dishName: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  dishPrice: {
    fontSize: 14,
    color: '#B71C1C',
    fontWeight: 'bold',
  },
});

export default FoodCard;

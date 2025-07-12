import React, { useRef, useEffect, useState } from 'react';
import { TouchableOpacity, Image, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import FoodModal from './FoodModal';
import { menu } from '../../../backend/supabase/menu';

const { width } = Dimensions.get('window');

const FoodCard = ({ 
  imageSource, 
  dishName, 
  price, 
  dish,
  onPress,
  pulseAnimation = true 
}) => {
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const [selectedDish, setSelectedDish] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleCardPress = async () => {
    if (dish) {
      try {
        // Fetch full dish details including addons
        const result = await menu.getMenuById(dish.id);
        if (result.error) {
          console.error('Error fetching dish details:', result.error);
          setSelectedDish(dish); // Fallback to basic dish data
        } else {
          setSelectedDish(result.data);
        }
      } catch (error) {
        console.error('Error fetching dish details:', error);
        setSelectedDish(dish); // Fallback to basic dish data
      }
      setModalVisible(true);
    }
    
    // Call the optional onPress callback if provided
    if (onPress) {
      onPress(dish);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
  };

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
    <TouchableOpacity style={styles.dishCard} onPress={handleCardPress}>
      <Image 
        source={imageSource} 
        style={styles.dishImage} 
      />
      <Text style={styles.dishName}>{dishName}</Text>
      <Text style={styles.dishPrice}>{price}</Text>
    </TouchableOpacity>
  );

  return (
    <>
      {pulseAnimation ? (
        <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
          {CardContent}
        </Animated.View>
      ) : (
        CardContent
      )}
      
      {/* FoodModal Component */}
      <FoodModal visible={modalVisible} dish={selectedDish} onClose={closeModal} />
    </>
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

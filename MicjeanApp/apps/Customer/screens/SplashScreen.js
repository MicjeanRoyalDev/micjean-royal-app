// MicjeanApp/apps/Customer/screens/SplashScreen.js
import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, Animated, Dimensions, Easing } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const SplashScreen = () => {
  const navigation = useNavigation();
  
  // Animation references
  const circleScale = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const slideUp = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Start animation sequence
    const startAnimations = () => {
      // 1. White circle animation (starts after 500ms)
      setTimeout(() => {
        Animated.timing(circleScale, {
          toValue: 1,
          duration: 800,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }).start();
      }, 800);

      // 2. Logo animation (starts after circle animation begins)
      setTimeout(() => {
        Animated.parallel([
          Animated.timing(logoScale, {
            toValue: 1,
            duration: 800,
            easing: Easing.out(Easing.back(1.2)),
            useNativeDriver: true,
          }),
          Animated.timing(logoOpacity, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
        ]).start();
      }, 1200);

      // 3. Slide up animation and navigation (starts after logo animation)
      setTimeout(() => {
        Animated.timing(slideUp, {
          toValue: 1,
          duration: 1000,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }).start(() => {
          // Navigate to next screen after slide animation
          navigation.replace('Welcome');
        });
      }, 2500);
    };

    startAnimations();
  }, [navigation, circleScale, logoScale, logoOpacity, slideUp]);

  return (
    <View style={styles.container}>
      {/* Red background */}
      <View style={styles.redBackground} />
      
      {/* Animated white circle */}
      <Animated.View
        style={[
          styles.circle,
          {
            transform: [{ scale: circleScale }],
          },
        ]}
      />
      
      {/* Animated logo */}
      <Animated.View
        style={[
          styles.logoContainer,
          {
            opacity: logoOpacity,
            transform: [{ scale: logoScale }],
          },
        ]}
      >
        <Image
          source={require('../../../shared/assets/images/micjean royal logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </Animated.View>
      
      {/* Slide up overlay */}
      <Animated.View
        style={[
          styles.slideOverlay,
          {
            transform: [
              {
                translateY: slideUp.interpolate({
                  inputRange: [0, 1],
                  outputRange: [height, 0],
                }),
              },
            ],
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  redBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#079c11ff', 
  },
  circle: {
    position: 'absolute',
    width: width * 0.7, // Circle size
    height: width * 0.7,
    borderRadius: (width * 0.7) / 2,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 15,
  },
  logoContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 80,
  },
  slideOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'white',
    zIndex: 10,
  },
});

export default SplashScreen;
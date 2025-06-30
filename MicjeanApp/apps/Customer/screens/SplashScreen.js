// MicjeanApp/apps/Customer/screens/SplashScreen.js
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, ImageBackground, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');
const CURVE_HEIGHT = height * 0.43; // Deeper curve for bottom image

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Welcome');
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      {/* Top curved white background */}
      <View style={styles.topContainer}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../../../shared/assets/images/micjean royal logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.slogan}>Enjoy African meals</Text>
        </View>
      </View>
      {/* Bottom image background with red overlay and oval curve */}
      <View style={styles.bottomContainer}>
        <ImageBackground
          source={require('../../../shared/assets/images/micjean photo for background.jpg')}
          style={styles.bgImage}
          imageStyle={styles.bgImageStyle}
        >
          <View style={styles.overlay} />
        </ImageBackground>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topContainer: {
    height: height - CURVE_HEIGHT / 1.6, // More oval
    backgroundColor: '#fff',
    borderBottomLeftRadius: width * 1.1, // Large radius for oval
    borderBottomRightRadius: width * 1.1,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
    overflow: 'hidden',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 0,
  },
  logo: {
    width: 170,
    height: 60,
    marginBottom: 10,
  },
  slogan: {
    color: '#B80000',
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 8,
    textAlign: 'center',
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    width: width,
    height: CURVE_HEIGHT,
    overflow: 'hidden',
    zIndex: 1,
  },
  bgImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  bgImageStyle: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: width * 1.1, // Match top curve
    borderTopRightRadius: width * 1.1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(184, 0, 0, 0.35)', // Red overlay with transparency
  },
});

export default SplashScreen;
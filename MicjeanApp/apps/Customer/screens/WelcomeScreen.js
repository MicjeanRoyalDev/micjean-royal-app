// apps/customer/screens/WelcomeScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');
const CIRCLE_SIZE = width * 0.85;

const WelcomeScreen = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      {/* Top left red circle */}
      <View style={styles.redCircle} />
      {/* Centered logo */}
      <Image
        source={require('../../../shared/assets/images/micjean royal logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      {/* Sign up button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('SignUp')}
      >
        <Text style={styles.buttonText}>Sign up</Text>
      </TouchableOpacity>
      {/* Sign in button */}
      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={() => navigation.navigate('SignIn')}
      >
        <Text style={styles.secondaryButtonText}>Sign in</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    paddingHorizontal: 24,
  },
  redCircle: {
    position: 'absolute',
    top: -CIRCLE_SIZE * 0.25,
    left: -CIRCLE_SIZE * 0.25,
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    backgroundColor: '#04860dff',
    zIndex: 1,
  },
  logo: {
    width: 160,
    height: 120,
    marginBottom: 48,
    marginTop: 40,
    zIndex: 2,
  },
  button: {
    backgroundColor: '#04860dff',
    borderRadius: 28,
    paddingVertical: 16,
    width: '100%',
    alignItems: 'center',
    marginBottom: 18,
    zIndex: 2,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
  },
  secondaryButton: {
    borderWidth: 1.5,
    borderColor: '#04860dff',
    borderRadius: 28,
    paddingVertical: 16,
    width: '100%',
    alignItems: 'center',
    marginBottom: 12,
    zIndex: 2,
  },
  secondaryButtonText: {
    color: '#04860dff',
    fontWeight: 'bold',
    fontSize: 20,
  },
});

export default WelcomeScreen;
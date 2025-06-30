// apps/customer/screens/SuccessScreen.js
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const { width } = Dimensions.get('window');
const CIRCLE_SIZE = width * 0.7;

const SuccessScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { message } = route.params || { message: 'Sign up successful' };

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('SignIn');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.circle}>
        <View style={styles.checkCircle}>
          <Text style={styles.check}>✓</Text>
        </View>
      </View>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    backgroundColor: '#C1272D',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  checkCircle: {
    width: CIRCLE_SIZE * 0.5,
    height: CIRCLE_SIZE * 0.5,
    borderRadius: (CIRCLE_SIZE * 0.5) / 2,
    borderWidth: 10,
    borderColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  check: {
    color: '#fff',
    fontSize: CIRCLE_SIZE * 0.28,
    fontWeight: 'bold',
    marginTop: -8,
  },
  message: {
    fontSize: 22,
    color: '#111',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default SuccessScreen;
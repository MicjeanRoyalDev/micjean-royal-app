// apps/customer/screens/SignInScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Dimensions, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../../../backend/supabase/auth';

const { width, height } = Dimensions.get('window');

const SignInScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }

    setLoading(true);
    try {
      const result = await auth.login(email, password);
      
      if (result.error) {
        Alert.alert('Login Failed', result.error.message);
        console.error('Login error:', result.error);
      } else {
        console.log('Login successful:', result.user);
        navigation.navigate('Success', { message: 'Sign in successful!' });
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again.');
      console.error('Sign in error:', error);
    } finally {
      setLoading(false);
    }


  };

  return (
    <View style={styles.container}>
      {/* Logo at top right */}
      <Image
        source={require('../../../shared/assets/images/micjean royal logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      {/* Title */}
      <Text style={styles.title}>Sign in</Text>
      {/* Email */}
      <Text style={styles.label}>email</Text>
      <TextInput
        style={styles.input}
        placeholder=""
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        placeholderTextColor='#1b5e20'
        autoCapitalize="none"
      />
      {/* Password */}
      <Text style={styles.label}>password</Text>
      <TextInput
        style={styles.input}
        placeholder=""
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholderTextColor='#1b5e20'
      />
      {/* Sign in button */}
      <TouchableOpacity style={styles.signInButton} onPress={handleSignIn} disabled={loading}>
        <Text style={styles.signInButtonText}>{loading ? 'Signing in...' : 'Sign in'}</Text>
      </TouchableOpacity>
      {/* Bottom right red circle */}
      {/*Okay I will be replacing this big circle with an animation*/}
      <View style={styles.redCircle} />
    </View>
  );
};

const CIRCLE_SIZE = width * 0.7;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 32,
    paddingTop: 48,
    position: 'relative',
    overflow: 'hidden',
    justifyContent: 'flex-start',
  },
  logo: {
    position: 'absolute',
    top: 30,
    right: 32,
    width: 87,
    height: 90,
    zIndex: 2,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#04860dff',
    marginBottom: 24,
    marginTop: 24,
    textAlign: 'left',
  },
  label: {
    color: '#04860dff',
    fontWeight: 'bold',
    marginBottom: 4,
    marginTop: 8,
    marginLeft: 8,
    fontSize: 16,
    textAlign: 'left',
  },
  input: {
    width: '100%',
    backgroundColor: 'transparent',
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: '#05ac10ff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginBottom: 8,
    fontSize: 16,
    color: '#32b33bff',
  },
  signInButton: {
    backgroundColor: '#04860dff',
    borderRadius: 24,
    paddingVertical: 12,
    paddingHorizontal: 36,
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginTop: 24,
    marginBottom: 12,
  },
  signInButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 17,
  },
  redCircle: {
    position: 'absolute',
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    backgroundColor: '#04860dff',
    bottom: -CIRCLE_SIZE * 0.25,
    right: -CIRCLE_SIZE * 0.18,
    zIndex: 0,
  },
});

export default SignInScreen;
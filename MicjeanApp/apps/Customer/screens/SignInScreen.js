// apps/customer/screens/SignInScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const SignInScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleSignIn = () => {
    // TODO: Implement sign in logic
    navigation.navigate('Success', { message: 'Sign in successful' });
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
        placeholderTextColor="#B80000"
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
        placeholderTextColor="#B80000"
      />
      {/* Sign in button */}
      <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
        <Text style={styles.signInButtonText}>Sign in</Text>
      </TouchableOpacity>
      {/* Bottom right red circle */}
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
    top: 36,
    right: 32,
    width: 70,
    height: 28,
    zIndex: 2,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#B80000',
    marginBottom: 24,
    marginTop: 24,
    textAlign: 'left',
  },
  label: {
    color: '#B80000',
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
    borderColor: '#B80000',
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginBottom: 8,
    fontSize: 16,
    color: '#B80000',
  },
  signInButton: {
    backgroundColor: '#C1272D',
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
    backgroundColor: '#C1272D',
    bottom: -CIRCLE_SIZE * 0.25,
    right: -CIRCLE_SIZE * 0.18,
    zIndex: 0,
  },
});

export default SignInScreen;
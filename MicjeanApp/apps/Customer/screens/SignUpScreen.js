// apps/customer/screens/SignUpScreen.js
import React, { useState } from 'react';
import { ScrollView,View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ImageBackground, Dimensions, Platform, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../../../backend/supabase/auth';

const { width } = Dimensions.get('window');
const CURVE_HEIGHT = width * 0.75; // Make the curve much taller

const SignUpScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleSignUp = async () => {
    if (!email || !password || !name || !telephone) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      const result = await auth.register(email, password, name, telephone);
      
      if (result.error) {
        Alert.alert('Registration Failed', result.error.message);
        console.error('Registration error:', result.error);
      } else {
        console.log('Registration successful:', result.user);
        navigation.navigate('Success', { message: 'Sign up successful!' });
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again.');
      console.error('Sign up error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView>
    <ImageBackground
      source={require('../../../shared/assets/images/micjean photo for background.jpg')}
      style={styles.container}
      imageStyle={styles.bgImage}
    >
      {/* White overlay */}
      <View style={styles.overlay} />

      {/* Curved red overlay */}
      <View style={styles.curveOverlay}>
        <Text style={styles.welcome}>WELCOME</Text>
        <Text style={styles.subtitle}>create an account  make an order</Text>
      </View>

      {/* Logo just below the curve */}
      <View style={styles.logoContainer}>
        <Image
          source={require('../../../shared/assets/images/micjean royal logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <View style={styles.formContainer}>
        {/* Name */}
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          placeholder=""
          value={name}
          onChangeText={setName}
          placeholderTextColor="#B80000"
        />
        {/* Email */}
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder=""
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          placeholderTextColor="#B80000"
          autoCapitalize="none"
        />
        {/* Telephone */}
        <Text style={styles.label}>Telephone</Text>
        <TextInput
          style={styles.input}
          placeholder=""
          value={telephone}
          onChangeText={setTelephone}
          keyboardType="phone-pad"
          placeholderTextColor="#B80000"
        />
        {/* Password */}
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder=""
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholderTextColor="#B80000"
        />
        {/* Social row */}
        <View style={styles.socialRow}>
          <View style={styles.line} />
          <Text style={styles.orText}>or</Text>
          <View style={styles.line} />
        </View>
        {/* Social buttons */}
        <View style={styles.socialButtons}>
          <TouchableOpacity style={styles.socialButton}>
            <Text style={styles.socialButtonText}>google</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <Text style={styles.socialButtonText}>facebook</Text>
          </TouchableOpacity>
        </View>
        {/* Register button */}
        <TouchableOpacity style={styles.registerButton} onPress={handleSignUp} disabled={loading}>
          <Text style={styles.registerButtonText}>{loading ? 'Registering...' : 'Register'}</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: 'cover',
    backgroundColor: '#fff',
  },
  bgImage: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.75)',
    zIndex: 1,
  },
  curveOverlay: {
    position: 'absolute',
    top: 0,
    width: width,
    height: CURVE_HEIGHT,
    backgroundColor: '#B80000',
    borderBottomLeftRadius: width * 1.1,
    borderBottomRightRadius: width * 1.1,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
  },
  welcome: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    letterSpacing: 1,
    marginBottom: 6,
    marginTop: 10,
    textAlign: 'center',
  },
  subtitle: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
    letterSpacing: 0.5,
    textAlign: 'center',
  },
  logoContainer: {
    zIndex: 3,
    alignItems: 'center',
    marginTop: CURVE_HEIGHT - 40,
    marginBottom: 10,
  },
  logo: {
    width: 120,
    height: 50,
  },
  formContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 24,
    zIndex: 3,
  },
  label: {
    alignSelf: 'flex-start',
    marginLeft: 10,
    color: '#B80000',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 2,
    marginTop: 8,
  },
  input: {
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.85)',
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: '#B80000',
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginBottom: 8,
    fontSize: 16,
    color: '#B80000',
  },
  socialRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 12,
    width: '100%',
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#222',
    opacity: 0.3,
  },
  orText: {
    marginHorizontal: 10,
    color: '#222',
    fontWeight: 'bold',
    fontSize: 14,
    opacity: 0.7,
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 18,
  },
  socialButton: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: '#B80000',
    borderRadius: 24,
    paddingVertical: 10,
    marginHorizontal: 8,
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.85)',
  },
  socialButtonText: {
    color: '#B80000',
    fontWeight: 'bold',
    fontSize: 15,
    textTransform: 'lowercase',
  },
  registerButton: {
    backgroundColor: '#B80000',
    borderRadius: 24,
    paddingVertical: 16,
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
    marginBottom: 50,
  },
  registerButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    letterSpacing: 1,
  },
});

export default SignUpScreen;
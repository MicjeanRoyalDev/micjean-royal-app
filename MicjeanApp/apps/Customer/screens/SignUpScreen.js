// apps/customer/screens/SignUpScreen.js
import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../../../backend/supabase/auth';

const { width } = Dimensions.get('window');
const CURVE_HEIGHT = width * 0.65; // Make the curve much taller

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
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={require('../../../shared/assets/images/micjean photo for background.jpg')}
        style={styles.backgroundImage}
      />
      <View style={styles.boxContainer}>
        {/* Header Section */}
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>Create Account</Text>
          <Text style={styles.headerSubtitle}>Sign up to order delicious meals</Text>
        </View>

        {/* Form Section */}
        <View style={styles.formContainer}>
          {/* Name */}
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={name}
            onChangeText={setName}
            placeholderTextColor="#B80000"
          />
          {/* Email */}
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            placeholderTextColor="#B80000"
            autoCapitalize="none"
          />
          {/* Telephone */}
          <TextInput
            style={styles.input}
            placeholder="Telephone"
            value={telephone}
            onChangeText={setTelephone}
            keyboardType="phone-pad"
            placeholderTextColor="#B80000"
          />
          {/* Password */}
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholderTextColor="#B80000"
          />

          {/* Register Button */}
          <TouchableOpacity
            style={styles.registerButton}
            onPress={handleSignUp}
            disabled={loading}
          >
            <Text style={styles.registerButtonText}>{loading ? 'Registering...' : 'Register'}</Text>
          </TouchableOpacity>

          {/* Social Login Section */}
          <View style={styles.socialContainer}>
            <Text style={styles.socialText}>Or sign up with</Text>
            <View style={styles.socialButtonsContainer}>
              <TouchableOpacity style={styles.socialButton}>
                <Text style={styles.socialButtonText}>Google</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialButton}>
                <Text style={styles.socialButtonText}>Facebook</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 30,
    justifyContent: 'center',
  },
  boxContainer: {
    width: '105%',
    height: '95%', // Increased height to make the box larger
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 3,
    alignSelf: 'center',
    opacity: 0.9, // Increased opacity for better visibility
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 15, // Increased margin to bring the header down
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#B80000',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#888',
    marginTop: 5,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 5, // Added margin to bring the form down
  },
  input: {
    backgroundColor: '#f9f9f9',
    borderRadius: 20,
    borderWidth: 0.8,
    borderColor: '#B80000',
    paddingVertical: 14,
    paddingHorizontal: 25,
    marginBottom: 30,
    fontSize: 16,
    color: '#333',
  },
  registerButton: {
    backgroundColor: '#B80000',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 25, // Increased margin to bring the button down
    marginLeft: 70,
    marginRight:70,
    shadowColor: '#333',
    shadowOffset: { width: 5, height: 2 },
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  socialContainer: {
    alignItems: 'center',
    marginTop: 25,
  },
  socialText: {
    fontSize: 14,
    color: '#888',
    marginBottom: 10,
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  socialButton: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#B80000',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 10,
  },
  socialButtonText: {
    color: '#B80000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '113%',
    height: '113%',
    opacity: 0.9, // Increased opacity for better visibility
  },
});

export default SignUpScreen;
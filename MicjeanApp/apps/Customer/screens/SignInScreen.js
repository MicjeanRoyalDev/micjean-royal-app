// apps/customer/screens/SignInScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Dimensions, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../../../backend/supabase/auth';
//the bottom circle moves when the keyboard is pressed so I am using the keyboard avoiding view function
import { KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
//including the eye icon for inputting passwords
import { MaterialIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
const { width, height } = Dimensions.get('window');

const SignInScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

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

const handleForgotPassword = async () => {
  if (!email) {
    Alert.alert('Forgot Password', 'Please enter your email above first.');
    return;
  }
  try {
    const { error, message } = await auth.resetPassword(email);
    if (error) {
      Alert.alert('Reset Failed', error.message || 'Could not send reset email.');
    } else {
      Alert.alert('Reset Email Sent', message || 'Check your email for a reset link.');
    }
  } catch (err) {
    Alert.alert('Reset Failed', err.message || 'Could not send reset email.');
  }
};

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Bottom right red circle - positioned absolutely to stay anchored */}
      <View style={[styles.redCircle, { bottom: -CIRCLE_SIZE * 0.25 + insets.bottom }]} />
      
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"} 
        style={styles.keyboardAvoidingView}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        {/* Logo at top right */}
        <Image
          source={require('../../../shared/assets/images/micjean royal logo.png')}
          style={[styles.logo, { top: insets.top + 1 }]}
          resizeMode="contain"
        />
        
        {/* Content container */}
        <View style={styles.contentContainer}>
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
          <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%' }}>
            <TextInput
              style={[styles.input, { flex: 1 }]}
              placeholder=""
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              placeholderTextColor='#1b5e20'
              autoCapitalize="none"
            />
            {/* Included an eye icon to toggle password visibility */}
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: 16 }}>
              <MaterialIcons
                name={showPassword ? "visibility" : "visibility-off"}
                size={22}
                color="#026409ff"
              />
            </TouchableOpacity>
          </View>
          
          {/* Forgot Password link */}
          <TouchableOpacity style={styles.forgotPasswordBtn} onPress={handleForgotPassword}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>
          
          {/* Sign in button */}
          <TouchableOpacity style={styles.signInButton} onPress={handleSignIn} disabled={loading}>
            <Text style={styles.signInButtonText}>{loading ? 'Signing in...' : 'Sign in'}</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
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
    position: 'relative',
    overflow: 'hidden',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    paddingTop: 48,
    justifyContent: 'flex-start',
  },
  logo: {
    position: 'absolute',
    right: 2,
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
    fontSize: 17,
    color: '#000000ff',
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
    right: -CIRCLE_SIZE * 0.18,
    zIndex: 0,
  },
    forgotPasswordBtn: {
    alignSelf: 'flex-end',
    marginTop: 2,
    marginBottom: 2,
    padding: 4,
  },
  forgotPasswordText: {
    color: '#04860dff',
    fontSize: 16,
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },
});

export default SignInScreen;
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { auth } from '../../../backend/supabase/auth.js';

const Header = () => {
  const [profile, setProfile] = useState({ username: '', email: '', initials: '' });

  useEffect(() => {
    const fetchProfile = async () => {
      const { profile, error } = await auth.getProfile();
      if (error) {
        console.error('Failed to fetch profile:', error.message);
        return;
      }

      const initials = profile.username
        ? profile.username
            .split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase()
        : '';

      setProfile({
        username: profile.username || '',
        email: profile.email || '',
        initials,
      });
    };

    fetchProfile();
  }, []);

  return (
    <View style={styles.header}>
      <View style={styles.headerLeft}>
        <Text style={styles.greeting}>Hello, {profile.username}</Text>
        <Text style={styles.subGreeting}>DON'T JUST EAT, ENJOY</Text>
      </View>
      <View style={styles.logoContainer}>
        <Image 
          source={require('../../../shared/assets/images/micjean royal logo.png')} 
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#068a0fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerLeft: {
    flex: 1,
    width:'150%',
  },
  greeting: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    paddingTop: 30,
  },
  subGreeting: {
    color: 'white',
    fontSize: 10,
    opacity: 1.0,
  },
  logoContainer: {
    width: 60,
    height: 60,
    backgroundColor: 'white',
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 2,
  },
  logo: {
    width: 50,
    height: 50,
  },
});

export default Header;

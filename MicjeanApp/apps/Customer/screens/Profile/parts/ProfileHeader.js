import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Avatar, Text, Card } from '@rneui/themed';
import { auth } from '../../../../../backend/supabase/auth.js';

export default function ProfileHeader() {
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
      initials: initials,
    });
  };

  fetchProfile();
}, []);


  return (
    <View style={styles.container}>
      <Avatar
        size="large"
        rounded
        title={profile.initials}
        overlayContainerStyle={{ backgroundColor: '#ba272e' }}
        containerStyle={styles.avatar}
      />

      <Card containerStyle={styles.card}>
        <View style={styles.textContainer}>
          <Text h4 style={styles.username}>{profile.username}</Text>
          <Text style={styles.email}>{profile.email}</Text>
        </View>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', padding: 16, width: '100%' },
 avatar: {
  marginBottom: 12,
  borderWidth: 2,
  borderRadius: 50,
  borderColor: '#fff',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  backgroundColor: '#ba272e',
  shadowOpacity: 0.1,
  shadowRadius: 3,
  elevation: 5,
},
  card: {
    width: '100%',
    borderRadius: 8,
    padding: 16,
    margin: 0,
    elevation: 0,
    shadowOpacity: 0,
    borderWidth: 0,
  },
  textContainer: { alignItems: 'center' },
  username: { textAlign: 'center', marginBottom: 4 },
  email: { color: 'black', fontSize: 14, textAlign: 'center' },
});

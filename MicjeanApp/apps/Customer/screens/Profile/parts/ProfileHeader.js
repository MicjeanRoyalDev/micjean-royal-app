import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Avatar from '../../../components/ui/Avatar';
import Text from '../../../components/ui/Text';
import Card from '../../../components/ui/Card';
import { auth } from '../../../../../backend/supabase/auth.js';
import { useIsFocused } from '@react-navigation/native';

export default function ProfileHeader() {
  const isFocused = useIsFocused();
  const [profile, setProfile] = useState({ username: '', email: '', initials: '' });

  useEffect(() => {
  if (!isFocused) return;

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
}, [isFocused]);

// if (!isFocused) return null;


  return (
    <View style={styles.container}>
      <Avatar
        size="large"
        rounded
        title={profile.initials}
        overlayContainerStyle={{ backgroundColor: '#018d0bff' }}
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
  container: {
    alignItems: 'center',
    padding: 16,
    width: '100%',
  },
  avatar: {
    marginBottom: 12,
    borderWidth: 2,
    borderRadius: 50,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    backgroundColor: '#03940dff',
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
  textContainer: {
    alignItems: 'center',
  },
  username: {
    textAlign: 'center',
    marginBottom: 4,
  },
  email: {
    color: 'black',
    fontSize: 14,
    textAlign: 'center',
  },
});

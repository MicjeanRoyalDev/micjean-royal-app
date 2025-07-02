import { User } from "./types";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const logout = async () => {
  try {
    await AsyncStorage.removeItem('lastLogin');
  } catch (e) {
    console.error('Failed to clear login:', e);
  }
};

export const login = async (email: string, password: string) => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const now = new Date().toISOString();
  try {
    await AsyncStorage.setItem('lastLogin', now);
  } catch (e) {
    console.error('Failed to save login time:', e);
  }
};

export const me = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  let lastLogin: string | null = null;
  try {
    lastLogin = await AsyncStorage.getItem('lastLogin');
  } catch (e) {
    console.error('Failed to read login time:', e);
  }
  const expiryMs = 10 * 60 * 1000; // 10 minutes
  if (lastLogin) {
    const lastTime = new Date(lastLogin).getTime();
    if (Date.now() - lastTime < expiryMs) {
      const fetchedUser: User = { id: 'userId123', email: 'vendor@micjean.com', name: 'Micjean Vendor' };
      const now = new Date().toISOString();
      try {
        await AsyncStorage.setItem('lastLogin', now);
      } catch (e) {
        console.error('Failed to update login time:', e);
      }
      return fetchedUser;
    }
  }
  
  try {
    await AsyncStorage.removeItem('lastLogin');
  } catch (e) {
    console.error('Failed to clear expired login time:', e);
  }
  throw new Error('Unauthenticated');
};

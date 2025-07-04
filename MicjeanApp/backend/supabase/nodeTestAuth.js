#!/usr/bin/env node
// A standalone Node.js script to test Supabase auth functions without React Native
// Usage: In terminal, run `node nodeTestAuth.js` from this directory

// Load environment variables from .env
const path = require('path');
// Load .env from same directory as this script
require('dotenv').config({ path: path.resolve(__dirname, '.env') });
const { createClient } = require('@supabase/supabase-js');

// Supabase URL & anon key from environment variables
// Load raw environment variables
const supabaseUrlRaw = process.env.EXPO_PUBLIC_PROJECT_URL;
const supabaseAnonKeyRaw = process.env.EXPO_PUBLIC_API_KEY;

// Helper to trim and replace Unicode ellipsis (…) with three ASCII dots
function sanitize(input, name) {
  if (!input) return undefined;
  const trimmed = input.trim();
  if (/\u2026/.test(trimmed)) {
    console.warn(`${name} contains a Unicode ellipsis; replacing with '...'`);
  }
  return trimmed.replace(/\u2026/g, '...');
}

// Sanitize environment inputs
const supabaseUrlRawClean = sanitize(supabaseUrlRaw, 'EXPO_PUBLIC_PROJECT_URL');
const supabaseAnonKey = sanitize(supabaseAnonKeyRaw, 'EXPO_PUBLIC_API_KEY');

// Log raw and sanitized values for debugging
console.log('Loaded EXPO_PUBLIC_PROJECT_URL:', supabaseUrlRaw);
console.log('Sanitized URL:', supabaseUrlRawClean);
console.log('Loaded EXPO_PUBLIC_API_KEY:', supabaseAnonKeyRaw && supabaseAnonKeyRaw.slice(0, 4) + '...');

// Ensure URL has protocol
let supabaseUrl = supabaseUrlRawClean;
if (supabaseUrl && !/^https?:\/\//.test(supabaseUrl)) {
  console.warn('Supabase URL missing protocol, prepending https://');
  supabaseUrl = 'https://' + supabaseUrl;
}

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Error: EXPO_PUBLIC_PROJECT_URL and EXPO_PUBLIC_API_KEY must be set in .env');
  process.exit(1);
}

// Create Supabase client
console.log('Initializing Supabase client with URL:', supabaseUrl);
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function runNodeAuthTests() {
  console.log('🚀 Running Node.js Supabase Auth Tests...');

  // Test registration
  console.log('🧪 signUp...');
  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
    email: 'test@example.com',
    password: 'testpassword123'
  });
  console.log('signUpError:', signUpError, 'signUpData:', signUpData);

  // Test signIn
  console.log('🧪 signInWithPassword...');
  const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
    email: 'test@example.com',
    password: 'testpassword123'
  });
  console.log('signInError:', signInError, 'signInData:', signInData);

  if (signInData?.session) {
    // Test get user profile
    console.log('🧪 getSession & query profiles table...');
    const { data: sessionData } = await supabase.auth.getSession();
    console.log('session:', sessionData);

    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', sessionData.session.user.id)
      .single();
    console.log('profile:', profileError || profile);

    // Test signOut
    console.log('🧪 signOut...');
    const { error: signOutError } = await supabase.auth.signOut();
    console.log('signOutError:', signOutError || 'signed out successfully');
  }
}

runNodeAuthTests().catch(err => console.error('Unexpected error:', err));

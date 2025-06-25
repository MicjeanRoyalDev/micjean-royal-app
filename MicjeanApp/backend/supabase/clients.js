import { AppState } from 'react-native'
import 'react-native-url-polyfill/auto'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient, processLock } from '@supabase/supabase-js'

const supabaseUrl = process.env.EXPO_PUBLIC_PROJECT_URL || 'https://pxecpqenfddoprilkjqw.supabase.co'
const supabaseAnonKey = process.env.EXPO_PUBLIC_API_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB4ZWNwcWVuZmRkb3ByaWxranF3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA3OTcyMzMsImV4cCI6MjA2NjM3MzIzM30.Y5EODVzv3m6UBTQBLnGJk1gC3h0f2PBrvYM4RlNyYXs'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
        lock: processLock,
    },
})

AppState.addEventListener('change', (state) => {
    if (state === 'active') {
        supabase.auth.startAutoRefresh()
    } else {
        supabase.auth.stopAutoRefresh()
    }
})
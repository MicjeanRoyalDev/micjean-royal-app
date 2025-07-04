import { auth } from './auth';

// Test authentication functions
export const testAuth = {
  // Test registration
  testRegister: async (useSimple = false) => {
    console.log('🧪 Testing Registration...');
    try {
      const result = useSimple 
        ? await auth.registerSimple('test@example.com', 'testpassword123')
        : await auth.register('test@example.com', 'testpassword123', 'TestUser', '+1234567890');
      
      if (result.error) {
        console.error('❌ Registration failed:', result.error);
        return false;
      } else {
        console.log('✅ Registration successful:', result.user?.email);
        return true;
      }
    } catch (error) {
      console.error('❌ Registration error:', error);
      return false;
    }
  },

  // Test login
  testLogin: async (email = 'test@example.com', password = 'testpassword123') => {
    console.log('🧪 Testing Login...');
    try {
      const result = await auth.login(email, password);
      
      if (result.error) {
        console.error('❌ Login failed:', result.error);
        return false;
      } else {
        console.log('✅ Login successful:', result.user?.email);
        console.log('Session:', result.session?.access_token ? 'Active' : 'None');
        return true;
      }
    } catch (error) {
      console.error('❌ Login error:', error);
      return false;
    }
  },

  // Test profile retrieval
  testGetProfile: async () => {
    console.log('🧪 Testing Get Profile...');
    try {
      const result = await auth.getProfile();
      
      if (result.error) {
        console.error('❌ Get profile failed:', result.error);
        return false;
      } else {
        console.log('✅ Profile retrieved:', result.profile);
        console.log('User ID:', result.session?.user?.id);
        return true;
      }
    } catch (error) {
      console.error('❌ Get profile error:', error);
      return false;
    }
  },

  // Test logout
  testLogout: async () => {
    console.log('🧪 Testing Logout...');
    try {
      const result = await auth.logout();
      
      if (result.error) {
        console.error('❌ Logout failed:', result.error);
        return false;
      } else {
        console.log('✅ Logout successful');
        return true;
      }
    } catch (error) {
      console.error('❌ Logout error:', error);
      return false;
    }
  },

  // Test simple registration (no profile table)
  testSimpleRegister: async () => {
    return await testAuth.testRegister(true);
  },

  // Run all tests
  runAllTests: async (useSimple = false) => {
    console.log('🚀 Starting Supabase Auth Tests...');
    
    // Test registration
    const registerSuccess = await testAuth.testRegister(useSimple);
    
    // Test login (only if registration succeeded)
    const loginSuccess = registerSuccess ? await testAuth.testLogin() : false;
    
    // Test profile retrieval (only if login succeeded)
    const profileSuccess = loginSuccess ? await testAuth.testGetProfile() : false;
    
    // Test logout (only if login succeeded)
    const logoutSuccess = loginSuccess ? await testAuth.testLogout() : false;
    
    console.log('\n📊 Test Results:');
    console.log(`Registration: ${registerSuccess ? '✅' : '❌'}`);
    console.log(`Login: ${loginSuccess ? '✅' : '❌'}`);
    console.log(`Get Profile: ${profileSuccess ? '✅' : '❌'}`);
    console.log(`Logout: ${logoutSuccess ? '✅' : '❌'}`);
    
    return {
      registration: registerSuccess,
      login: loginSuccess,
      profile: profileSuccess,
      logout: logoutSuccess
    };
  }
};

// For quick testing - uncomment to run
// testAuth.runAllTests(); // Full test with profiles table
testAuth.runAllTests(true); // Simple test without profiles table

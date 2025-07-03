// apps/customer/navigation/AuthStack.js
import { createStackNavigator } from '@react-navigation/stack';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import SuccessScreen from '../screens/SuccessScreen';
import SplashScreen from '../screens/SplashScreen';
import HomeScreen from '../screens/HomeScreen';
import MenuScreen from '../screens/MenuScreen';

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator 
      initialRouteName="Splash"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="Success" component={SuccessScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Menu" component={MenuScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;
// App.js
import React from 'react';
import SplashScreen from './screens/SplashScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { RootStackParamList } from '@/types/navigation';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SingUpScreen';
import OnboardScreen from './screens/OnboardScreen';

import { useAuth} from '../components/AuthProvider';
import HomeScreen from './screens/HomeScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const { isAuthenticated, loading } = useAuth();

  return (

    <Stack.Navigator initialRouteName="SplashScreen" screenOptions={{
      headerShown: false, // This will hide the header
    }}>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />

        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="OnboardScreen" component={OnboardScreen} />
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        {/* <Stack.Screen name="HealthProfileScreen" component={HealthProfileScreen} /> 
        <Stack.Screen name="HealthGoalsSelection" component={HealthGoalsSelection} /> */}
    </Stack.Navigator>

  );
}
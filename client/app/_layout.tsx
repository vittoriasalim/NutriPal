import React, { useState, useEffect } from 'react';
import { Stack } from "expo-router";
import loadFonts from '../constants/load_fonts'; // Ensure the correct path to your loadFonts function
import { AuthProvider } from '@/components/AuthProvider';
import SplashScreen from './screens/SplashScreen';




export default function RootLayout() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const loadAllFonts = async () => {
      await loadFonts();
      setFontsLoaded(true);
    };

    loadAllFonts();
  }, []);

  if (!fontsLoaded) {
    return <SplashScreen/>;
  }

  return (
    <AuthProvider>


    <Stack screenOptions={{
        headerShown: false, // This will hide the header
      }}>
      
    </Stack>
    </AuthProvider>

  );
}

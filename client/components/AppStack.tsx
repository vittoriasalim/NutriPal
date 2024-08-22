// App.js
import React from 'react';
import HomeScreen from '../app/screens/HomeScreen';

export default function App({ Stack }: any) {
  
  return (
    <>
     <Stack.Screen 
        name="HomeScreen" 
        component={HomeScreen} 
        options={{ headerShown: false }}
      /> 
    </>
  );
}
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PantryScreen from './PantryScreen';
import IngredientDetail from './IngredientDetail'; // Your new detail screen

const PantryStack = createNativeStackNavigator();

const PantryStackNavigator = () => {
  return (
    <PantryStack.Navigator initialRouteName="PantryScreen" screenOptions={{ headerShown: false }}>
      <PantryStack.Screen name="PantryScreen" component={PantryScreen} />
      <PantryStack.Screen name="IngredientDetailScreen" component={IngredientDetail} />
    </PantryStack.Navigator>
  );
};

export default PantryStackNavigator;

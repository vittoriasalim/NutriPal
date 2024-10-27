import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PantryScreen from './PantryScreen';
import IngredientDetail from './IngredientDetail'; // Your new detail screen
import PantryRecipe from './PantryRecipe';
import PantryRecipeDetail from './PantryRecipeDetail';

const PantryStack = createNativeStackNavigator();

const PantryStackNavigator = () => {
  return (
    <PantryStack.Navigator initialRouteName="PantryScreen" screenOptions={{ headerShown: false }}>
      <PantryStack.Screen name="PantryScreen" component={PantryScreen} />
      <PantryStack.Screen name="IngredientDetailScreen" component={IngredientDetail} />
      <PantryStack.Screen name="PantryRecipeScreen" component={PantryRecipe} />
      <PantryStack.Screen name="PantryRecipeDetail" component={PantryRecipeDetail} />
    </PantryStack.Navigator>
  );
};

export default PantryStackNavigator;

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MealPlanScreen from './MealPlanScreen';
import MealDetailsScreen from './MealDetailsScreen';
import SingleMealDetail from './SingleMealDetail';

const MealStack = createNativeStackNavigator();

const MealStackNavigator = () => {
  return (
    <MealStack.Navigator initialRouteName="MealPlanScreen" screenOptions={{ headerShown: false }}>
      <MealStack.Screen name="MealPlanScreen" component={MealPlanScreen} />
      <MealStack.Screen name="MealDetailsScreen" component={MealDetailsScreen} />
      <MealStack.Screen name="SingleMealDetail" component={SingleMealDetail} />
    </MealStack.Navigator>
  );
};

export default MealStackNavigator;

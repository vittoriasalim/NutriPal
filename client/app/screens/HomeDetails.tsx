import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './Home';
import MealPlanScreen from './MealPlanScreen';
import AccountProfileScreen from './AccountProfileScreen';
import Progress from './Progress';
import MealDetailsScreen from './MealDetailsScreen';
const HomeStack = createNativeStackNavigator();

const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="Home" component={Home} />
      <HomeStack.Screen name="MealPlan" component={MealPlanScreen} />
   
     
    </HomeStack.Navigator>
  );
};

export default HomeStackNavigator;
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './Home';
import MealPlanScreen from './MealPlanScreen';

import { HomeStackParamList } from '@/types/navigation';
const HomeStack = createNativeStackNavigator<HomeStackParamList>();

const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="Home" component={Home} />
      <HomeStack.Screen name="MealPlanScreen" component={MealPlanScreen} />
    </HomeStack.Navigator>
  );
};

export default HomeStackNavigator;
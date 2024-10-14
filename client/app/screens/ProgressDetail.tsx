import React from 'react';
import { Stack } from "expo-router";

import {  createNativeStackNavigator  } from '@react-navigation/native-stack';

import Progress from './Progress';
import NutritionManagement from './NutritionManagement';
import { ProgressStackParamList } from '@/types/navigation';

const ProgressStack =  createNativeStackNavigator<ProgressStackParamList>();

// Define the nested ProfileStack
const ProgressStackNavigator = () => {
  return (


    <ProgressStack.Navigator initialRouteName="ProgressScreen"  screenOptions={{
      headerShown: false, // This will hide the header
    }}>
      <ProgressStack.Screen name="ProgressScreen" component={Progress}/>
      <ProgressStack.Screen name="NutritionManagementScreen" component={NutritionManagement} /> 
    </ProgressStack.Navigator>

  );
};

export default ProgressStackNavigator;
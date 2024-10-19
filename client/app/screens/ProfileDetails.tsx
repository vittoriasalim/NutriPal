import React from 'react';
import { Stack } from "expo-router";

import {  createNativeStackNavigator  } from '@react-navigation/native-stack';

import Progress from './Progress';
import NutritionManagement from './NutritionManagement';
import { ProfileStackParamList } from '@/types/navigation';
import ChatScreen from './ChatScreen';
import AccountProfileScreen from './AccountProfileScreen';

const ProfileStack =  createNativeStackNavigator<ProfileStackParamList>();

// Define the nested ProfileStack
const ProfileStackNavigator = () => {
  return (


    <ProfileStack.Navigator initialRouteName="AccountProfileScreen"  screenOptions={{
      headerShown: false, // This will hide the header
    }}>
      <ProfileStack.Screen name="AccountProfileScreen" component={AccountProfileScreen}/>
      <ProfileStack.Screen name="Consultation" component={ChatScreen} /> 
    </ProfileStack.Navigator>

  );
};

export default ProfileStackNavigator;
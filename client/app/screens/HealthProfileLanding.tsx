import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HealthProfile from './HealthProfile'; // Import your HealthProfileScreen
import HealthGoalsSelection from './HealthGoalsSelection';
import HealthProfileView from './HealthProfileView';
import NutritionistMatch from './NutritionistMatch';
import { HealthStackParamList } from '@/types/navigation';

const HealthStack = createNativeStackNavigator<HealthStackParamList>();

const HealthProfileStackNavigator = () => {
  return (
    <HealthStack.Navigator initialRouteName="HealthProfileScreen" screenOptions={{ headerShown: false }}>
      <HealthStack.Screen name="HealthProfileScreen" component={HealthProfile} />
      <HealthStack.Screen name="HealthProfileViewScreen" component={HealthProfileView} />
      <HealthStack.Screen name="HealthGoalsSelection" component={HealthGoalsSelection} />
      <HealthStack.Screen name="NutritionistMatchScreen" component={NutritionistMatch} />
    </HealthStack.Navigator>
  );
};

export default HealthProfileStackNavigator;
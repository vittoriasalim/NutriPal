import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HealthProfile from './HealthProfile'; // Import your HealthProfileScreen
import HealthGoalsSelection from './HealthGoalsSelection';
import HealthProfileView from './HealthProfileView';
import NutritionistMatch from './NutritionistMatch';
import HealthGoalsSelectionSuccess from './HealthGoalsSelectionSuccess';
import NutritionistMatchSuccess from './NutritionistMatchSuccess';
import { HealthStackParamList } from '@/types/navigation';
import AccountProfileScreen from './AccountProfileScreen';
import ChatScreen from './ChatScreen';

const HealthStack = createNativeStackNavigator<HealthStackParamList>();

const HealthProfileStackNavigator = () => {
  return (
    <HealthStack.Navigator initialRouteName="AccountProfileScreen" screenOptions={{ headerShown: false }}>
      <HealthStack.Screen name="AccountProfileScreen" component={AccountProfileScreen} />
      <HealthStack.Screen name="Consultation" component={ChatScreen} />
      <HealthStack.Screen name="HealthProfileViewScreen" component={HealthProfileView} />
      <HealthStack.Screen name="HealthGoalsSelection" component={HealthGoalsSelection} />
      <HealthStack.Screen name="NutritionistMatchScreen" component={NutritionistMatch} />
      <HealthStack.Screen name="NutritionistMatchSuccess" component={NutritionistMatchSuccess} />
      <HealthStack.Screen name="HealthGoalsSelectionSuccess" component={HealthGoalsSelectionSuccess} />
    </HealthStack.Navigator>
  );
};

export default HealthProfileStackNavigator;
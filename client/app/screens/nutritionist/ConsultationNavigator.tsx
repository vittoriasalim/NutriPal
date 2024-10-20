import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import { ConsultationStackParamList } from '@/types/navigation';

import ChatScreen from './ChatsScreen';
import ChatList from './ChatList';
import MyTabs from './MyTabs';

const ConsultationStack = createNativeStackNavigator<ConsultationStackParamList>();

const ConsultationStackNavigator = () => {
  return (
    <ConsultationStack.Navigator initialRouteName="ClientsScreen" screenOptions={{ headerShown: false }}>
        <ConsultationStack.Screen name="ClientsScreen" component={ChatList} />
      <ConsultationStack.Screen name="Consultation" component={MyTabs} />
  
    </ConsultationStack.Navigator>
  );
};

export default ConsultationStackNavigator;

import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Bar } from 'react-native-progress';
import CalorieBurnChart from '@/components/CalorieBurnChart'
import CaloriesCard from '@/components/CaloriesCard';
import CaloriesSummary from '@/components/CaloriesSummary';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getDailyNutritionFortnightly } from '@/services/daily_nutrition';
import { getClientByUserId } from '@/services/clients';
import { useFocusEffect } from '@react-navigation/native';


interface DailyNutrition {
  id: number;
  date: string; // ISO format timestamp
  totalCalorie: number;
  totalProtein: number;
  totalFats: number;
  totalCarbohydrate: number;
  createdAt: string; // ISO format timestamp
  updatedAt: string; // ISO format timestamp
  clientId: number;
}
interface Client {
  id: number;
  userId: number;
  weight: number;
  height: number;
  healthGoals?: string[]; // Optional field
  dietaryPreferences?: string[]; // Optional field
  nutritionalNeeds?: string[]; // Optional field
  pantryId?: number; // Optional field
  recommendationCal: number;
  createdAt: string; // ISO format timestamp
  updatedAt: string; // ISO format timestamp
}
const Progress = () => {
  const [userData, setUserData] = useState<any>(null);
  const [clientData, setClientData] = useState<Client | null>(null);
  const [nutritionData, setNutritionData] = useState<DailyNutrition[]>([]);
  const [todayNutrition, setTodayNutrition] = useState<DailyNutrition | null>(null);
  const [loading, setLoading] = useState<boolean>(true);



  // Function to retrieve user data from AsyncStorage and fetch related data
  const getUserData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('user');
      if (jsonValue) {
        const user = JSON.parse(jsonValue);
        setUserData(user); // Set user data
        await fetchClientData(user.id); // Fetch client data
      } else {

        setLoading(false); // No data found, stop loading
      }
    } catch (error) {
      console.log('Error retrieving user data:', error);
      setLoading(false);
    }
  };

  // Fetch client data by userId
  const fetchClientData = async (userId: number) => {
    try {
      const client = await getClientByUserId(userId);

      setClientData(client); // Set client data
      await fetchNutritionData(client.id); // Fetch nutrition data after client is fetched
    } catch (error) {
      console.log('Error fetching client data:', error);
      setLoading(false);
    }
  };

  // Fetch nutrition data by clientId
  const fetchNutritionData = async (clientId: number) => {
    try {
      const data = await getDailyNutritionFortnightly(clientId);
      setNutritionData(data); // Set nutrition data
      console.log(nutritionData);
      setTodayNutrition(data[data.length - 1]); // Set today's nutrition
      setLoading(false);
    } catch (error) {
      console.log('Error fetching nutrition data:', error);
      setLoading(false);
    }
  };

  // useEffect to load user data when the component mounts
  useFocusEffect(
    useCallback(() => {
      // Call getUserData every time the screen comes into focus
      getUserData();

      return () => {
        // Clean-up logic if needed
      };
    }, []) // Add dependencies like 'update' to trigger re-render when it changes
  );
 
  return (
    <View style={styles.container}>

      {/* Header */}
      <Text style={styles.header}>Daily Nutrition</Text>
      {clientData && todayNutrition && (
        <CaloriesSummary 
          recommendationCal={clientData.recommendationCal} 
          totalCalorie={todayNutrition.totalCalorie} 
        />

      )}
      {clientData && todayNutrition && (
    
        <CaloriesCard recommendationCal={clientData.recommendationCal} 
          totalCalorie={todayNutrition.totalCalorie} ></CaloriesCard>
      )}
      <CalorieBurnChart nutritionData={nutritionData.slice(-7)}></CalorieBurnChart>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    textAlign: 'center',
    fontFamily:'Poppins-Regular',
    marginTop:60,
  }
    


 
});

export default Progress;
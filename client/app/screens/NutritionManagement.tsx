import AddMealCard from '@/components/AddMealCard';
import DailyMeter from '@/components/DailyMeter';
import FoodCard from '@/components/FoodCard';
import MealTabs from '@/components/MealTabs';
import WeekDays from '@/components/WeekDays';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { Text, View, StyleSheet, SafeAreaView, ScrollView, ActivityIndicator } from 'react-native';
import { getDailyNutritionFortnightly } from '../../services/daily_nutrition'; 
import { getClientByUserId } from '@/services/clients';

const NutritionManagement = (props) => {
  const [userData, setUserData] = useState(null);
  const [clientData, setClientData] = useState();
  const [nutritionData, setNutritionData] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleNutrition = (item) => {
    setSelectedNutrition(item);
  };

  const getUserData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('user');
      if (jsonValue) {
        const user = JSON.parse(jsonValue);
        setUserData(user);
        await fetchClientData(user.id);
      } else {
       
        setLoading(false);
      }
    } catch (error) {
    
      setLoading(false);
    }
  };

  const fetchClientData = async (userId) => {
    try {
      const client = await getClientByUserId(userId);
      setClientData(client);
      await fetchNutritionData(client.id);
    } catch (error) {

      setLoading(false);
    }
  };

  const fetchNutritionData = async (clientId) => {
    try {
      const data = await getDailyNutritionFortnightly(clientId);

      console.log(data); 
      setNutritionData(data);

      setLoading(false);
    } catch (error) {

      setLoading(false);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Daily Nutrition</Text>

     
      <View style={{ marginBottom: 20 }}></View>
      {clientData && (
        <WeekDays
          nutritionData={nutritionData}
          recommendationCal={clientData.recommendationCal}

        />
      )}
      


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
    fontFamily: 'Poppins-Regular',
    marginTop: 60,
  },
  secondContainer: {
    flex: 1,
  },
  scrollContent: {},
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginVertical: 10,
  },
});

export default NutritionManagement;
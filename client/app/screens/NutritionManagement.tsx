import AddMealCard from '@/components/AddMealCard';
import DailyMeter from '@/components/DailyMeter';
import FoodCard from '@/components/FoodCard';
import MealTabs from '@/components/MealTabs';
import WeekDays from '@/components/WeekDays';
import * as React from 'react';
import { Text, View, StyleSheet, SafeAreaView, ScrollView } from 'react-native';

interface NutritionManagementProps { }

const NutritionManagement = (props: NutritionManagementProps) => {
  return (
    <View style={styles.container}>

      <Text style={styles.header}>Daily Nutrition</Text>
      <View style={{ marginBottom: 20 }}></View>
      <DailyMeter></DailyMeter>
      <View style={{ marginBottom: 20 }}></View>
      <WeekDays></WeekDays>
      <View style={{ marginBottom: 0 }}></View>
      <SafeAreaView style={styles.secondContainer}>
        {/* Scrollable section */}
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <AddMealCard images={require("../../assets/images/bfast.png")} categories="Breakfast" />
          <AddMealCard images={require("../../assets/images/meal.png")} categories="Lunch" />
          <AddMealCard images={require("../../assets/images/meal.png")} categories="Dinner" />
          <MealTabs />
          <FoodCard></FoodCard>
          <FoodCard></FoodCard>
       
        </ScrollView>
      </SafeAreaView>


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
    flex: 1, // Ensure it takes the full height of the screen

  },
  scrollContent: {
    // padding: 10, // Optional: add padding to the scroll content
  },


});

export default NutritionManagement;
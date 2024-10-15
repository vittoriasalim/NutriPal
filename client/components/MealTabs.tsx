import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import FoodCard from './FoodCard';
import { getBreakfastById } from '@/services/breakfast_meals';
import { getLunchById } from '@/services/lunch_meals';
import { getDinnerById } from '@/services/dinner_meals';

interface Meal {
  mealName: string;
  description: string;
  calorie: number;
  protein: number;
  fats: number;
  carbohydrate: number;
}

interface BreakfastMealResponse {
  dailyNutritionId: number;
  mealId: number;
  id: number;
  createdAt: string;
  updatedAt: string;
  meal: Meal;
}

const MealTabs = ({dailyNutritionId}) => {
  const [selectedTab, setSelectedTab] = useState('Breakfast');
  const [meals, setMeals] = useState<BreakfastMealResponse[]>([]);
 
  // Function to fetch meals based on the selected tab
  const fetchMeals = async () => {
    try {
     
      let response: BreakfastMealResponse[];

      if (selectedTab === 'Breakfast') {
        response = await getBreakfastById(dailyNutritionId);
      } else if (selectedTab === 'Lunch') {
        response = await getLunchById(dailyNutritionId);
      } else if (selectedTab === 'Dinner') {
        response = await getDinnerById(dailyNutritionId);
      } else {
        throw new Error('Invalid tab selected');
      }
      if (!response) {
        setMeals([]); // If the response is null, set meals to an empty array
      } else {
        setMeals(response); // Set meals to the response if valid
      }
      

    } catch (error) {
      setMeals([]);
      throw error;
    }
  };

  // Fetch meals whenever selectedTab or dailyNutritionId changes
  useEffect(() => {
   
    fetchMeals();
  });


  return (
    <View>
      <View style={styles.container}>
        {/* Breakfast Tab */}
        <TouchableOpacity
          style={[
            styles.tab,
            selectedTab === 'Breakfast' && styles.activeTab, // Conditional styling for active tab
            { borderRadius: 20 }, // Left rounded border
          ]}
          onPress={() => setSelectedTab('Breakfast')}
        >
          <Text style={[styles.tabText, selectedTab === 'Breakfast' && styles.activeTabText]}>
            Breakfast
          </Text>
        </TouchableOpacity>

        {/* Lunch Tab */}
        <TouchableOpacity
          style={[
            styles.tab,
            selectedTab === 'Lunch' && styles.activeTab, // Conditional styling for active tab
          ]}
          onPress={() => setSelectedTab('Lunch')}
        >
          <Text style={[styles.tabText, selectedTab === 'Lunch' && styles.activeTabText]}>Lunch</Text>
        </TouchableOpacity>

        {/* Dinner Tab */}
        <TouchableOpacity
          style={[
            styles.tab,
            selectedTab === 'Dinner' && styles.activeTab, // Conditional styling for active tab
            { borderRadius: 20 }, // Right rounded border
          ]}
          onPress={() => setSelectedTab('Dinner')}
        >
          <Text style={[styles.tabText, selectedTab === 'Dinner' && styles.activeTabText]}>
            Dinner
          </Text>
        </TouchableOpacity>

      </View>
      {meals.map((mealData) => (
        <FoodCard
          meal={mealData.meal}
        />
      ))}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#F0F0F0', // Background color for the entire tab group
    borderRadius: 20, // Make the container rounded
    padding: 5, // Padding around the entire container
  },
  tab: {
    flex: 1, // Each tab takes equal width
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  activeTab: {
    backgroundColor: 'white', // Background color for the active tab
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    borderRadius: 20,
    elevation: 2, // Elevation for Android shadow
  },
  tabText: {
    fontSize: 16,
    color: '#7F7F7F', // Default color for inactive tabs
  },
  activeTabText: {
    color: '#000', // Text color for the active tab
    fontWeight: 'bold',
  },
});

export default MealTabs;
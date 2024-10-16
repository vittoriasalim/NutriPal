import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // For the plus icon
import MealFormPopup from './MealFormPopUp';
import { createMeal } from '@/services/meals';
import { createBreakfastMeal } from '@/services/breakfast_meals';
import { createLunchMeal } from '@/services/lunch_meals';
import { createDinnerMeal } from '@/services/dinner_meals';
import { updateDailyNutrition } from '@/services/daily_nutrition';

const AddMealCard = ({ categories, images, dailyID , onSubmit}: { categories: string, images: string , dailyID:number, onSubmit}) => {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  // Function to handle the submission of the meal data
  const handleFormSubmit = async (mealData) => {

    try {
      const response = await createMeal(mealData);
      let resCat;
      if (categories === 'Breakfast') {
       
        resCat = await createBreakfastMeal({mealId:response.id, dailyNutritionId:dailyID});

      } else if (categories === 'Lunch') {
        resCat = await createLunchMeal({mealId:response.id, dailyNutritionId:dailyID});
      } else if (categories === 'Dinner') {
        resCat = await createDinnerMeal({mealId:response.id, dailyNutritionId:dailyID});
      }

     
      // Assuming `resCat` contains nutritional data (calorie, protein, fats, carbohydrates), update daily nutrition
      if (resCat && response) {
        console.log("trying to update daily nutrition");
        const data = {
          totalCalorie: response.calorie,
          totalProtein: response.protein,
          totalFats: response.fats,
          totalCarbohydrate: response.carbohydrate
        }
        const updateRes = await updateDailyNutrition(dailyID, data);
        console.log(updateRes);
        onSubmit();
      }
      
      // Reset the form or handle additional logic here
    } catch (error) {
      
      throw error;
    } 
    setSubmittedData(mealData); // Store the submitted meal data
    setPopupVisible(false); // Close the popup
  };
  return (
    <View>
      <View style={styles.cardContainer}>
        {/* Left Icon */}
        <View style={styles.leftIconContainer}>
          <Image
            source={images} // Placeholder for the coffee cup icon
            style={styles.leftIcon}
          />
        </View>

        {/* Text Content */}
        <View style={styles.textContainer}>
          <Text style={styles.title}>Add {categories}</Text>
          <Text style={styles.subtitle}>Recommended 450-650 cal</Text>
        </View>

        {/* Add Button */}
        <TouchableOpacity style={styles.addButton} onPress={()=>setPopupVisible(true)}>
          <FontAwesome name="plus" size={20} color="white" />
        </TouchableOpacity>
      </View>
      <MealFormPopup
        isVisible={isPopupVisible}
        onClose={() => setPopupVisible(false)} // Function to close the popup
        onSubmit={handleFormSubmit} // Function to handle the form submission
      />
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,

    borderWidth: 1,
    borderColor: '#3F7E03', // Green border
    borderRadius: 10,
    backgroundColor: 'white',
    marginVertical: 8
  },
  leftIconContainer: {
    backgroundColor: '#F1E0B0', // Background color for the circle
    borderRadius: 50, // Make it a perfect circle
    padding: 5,
  },
  leftIcon: {
    width: 50, // Icon size
    height: 50,
  },
  textContainer: {
    flex: 1, // Take up the remaining space
    marginLeft: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4A4A4A', // Dark text
  },
  subtitle: {
    fontSize: 14,
    color: '#C4C4C4', // Lighter text
    marginTop: 4,
  },
  addButton: {
    backgroundColor: '#CDE26D', // Light green background for the circle
    borderRadius: 50,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AddMealCard;
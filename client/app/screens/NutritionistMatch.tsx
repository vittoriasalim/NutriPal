import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import HealthGoalsSelection from './HealthGoalsSelection';

const NutritionistMatch = () => {

  const navigation = useNavigation();

  const recommendNutritionists = (nutritionists, userGoals) => {
    // Convert user goals to a simplified format for matching
    const simplifiedGoals = userGoals.map(goal => {
      // Extract the base goal (e.g., "Weight Loss: 3" becomes "Weight Loss")
      const baseGoal = goal.includes(':') ? goal.split(':')[0].trim() : goal;
      return baseGoal;
    });
  
    // Create a scoring system to rank nutritionists
    const nutritionistScores = nutritionists.map(nutritionist => {
      const { specialisation } = nutritionist;
  
      // Count how many user goals match the nutritionist's specializations
      const matches = specialisation.filter(spec => simplifiedGoals.includes(spec)).length;
  
      return {
        nutritionist,
        score: matches,
      };
    });
  
    // Sort nutritionists based on scores in descending order
    const sortedNutritionists = nutritionistScores.sort((a, b) => b.score - a.score);
  
    // Filter out nutritionists who don't match any goals
    const recommendedNutritionists = sortedNutritionists.filter(n => n.score > 0);
  
    // Get the top 5 nutritionists (or fewer if not enough matches)
    const topNutritionists = recommendedNutritionists.slice(0, 5).map(n => n.nutritionist);
  
    return topNutritionists;
  };
  
  // Example usage
  const nutritionists = [
    { name: "John Doe", specialisation: ["Weight Management", "Allergy Management"] },
    { name: "Jane Smith", specialisation: ["Fitness Goals", "Mental Well-Being"] },
    { name: "Emily Johnson", specialisation: ["Health Improvement", "Vegan Diet"] },
    { name: "Michael Brown", specialisation: ["Weight Management", "Digestive Health"] },
    { name: "Sarah Davis", specialisation: ["Dietary Preferences", "Clean Eating"] },
  ];
  
  const userGoals = ['Mental Well-Being', 'Weight Loss: 3', 'Clean Eating'];
  
  const recommended = recommendNutritionists(nutritionists, userGoals);
  console.log(recommended);
  
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nutritionist Matching</Text>
      <Button title="Back to Health Profile" onPress={() => navigation.goBack()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#91C788',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  messageContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  messageText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default NutritionistMatch;
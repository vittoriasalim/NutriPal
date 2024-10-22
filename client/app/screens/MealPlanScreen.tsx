import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { mealPlan } from '../../assets/mealPlanTestData';

const MealPlanScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Meal Plan</Text>
      {Object.keys(mealPlan).map((day) => (
        <View key={day} style={styles.dayContainer}>
          <Text style={styles.dayTitle}>{day.charAt(0).toUpperCase() + day.slice(1)}</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {Object.keys(mealPlan[day]).map((meal) => (
              <View key={meal} style={styles.mealCard}>
                <Image
                  source={require('../../assets/images/mockMealPlan/steak.jpg')} // Replace with actual food image
                  style={styles.image}
                />
                <Text style={styles.mealType}>{meal.charAt(0).toUpperCase() + meal.slice(1)}</Text>
                <Text style={styles.mealName}>{mealPlan[day][meal].name}</Text>
                <Text style={styles.calories}>{`${mealPlan[day][meal].calorie} kcal`}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 80,
    //backgroundColor: '#91C788', // Background color
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    fontFamily: 'Poppins-Bold',
    textAlign: 'center',
  },
  dayContainer: {
    marginBottom: 20,
    height: 300,
    //overflow: 'visible',
    //backgroundColor: 'red',
  },
  dayTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    fontFamily: 'Poppins-Regular',
    letterSpacing: 1,
  },
  mealCard: {
    backgroundColor: '#BFEDB7',
    borderRadius: 10,
    padding: 20,
    marginRight: 20,
    width: 230,
    height: 250,
    alignItems: 'center',
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    // Elevation for Android
    elevation: 5,
  },
  image: {
    width: 140,
    height: 140,
    borderRadius: 50,
    marginBottom: 15,
  },
  mealType: {
    fontFamily: 'Poppins-Bold',
    letterSpacing: 1,
    fontSize: 16,
    marginBottom: 2, // Space between meal type and meal name
  },
  mealName: {
    fontFamily: 'Poppins-Regular',
    letterSpacing: 1,
    fontSize: 15,
    marginBottom: 2, // Space between meal name and calories
  },
  calories: {
    fontSize: 12,
    color: '#888',
    fontFamily: 'Poppins-Regular',
    letterSpacing: 1,
  },
});

export default MealPlanScreen;

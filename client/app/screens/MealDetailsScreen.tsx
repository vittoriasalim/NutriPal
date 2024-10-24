import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { mealPlan } from '../../assets/mealPlanTestData';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { MealStackParamList } from '@/types/navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MealDetailsScreen = ({ route }) => {
  const navigation = useNavigation<NavigationProp<MealStackParamList>>();
  const { day, meals } = route.params; 

  // Function to truncate the description after 10 words
  const truncateDescription = (description) => {
    const words = description.split(' ');
    if (words.length > 10) {
      return words.slice(0, 10).join(' ') + '...';
    }
    return description;
  };

  // Function to get the appropriate image source based on the meal type
  const getMealImage = (mealType) => {
    switch (mealType) {
      case 'breakfast':
        return require('../../assets/images/breakfast.jpg');
      case 'lunch':
        return require('../../assets/images/lunch.jpg');
      case 'dinner':
        return require('../../assets/images/dinner.jpg');
      default:
        return require('../../assets/images/dinner.jpg');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{day.charAt(0).toUpperCase() + day.slice(1)} Meals</Text>
      {Object.keys(meals).map((meal) => (
        <TouchableOpacity
          key={meal}
          onPress={() => {
            console.log(meals[meal]); // Log the meal data
            navigation.navigate('SingleMealDetail', { meal: meals[meal] });
          }}
        >
          <View style={styles.shadowBox}>
            <View style={styles.mealCard}>
              <View style={styles.descriptionContainer}>
                <Text style={styles.mealType}>{meal.charAt(0).toUpperCase() + meal.slice(1)}</Text>
                <Text style={styles.mealName}>{meals[meal].mealName}</Text>
                <Text style={styles.calories}>{`${meals[meal].calorie} kcal`}</Text>
                {/* Use the truncation function for the description */}
                <Text style={styles.description}>{truncateDescription(meals[meal].description)}</Text>
              </View>
              <Image
                source={getMealImage(meal)} // Use the function to get the correct image source
                style={styles.image}
              />
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 80,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontFamily: 'Poppins-Regular',
    marginBottom: 30,
    textAlign: 'center',
  },
  image: {
    width: '50%', 
    height: '100%', 
    resizeMode: 'cover',
  },
  mealCard: {
    flexDirection: 'row',
    borderRadius: 10,
    marginBottom: 30,
    overflow: 'hidden',
    backgroundColor: 'white',
    height: 200,
  },
  shadowBox: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  descriptionContainer: {
    flex: 1,
    padding: 10,
    paddingLeft: 20,
    justifyContent: 'center',
  },
  mealType: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    letterSpacing: 1,
  },
  mealName: {
    fontSize: 14,
    marginBottom: 5,
    letterSpacing: 1,
    fontFamily: 'Poppins-Regular',
  },
  calories: {
    fontSize: 12,
    color: '#888',
    fontFamily: 'Poppins-Regular',
    marginBottom: 5,
  },
  description: {
    fontSize: 10,
    fontFamily: 'Poppins-Regular',
    letterSpacing: 1,
  },
});

export default MealDetailsScreen;

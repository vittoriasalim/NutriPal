import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { mealPlan } from '../../assets/mealPlanTestData';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { MealStackParamList } from '@/types/navigation';

const MealPlanScreen = () => {
  const navigation = useNavigation<NavigationProp<MealStackParamList>>();

  const handleViewMore = (day) => {
    navigation.navigate('MealDetailsScreen', { day }); // Navigate to MealDetailsScreen
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.title}>Meal Plan</Text>
      <Text style={styles.subtitle}> This week's meal plan is curated to help you meet your health goals!</Text>
      {Object.keys(mealPlan).map((day) => (
        <View key={day} style={styles.dayContainer}>
          <View style={styles.dayHeader}>
            <Text style={styles.dayTitle}>{day.charAt(0).toUpperCase() + day.slice(1)}</Text>
            <TouchableOpacity style={styles.viewMoreButton} onPress={() => handleViewMore(day)}>
                <Text style={styles.viewMoreText}>View More</Text>
                <Ionicons name="chevron-forward-outline" size={12} color="#888" />
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {Object.keys(mealPlan[day]).map((meal) => { 
              const mealData = mealPlan[day][meal]; 
              return (
              <View key={meal} style={styles.mealCard}>
                <Image
                  source={require('../../assets/images/mockMealPlan/steak.jpg')} // Replace with actual food image
                  style={styles.image}
                />
                <Text style={styles.mealType}>{meal.charAt(0).toUpperCase() + meal.slice(1)}</Text>
                <Text style={styles.mealName}>{mealData.name}</Text>
                <Text style={styles.calories}>{`${mealPlan[day][meal].calorie} kcal`}</Text>
              </View>
              );
            })}
          </ScrollView>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 20,
    paddingTop: 80,
  },
  contentContainer: {
    paddingBottom: 200, // Add padding to the bottom to prevent content from being obscured
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
    paddingRight: 20,
  },
  subtitle: {
    fontSize: 12,
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
    marginBottom: 30,
    letterSpacing: 1,
    lineHeight: 20,
    paddingRight: 20,
  },
  dayContainer: {
    marginBottom: 30,
    height: 310,
    //overflow: 'visible',
    //backgroundColor: 'red',
  },
  dayTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Regular',
    letterSpacing: 1,
  },
  mealCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    marginRight: 20,
    width: 230,
    height: 250,
    alignItems: 'center',
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: {
      width: 4,
      height: 5,
    },
    shadowOpacity: 0.2,
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
  dayHeader: {
    paddingRight: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  viewMoreButton: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  viewMoreText: {
    fontFamily: 'Poppins-Regular',
    color: '#888',
    fontSize: 12,
    letterSpacing: 1,
    marginRight: 5,
  },
});

export default MealPlanScreen;

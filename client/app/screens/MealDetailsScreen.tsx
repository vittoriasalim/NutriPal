import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { mealPlan } from '../../assets/mealPlanTestData';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { MealStackParamList } from '@/types/navigation';

const MealDetailsScreen = ({ route }) => {

  const navigation = useNavigation<NavigationProp<MealStackParamList>>();
  const { day } = route.params; 
  const meals = mealPlan[day];

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
                    <Text style={styles.mealName}>{meals[meal].name}</Text>
                    <Text style={styles.calories}>{`${meals[meal].calorie} kcal`}</Text>
                    {/* Include a description if you have one */}
                    <Text style={styles.description}>{meals[meal].description}</Text>
                </View>
                <Image
                    source={require('../../assets/images/mockMealPlan/steak.jpg')} // Use dynamic image source
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
    resizeMode: 'cover', // Ensure the image fills the space correctly
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
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    // Elevation for Android
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
    //color: '#888',
    fontFamily: 'Poppins-Regular',
    letterSpacing: 1,
  },
});

export default MealDetailsScreen;

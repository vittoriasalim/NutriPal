import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { ProgressBar } from 'react-native-paper'; // You can use other progress bar libraries too.

const FoodCard = ({meal}) => {
  return (
    <View style={styles.card}>
      {/* Top Row: Food image, Title and Calorie info, and Menu icon */}
      <View style={styles.topRow}>
        {/* Food Image */}
        <Image
          source={require('../assets/images/bfast.png')} // Replace with your local image path
          style={styles.foodImage}
        />
        {/* Title and Calories */}
        <View style={styles.textContainer}>
          <Text style={styles.title}>{meal.mealName}</Text>
          <View style={styles.calorieContainer}>
            <Text style={styles.calories}>🔥 {meal.calorie} kcal</Text>
          </View>
        </View>
        {/* Three-dot Menu Icon */}
        <TouchableOpacity style={styles.menuButton}>
          <FontAwesome name="ellipsis-h" size={24} color="#2C2C2C" />
        </TouchableOpacity>
      </View>

      {/* Nutrient Bars */}
      <View style={styles.nutrientContainer}>
        {/* Protein */}
        <View style={styles.nutrientItem}>
          <ProgressBar progress={meal.protein/100} color="#72BF44" style={styles.progressBar} />
          <Text style={styles.nutrientValue}>{meal.protein}g</Text>
          <Text style={styles.nutrientLabel}>Protein</Text>
        </View>
        {/* Fats */}
        <View style={styles.nutrientItem}>
          <ProgressBar progress={meal.fats/100} color="#E96A6A" style={styles.progressBar} />
          <Text style={styles.nutrientValue}>{meal.fats}g</Text>
          <Text style={styles.nutrientLabel}>Fats</Text>
        </View>
        {/* Carbs */}
        <View style={styles.nutrientItem}>
          <ProgressBar progress={meal.fats/100} color="#FFD700" style={styles.progressBar} />
          <Text style={styles.nutrientValue}>{meal.carbohydrate}g</Text>
          <Text style={styles.nutrientLabel}>Carbs</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderColor: '#E0D4B8', // Border color matching the image
    borderWidth: 1,
    borderRadius: 15,
    padding: 15,
    backgroundColor: 'white',
    marginVertical:10,
    marginBottom: 20,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  foodImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C2C2C',
  },
  calorieContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  calories: {
    fontSize: 14,
    color: '#A5A5A5',
  },
  menuButton: {
    padding: 5,
  },
  nutrientContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  nutrientItem: {
    alignItems: 'center',
  },
  progressBar: {
    width: 50,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E6E6E6', // Background for progress bar
  },
  nutrientValue: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 5,
    color: '#2C2C2C',
  },
  nutrientLabel: {
    fontSize: 14,
    color: '#7F7F7F',
  },
});

export default FoodCard;
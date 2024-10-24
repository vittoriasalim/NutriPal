import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SingleMealDetail = ({ route }) => {
  const { meal } = route.params;

  // Split the title into words
  const titleWords = meal.name.split(' ');

  return (
    <View style={styles.container}>
      <Ionicons style={styles.backButton} name="chevron-back-outline" size={30} color="#888" />
      <View style={styles.contentContainer}>
        <View style={styles.allNutritionsContainer}>
          {/* Nutritional Information */}
          <View style={[styles.nutrientContainer, styles.green]}>
            <Text style={styles.nutrientNumber}>{`${meal.calorie}`}</Text>
            <Text style={styles.nutrientTitle}>Calories</Text>
          </View>
          <View style={[styles.nutrientContainer, styles.green]}>
            <Text style={styles.nutrientNumber}>{`${meal.protein}`}</Text>
            <Text style={styles.nutrientTitle}>Protein</Text>
          </View>
          <View style={[styles.nutrientContainer, styles.green]}>
            <Text style={styles.nutrientNumber}>{`${meal.carbohydrate}`}</Text>
            <Text style={styles.nutrientTitle}>Carbohydrate</Text>
          </View>
          <View style={[styles.nutrientContainer, styles.green]}>
            <Text style={styles.nutrientNumber}>{`${meal.fat}`}</Text>
            <Text style={styles.nutrientTitle}>Fat</Text>
          </View>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{titleWords[0]}</Text>
          {titleWords.length > 1 && (
            <Text style={styles.title}>{titleWords.slice(1).join(' ')}</Text>
          )}
          <Text style={styles.description}>{meal.description}</Text>
        </View>
      </View>
      <View style={styles.imageContainer}>
        <Image
          source={require('../../assets/images/mockMealPlan/steak.jpg')} // Use the meal image
          style={styles.image}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#fff',
    paddingBottom: 120,
  },
  contentContainer: {
    paddingTop: 30,
    flexDirection: 'row',
    flex: 1,
  },
  backButton: {
    marginBottom: 20,
  },
  title: {
    fontSize: 35,
    fontFamily: 'Poppins-Regular',
    textAlign: 'right',
    letterSpacing: 1,
    lineHeight: 45,
  },
  imageContainer: {
    position: 'absolute',
    right: -40, // Adjust this value to control how much of the image goes off-screen
    top: 150, // Adjust this value to position the image vertically
    width: 300, // Set a fixed width for the circle
    height: 300, // Set a fixed height for the circle
    overflow: 'hidden',
    borderRadius: 1000, // Half of width/height for a circular shape
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  allNutritionsContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  green: {
    backgroundColor: '#A5D6A7',
  },
  nutrientContainer: {
    padding: 10,
    width: 120,
    height: 150,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  nutrientTitle: {
    fontSize: 12,
    color: 'white',
    fontFamily: 'Poppins-Regular',
    letterSpacing: 1,
  },
  nutrientNumber: {
    fontSize: 25,
    color: 'white',
    marginBottom: 5,
    fontFamily: 'Poppins-Bold',
  },
  description: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    letterSpacing: 1,
    textAlign: 'right',
    color: '#888',
    marginTop: 40,
    marginBottom: 20,
  },
  longDescription: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    letterSpacing: 1,
    textAlign: 'justify',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'flex-start', // Start from the top
    marginRight: 10, // Add margin for spacing
    paddingTop: 350, // Add some padding to create space
    paddingLeft: 35,
  },
});

export default SingleMealDetail;

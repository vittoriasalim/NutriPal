import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { MealStackParamList } from '@/types/navigation';
import { Ionicons } from '@expo/vector-icons';

const SingleMealDetail = ({ route }) => {
  const navigation = useNavigation<NavigationProp<MealStackParamList>>();
  const { meal, time } = route.params;

  console.log("SINGLE", meal);

  // Split the title into words
  //const titleWords = meal.name.split(' ');

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
    <View style={styles.container}>
      <Ionicons style={styles.backButton} name="chevron-back-outline" size={30} color="#888" onPress={() => {
            navigation.goBack();
          }} />
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{`${meal.mealName}`}</Text>
        <View style={styles.imageContainer}>
          <Image
            source={getMealImage(time)}
            style={styles.image}
          />
        </View>
        <View style={styles.allNutritionsContainer}>
          {/* Nutritional Information */}
          <View style={[styles.nutrientContainer, styles.green]}>
            <Text style={styles.nutrientNumber}>{`${meal.calorie}`}</Text>
            <Text style={styles.nutrientTitle}>Calories</Text>
            <Text style={styles.nutrientTitle}>(kCal)</Text>
          </View>
          <View style={[styles.nutrientContainer, styles.green]}>
            <Text style={styles.nutrientNumber}>{`${meal.protein}`}</Text>
            <Text style={styles.nutrientTitle}>Protein</Text>
            <Text style={styles.nutrientTitle}>(gram)</Text>
          </View>
          <View style={[styles.nutrientContainer, styles.green]}>
            <Text style={styles.nutrientNumber}>{`${meal.carbohydrate}`}</Text>
            <Text style={styles.nutrientTitle}>Carbohydrate</Text>
            <Text style={styles.nutrientTitle}>(gram)</Text>
          </View>
          <View style={[styles.nutrientContainer, styles.green]}>
            <Text style={styles.nutrientNumber}>{`${meal.fats}`}</Text>
            <Text style={styles.nutrientTitle}>Fat</Text>
            <Text style={styles.nutrientTitle}>(gram)</Text>
          </View>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.description}>{meal.description}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //padding: 20,
    paddingTop: 60,
    backgroundColor: '#fff',
    paddingBottom: 120,
  },
  contentContainer: {
    flexDirection: 'column',
    alignItems:'center',
    flex: 1,
  },
  backButton: {
    marginBottom: 20,
  },
  title: {
    fontSize: 25,
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
    letterSpacing: 1,
    lineHeight: 40,
    paddingHorizontal: 40,
    marginBottom: 20,
  },
  imageContainer: {
    width: '100%', // Set a fixed width for the circle
    height: 300, // Set a fixed height for the circle
    //overflow: 'visible',
    //borderRadius: 1000, // Half of width/height for a circular shape
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  allNutritionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  green: {
    backgroundColor: '#A5D6A7',
  },
  nutrientContainer: {
    padding: 5,
    width: 90,
    height: 100,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  nutrientTitle: {
    fontSize: 8,
    color: 'white',
    fontFamily: 'Poppins-Bold',
    letterSpacing: 1,
  },
  nutrientNumber: {
    fontSize: 15,
    color: 'white',
    marginBottom: 5,
    fontFamily: 'Poppins-Bold',
  },
  textContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  description: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    letterSpacing: 1,
    textAlign: 'center',
    color: '#888',
  },
});

export default SingleMealDetail;

import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SingleMealDetail = ({ route }) => {
  const { meal } = route.params;

  return (
    <View style={styles.container}>
      <Ionicons name="chevron-forward-outline" size={12} color="#888" />
      <Text style={styles.title}>{meal.name}</Text>
      <Image
        source={require('../../assets/images/mockMealPlan/steak.jpg')} // Use the meal image
        style={styles.image}
      />
      <Text style={styles.calories}>{`${meal.calorie} kcal`}</Text>
      <Text style={styles.description}>{meal.description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 20,
  },
  calories: {
    fontSize: 18,
    color: '#888',
  },
  description: {
    fontSize: 14,
  },
});

export default SingleMealDetail;

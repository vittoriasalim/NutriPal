import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // For the plus icon

const AddMealCard = ({ categories, images }: { categories: string, images:string }) => {
  return (
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
      <TouchableOpacity style={styles.addButton}>
        <FontAwesome name="plus" size={20} color="white" />
      </TouchableOpacity>
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
    marginVertical:8
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
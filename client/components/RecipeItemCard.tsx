import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import navigation hook
import { IngredientStackParamList } from '@/types/navigation'; // Replace with your navigation types
import { NavigationProp } from '@react-navigation/native';

interface RecipeItemCardProps {
  title: string;
  description: string;
  category: 'Weight Gain' | 'Maintain' | 'Weight Loss'; // Pass category to change background color
  recipe: any; // Recipe object to pass to the detail screen
}

const RecipeItemCard: React.FC<RecipeItemCardProps> = ({ title, description, category, recipe }) => {
  const navigation = useNavigation<NavigationProp<IngredientStackParamList>>(); // Hook to handle navigation

  // Background colors based on category
  const getBackgroundColor = (category: string) => {
    switch (category) {
      case 'Weight Gain':
        return '#FFCDD2'; // Light Red for Weight Gain
      case 'Maintain':
        return '#C8E6C9'; // Light Green for Maintain
      case 'Weight Loss':
        return '#BBDEFB'; // Light Blue for Weight Loss
      default:
        return '#F0F0F0'; // Default grey background
    }
  };

  // Handle the card press event
  const handlePress = () => {
    navigation.navigate('PantryRecipeDetail', { recipe }); // Navigate to the detail screen and pass the recipe
  };

  return (
    <View style={[styles.container, { backgroundColor: getBackgroundColor(category) }]}>
      <TouchableOpacity style={{ flex: 1 }} onPress={handlePress}> {/* Add onPress to navigate */}
        <View style={styles.card}>
          {/* Placeholder for image at the top */}
          <View style={styles.imagePlaceholder}></View>
          
          {/* Title and description */}
          <Text style={styles.itemName}>{title}</Text>
          <Text style={styles.itemDescription}>{description}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

// Styles for the card
const styles = StyleSheet.create({
  container: {
    width: '48%',
    marginBottom: 15, // Space between cards
    borderRadius: 12,
    overflow: 'hidden', // Rounded corners for the card
  },
  card: {
    padding: 15,
    justifyContent: 'center',
  },
  imagePlaceholder: {
    width: '100%',
    height: 130, // Placeholder space for an image
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 10,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    fontFamily: 'Poppins-Regular',
    textAlign: 'left',
  },
  itemDescription: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'Poppins-Regular',
    textAlign: 'left',
  },
});

export default RecipeItemCard;

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native'; // Import navigation hook
import { IngredientStackParamList } from '@/types/navigation'; // Replace with your navigation types

// Import the images for the categories
import weightGainImage from '@/assets/images/gain.png';
import weightLossImage from '@/assets/images/loss.png';
import maintainImage from '@/assets/images/maintain.png';

const RecipeItemCard = ({
  title,
  description,
  category,
  recipe
}: {
  title: string;
  description: string;
  category: string;
  recipe: any; // Recipe object to pass to the detail screen
}) => {
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

  // Get the correct image based on the category
  const getImageForCategory = (category: string) => {
    switch (category) {
      case 'Weight Gain':
        return weightGainImage;
      case 'Maintain':
        return maintainImage;
      case 'Weight Loss':
        return weightLossImage;
      default:
        return null; // You can add a default image if needed
    }
  };

  // Handle the card press event
  const handlePress = () => {
    navigation.navigate('PantryRecipeDetail', { recipe }); // Navigate to the detail screen and pass the recipe
  };

  return (
    <View style={[styles.container, { backgroundColor: getBackgroundColor(category) }]}>
      {title && recipe && description ? (
        <TouchableOpacity style={{ flex: 1 }} onPress={handlePress}>
          <View style={styles.card}>
            {/* Image based on the category */}
            <Image source={getImageForCategory(category)} style={styles.recipeImage} />
            <Text style={styles.itemName}>{title}</Text>
            <Text style={styles.itemDescription}>{description}</Text>
          </View>
        </TouchableOpacity>
      ) : null}
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
  recipeImage: {
    width: '100%',
    height: 130, // Adjust the height for the image
    borderRadius: 10,
    marginBottom: 10,
    resizeMode: 'cover', // Cover the space without distortion
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

import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { IngredientStackParamList } from '@/types/navigation'; // Replace with your navigation types
import { NavigationProp } from '@react-navigation/native';

// Import your images
const vegetableImage = require('@/assets/images/vegetables.png');
const meatImage = require('@/assets/images/meat.png');
const seafoodImage = require('@/assets/images/seafood.png');

interface PantryItemCardProps {
  ingredient: any; // Ingredient object
  totalQuantity: number; // Combined quantity
  earliestExpiryDate: string | Date; // Earliest expiry date
  items: any[]; // Full list of pantry items for this ingredient
}

const PantryItemCard: React.FC<PantryItemCardProps> = ({ ingredient, totalQuantity, earliestExpiryDate}) => {
  const navigation = useNavigation<NavigationProp<IngredientStackParamList>>(); // Hook to handle navigation

  const { ingredientName, food_type, unit, id } = ingredient;

  // Determine the image source based on the category (food type)
  const getImageForCategory = (category: string | undefined) => {
    switch (category?.toLowerCase()) {
      case 'meat':
        return meatImage;
      case 'seafood':
        return seafoodImage;
      case 'vegetable':
      default:
        return vegetableImage;
    }
  };

  // Navigate to the ingredient detail page when card is pressed
  const handlePress = () => {
    navigation.navigate('IngredientDetailScreen', {
      id,
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={{ flex: 1 }} onPress={handlePress}>
        <View style={styles.card}>
          <Image source={getImageForCategory(food_type)} style={styles.image} />
          <Text style={styles.itemName}>{ingredientName}</Text>
          <Text style={styles.itemQuantity}>
            {totalQuantity} {unit}
          </Text>
          <Text style={styles.expiryDate}>
            Expiry: {new Date(earliestExpiryDate).toLocaleDateString()}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

// Styles for the card
const styles = StyleSheet.create({
  container: {
    width: '48%',
  },
  card: {
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    padding: 30,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: '100%',  // Take up the full width of the container
    height: undefined, // Let height be calculated based on aspect ratio
    aspectRatio: 1.5, // Adjust this based on the image's aspect ratio (e.g., 1.5 for rectangular images)
    borderRadius: 10,
    marginBottom: 10,
    resizeMode: 'cover', // Ensure the image covers the space without distortion
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    fontFamily: 'Poppins-Regular',
    textAlign: 'left',
  },
  itemQuantity: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'Poppins-Regular',
    textAlign: 'left',
  },
  expiryDate: {
    fontSize: 12,
    color: '#888',
    marginTop: 5,
    fontFamily: 'Poppins-Regular',
    textAlign: 'left',
  },
});

export default PantryItemCard;

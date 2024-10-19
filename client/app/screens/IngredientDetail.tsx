import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions, FlatList } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';

// Import your images
const vegetableImage = require('@/assets/images/vegetables.png');
const meatImage = require('@/assets/images/meat.png');
const seafoodImage = require('@/assets/images/seafood.png');

// Mock health benefits data for demo purposes
const healthBenefits = [
  { id: '1', image: require('@/assets/images/benefits/healthy-skin.png') },
  { id: '2', image: require('@/assets/images/benefits/heart-health.png') },
  { id: '3', image: require('@/assets/images/benefits/blood-sugar.png') },
];

const IngredientDetailScreen: React.FC = () => {
  const screenHeight = Dimensions.get('window').height;

  // Retrieve the passed item from the navigation route
  const route = useRoute<RouteProp<{ params: { item: any } }, 'params'>>();
  const { item } = route.params; // Destructure the item from route params

  // Extract details from the passed item
  const { ingredient, quantity, expiryDate, price, description } = item;
  const { ingredientName, food_type, storageInstructions, unit } = ingredient;

  // Determine the image source based on the food type (category)
  const getImageForCategory = (category: string) => {
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

  return (
    <View style={styles.container}>
      {/* Header with "Pantry" text */}
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Pantry</Text>
      </View>

      {/* Ingredient Details */}
      <View style={styles.ingredientDetailContainer}>
        {/* Ingredient Image and Name */}
        <View style={styles.imageRow}>
          <Image 
            source={getImageForCategory(food_type)} 
            style={styles.ingredientImage} 
            resizeMode="contain" // Ensures the image fits without distortion
          />
          <View>
            <Text style={styles.ingredientName}>{ingredientName}</Text>
            <Text style={styles.expiryText}>Expiry: {new Date(expiryDate).toLocaleDateString()}</Text>
          </View>
        </View>

        {/* Quantity and Price */}
        <View style={styles.detailsRow}>
          <View style={styles.detailBlock}>
            <Text style={styles.detailLabel}>Quantity</Text>
            <Text style={styles.detailValue}>{quantity} {unit}</Text>
          </View>
          <View style={styles.detailBlock}>
            <Text style={styles.detailLabel}>Price</Text>
            <Text style={styles.detailPrice}>${price} / kg</Text>
          </View>
        </View>

        {/* Product Detail */}
        <View style={styles.productDetailContainer}>
          <Text style={styles.productDetailLabel}>Product Detail</Text>
          <Text style={styles.productDetailText}>
            {description || 'No description available for this ingredient.'}
          </Text>
        </View>

        {/* Health Benefits Section */}
        <View style={styles.healthBenefitsContainer}>
          <Text style={styles.healthBenefitsLabel}>Health Benefits</Text>
          <FlatList
            data={healthBenefits}
            keyExtractor={(item) => item.id}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <View style={styles.benefitCard}>
                <Image source={item.image} style={styles.benefitImageOnly} />
              </View>
            )}
          />
        </View>

        {/* Storage Instructions Section */}
        <View style={styles.storageInstructionsContainer}>
          <Text style={styles.storageInstructionsLabel}>Storage Instructions</Text>
          <Text style={styles.storageInstructionsText}>
            {storageInstructions || 'No storage instructions available for this ingredient.'}
          </Text>
        </View>
      </View>
    </View>
  );
};

// Styles for the screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  headerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  header: {
    fontSize: 24,
    fontFamily: 'Poppins-Regular',
    marginTop: 60,
    textAlign: 'center',
  },
  ingredientDetailContainer: {
    borderRadius: 12,
    padding: 20,
    elevation: 4, // Add shadow for Android
    shadowColor: '#000', // Add shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    backgroundColor: '#efefef',
  },
  imageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  ingredientImage: {
    width: 100,  // Ensure proper width
    height: 100, // Set equal height and width to maintain aspect ratio
    borderRadius: 12,
    marginRight: 20,
  },
  ingredientName: {
    fontSize: 22,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Regular',
  },
  expiryText: {
    fontSize: 16,
    color: '#888',
    fontFamily: 'Poppins-Regular',
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  detailBlock: {
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 16,
    color: '#888',
    fontFamily: 'Poppins-Regular',
  },
  detailValue: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Regular',
  },
  detailPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Regular',
    color: '#000',
  },
  productDetailContainer: {
    marginTop: 30,
  },
  productDetailLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Regular',
    marginBottom: 10,
  },
  productDetailText: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#666',
    lineHeight: 24,
  },
  healthBenefitsContainer: {
    marginTop: 30,
  },
  healthBenefitsLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Regular',
    marginBottom: 10,
  },
  benefitCard: {
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 12,
    width: 130,
    height: 150,
    alignItems: 'center',
    marginRight: 15,
  },
  benefitImageOnly: {
    width: 130,
    height: 150,
  },
  storageInstructionsContainer: {
    marginTop: 30,
  },
  storageInstructionsLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Regular',
    marginBottom: 10,
  },
  storageInstructionsText: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#666',
    lineHeight: 24,
  },
});

export default IngredientDetailScreen;

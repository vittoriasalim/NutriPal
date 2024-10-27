import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, Dimensions, Alert } from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import EditModal from '@/components/EditModal'; // Import the new modal component
import { getPantryIngredient } from '@/services/pantry'; // Import service for fetching ingredient
import AsyncStorage from '@react-native-async-storage/async-storage'; // AsyncStorage for user data

// Import your images
const vegetableImage = require('@/assets/images/vegetables.png');
const meatImage = require('@/assets/images/meat.png');
const seafoodImage = require('@/assets/images/seafood.png');

// Mock health benefits data
const healthBenefits = [
  { id: '1', image: require('@/assets/images/benefits/healthy-skin.png') },
  { id: '2', image: require('@/assets/images/benefits/heart-health.png') },
  { id: '3', image: require('@/assets/images/benefits/blood-sugar.png') },
];

const IngredientDetailScreen: React.FC = () => {
  const navigation = useNavigation();
  const screenHeight = Dimensions.get('window').height;

  // Retrieve the passed ingredientId from the navigation route
  const route = useRoute<RouteProp<{ params: { id: number } }, 'params'>>();
  const { id } = route.params; // Destructure the ingredientId from route params

  // State to hold fetched ingredient data
  const [ingredientData, setIngredientData] = useState<any[]>([]); // Holds the fetched ingredient data
  const [loading, setLoading] = useState(true); // State for managing loading
  const [isModalVisible, setModalVisible] = useState(false); // State to manage the modal visibility

  // Function to fetch user data from AsyncStorage and fetch ingredient data
  const fetchIngredientData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('user');
      if (jsonValue) {
        const user = JSON.parse(jsonValue);
        const data = await getPantryIngredient(user.id, id); // Fetch specific ingredient data
        if (data.length > 0) {
          setIngredientData(data);
        } else {
          Alert.alert('Error', 'No ingredient data found.');
        }
        setLoading(false);
      } else {
        Alert.alert('Error', 'No user data found.');
        setLoading(false);
      }
    } catch (error) {
      console.error('Error fetching ingredient data:', error);
      Alert.alert('Error', 'Failed to load ingredient data.');
      setLoading(false);
    }
  };

  // Effect hook to fetch ingredient data when the screen is loaded
  useEffect(() => {
    fetchIngredientData();
  }, []);

  // Toggle the modal visibility
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
    fetchIngredientData();
  }

  // Determine the image source based on the food type
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

  const handleAddItem = () => {
    setModalVisible(true); // Show the modal to add an ingredient
  };

  const handleSuccess = () => {
    setModalVisible(false); // Close the modal after saving
    if (ingredientData) {
      fetchIngredientData(); // Refresh the pantry data after adding an ingredient
    }
  };

  // if (loading) {
  //   return <Text>Loading...</Text>; // Display a loading indicator while fetching data
  // }

  if (!ingredientData.length) {
    return <Text>No ingredient data found.</Text>; // Show if no data found
  }

  // Extract data from the fetched ingredient data
  const { ingredient } = ingredientData[0]; // Get the main ingredient information
  const { ingredientName, food_type, storageInstructions, unit, description, amount, healthBenefits } = ingredient;

  // Combine quantities and find the earliest expiry date
  const totalQuantity = ingredientData.reduce((sum, currentItem) => sum + currentItem.quantity, 0);
  const earliestExpiryDate = ingredientData.reduce((earliest, currentItem) => {
    const currentExpiryDate = new Date(currentItem.expiryDate);
    return currentExpiryDate < earliest ? currentExpiryDate : earliest;
  }, new Date(ingredientData[0].expiryDate));

  return (
    <View style={styles.container}>
      {/* Header with "Pantry" text and Edit button */}
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Pantry</Text>
        <TouchableOpacity onPress={toggleModal} style={styles.editButton}>
          <Ionicons name="pencil" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Ingredient Details */}
      <View style={styles.ingredientDetailContainer}>
        {/* Ingredient Image and Name */}
        <View style={styles.imageRow}>
          <Image 
            source={getImageForCategory(food_type)} 
            style={styles.ingredientImage} 
            resizeMode="contain"
          />
          <View>
            <Text style={styles.ingredientName}>{ingredientName}</Text>
            <Text style={styles.expiryText}>Expiry: {earliestExpiryDate.toLocaleDateString()}</Text>
          </View>
        </View>

        {/* Quantity and Price */}
        <View style={styles.detailsRow}>
          <View style={styles.detailBlock}>
            <Text style={styles.detailLabel}>Total Quantity</Text>
            <Text style={styles.detailValue}>{totalQuantity} {unit}</Text>
          </View>
          <View style={styles.detailBlock}>
            <Text style={styles.detailLabel}>Price</Text>
            <Text style={styles.detailPrice}>${amount} / g</Text>
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
        {/* <View style={styles.healthBenefitsContainer}>
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
        </View> */}

        {/* Storage Instructions Section */}
        <View style={styles.storageInstructionsContainer}>
          <Text style={styles.storageInstructionsLabel}>Health Benefits</Text>
          <Text style={styles.storageInstructionsText}>
            {healthBenefits || 'No health benefits added for this ingredient.'}
          </Text>
        </View>

        {/* Storage Instructions Section */}
        <View style={styles.storageInstructionsContainer}>
          <Text style={styles.storageInstructionsLabel}>Storage Instructions</Text>
          <Text style={styles.storageInstructionsText}>
            {storageInstructions || 'No storage instructions available for this ingredient.'}
          </Text>
        </View>
      </View>

      {/* Use the modal component */}
      <EditModal
        visible={isModalVisible}
        onClose={toggleModal}
        ingredientId={id} // Pass all items for the ingredient
        onSuccess={handleSuccess}
      />
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
  editButton: {
    position: 'absolute',
    right: 0,
    top: 60,
    padding: 10,
    backgroundColor: '#f5f5f5',
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

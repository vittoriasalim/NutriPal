import React, { useCallback, useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Dimensions, Alert } from 'react-native';
import PantryCategoryTab from '@/components/PantryCategoryTab'; 
import PantryItemCard from '@/components/PantryItemCard'; 
import AddIngredientModal from '@/components/AddIngredientModal'; 
import { Ionicons } from '@expo/vector-icons'; // Using Ionicons for the "+" icon
import { getPantryForUser } from '@/services/pantry'; // Import the pantry service
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import { DataTable } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { IngredientStackParamList } from '@/types/navigation'; // Replace with your navigation types
import { NavigationProp } from '@react-navigation/native';

const PantryScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<IngredientStackParamList>>(); // Hook to handle navigation
  const categories = ['All', 'Meat', 'Seafood', 'Vegetable'];
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [pantryData, setPantryData] = useState([]); // Store fetched pantry ingredients
  const [isModalVisible, setModalVisible] = useState(false); // For modal visibility
  const [userData, setUserData] = useState<any>(null); // To store user data from AsyncStorage
  const [loading, setLoading] = useState(true); // Loading state
  const screenHeight = Dimensions.get('window').height;

  const fakeRecipe = {
    title: "Beef and Tomato Stew with Lentils",
    longDescription: "This hearty stew is packed with protein, iron, and fibre to promote muscle growth and satiety. The combination of beef, lentils, and tomatoes provides a rich source of nutrients and a satisfying meal for weight gain.",
    calorie: 650,
    protein: 45,
    fat: 25,
    fibre: 15
  };
  

  // Fetch user data from AsyncStorage
  const getUserData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('user'); // Fetch user data
      if (jsonValue) {
        const user = JSON.parse(jsonValue); // Parse and set the user data
        setUserData(user);
        fetchPantryData(user.id); // Fetch pantry data after getting the user
      } else {
        Alert.alert('Error', 'No user data found.');
        setLoading(false);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      Alert.alert('Error', 'Failed to load user data.');
      setLoading(false);
    }
  };

  // Fetch pantry data using the userId
  const fetchPantryData = async (userId: number) => {
    try {
      const data = await getPantryForUser(userId); // Fetch pantry data from backend
      if (Object.keys(data).length === 0) {
        // If data is an empty object, show an empty state
        setPantryData([]); // Set to an empty array to show a message
      } else {
        const combinedData = combinePantryItems(data);
        setPantryData(combinedData); // Store the combined pantry data
      }
    } catch (error) {
      console.error('Error fetching pantry data:', error);
      Alert.alert('Error', 'Failed to load pantry data.');
    } finally {
      setLoading(false); // Stop loading regardless of success or failure
    }
  };

  useEffect(() => {
    getUserData(); // Load user and pantry data when component mounts
  }, []);

  // useEffect to load user data when the component mounts
  useFocusEffect(
    useCallback(() => {
      // Call getUserData every time the screen comes into focus
      getUserData();

      return () => {
        // Clean-up logic if needed
      };
    }, []) // Add dependencies like 'update' to trigger re-render when it changes
  );

  // Combine pantry items by ingredient_id, summing quantities and taking earliest expiry date
  const combinePantryItems = (data) => {
    const combinedItems = {};
    console.log(data);

    data.forEach(item => {
      const ingredientId = item.ingredient.id;

      if (!combinedItems[ingredientId]) {
        combinedItems[ingredientId] = {
          ingredient: item.ingredient,
          items: [item],
          totalQuantity: item.quantity,
          earliestExpiryDate: new Date(item.expiryDate),
        };
      } else {
        combinedItems[ingredientId].items.push(item);
        combinedItems[ingredientId].totalQuantity += item.quantity;
        combinedItems[ingredientId].earliestExpiryDate = new Date(Math.min(
          new Date(combinedItems[ingredientId].earliestExpiryDate),
          new Date(item.expiryDate)
        ));
      }
    });

    return Object.values(combinedItems);
  };

  const handleAddItem = () => {
    setModalVisible(true); // Show the modal to add an ingredient
  };

  const handleSuccess = () => {
    setModalVisible(false); // Close the modal after saving
    if (userData) {
      fetchPantryData(userData.id); // Refresh the pantry data after adding an ingredient
    }
  };

  const filteredPantryData = selectedCategory === 'All'
    ? pantryData
    : pantryData.filter(item => item.ingredient.food_type === selectedCategory);

  // Render the content based on loading or empty pantry state
  return (
    <View style={styles.container}>
      {/* Header with Pantry text and Add button */}
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Pantry</Text>
        <TouchableOpacity onPress={handleAddItem} style={styles.addButton}>
          <Ionicons name="add" size={24} color="#83C687" />
        </TouchableOpacity>
      </View>

      {/* Category Tabs */}
      <PantryCategoryTab
        categories={categories}
        selectedCategory={selectedCategory}
        onCategorySelect={setSelectedCategory}
      />

      {loading ? (
        <Text style={styles.loadingText}>Loading pantry data...</Text>
      ) : pantryData.length === 0 ? (
        <Text style={styles.emptyText}>Your pantry is empty. Add ingredients to get started!</Text>
      ) : (
        <FlatList
          data={filteredPantryData}
          numColumns={2}
          keyExtractor={(item) => item.ingredient.id.toString()} // Unique key for each pantry ingredient
          renderItem={({ item }) => (
            <PantryItemCard 
              ingredient={item.ingredient} // Pass the ingredient details
              totalQuantity={item.totalQuantity} // Pass the combined quantity
              earliestExpiryDate={item.earliestExpiryDate} // Pass the earliest expiry date
            />
          )}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.cardContainer}
          style={[styles.list, { maxHeight: screenHeight * 0.6 }]}
        />
      )}

      {/* Generate Recipes Button */}
      <TouchableOpacity 
        style={styles.generateButton} 
        onPress={() => navigation.navigate('PantryRecipeScreen', { fromPantryScreen: true })}>
        {/* onPress={() => navigation.navigate('PantryRecipeDetail', { recipe: fakeRecipe })}> */}
        <Text style={styles.generateButtonText}>Generate Recipes</Text>
      </TouchableOpacity>

      {/* Add Ingredient Modal */}
      <AddIngredientModal
        visible={isModalVisible}
        onClose={() => setModalVisible(false)}
        userId={userData ? userData.id : null} // Pass userId dynamically from user data
        onSuccess={handleSuccess} // Refresh the pantry data after adding an ingredient
      />
    </View>
  );
};

// Styles for the PantryScreen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    paddingBottom: 80,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // Centers the text initially
    marginBottom: 20,
  },
  header: {
    fontSize: 24,
    fontFamily: 'Poppins-Regular',
    marginTop: 60,
    flex: 1, // Take full space
    textAlign: 'center', // Center text within the available space
  },
  addButton: {
    position: 'absolute', // Make the button positioned absolutely
    right: 0, // Align it to the right edge
    top: 60, // Align vertically with the header
    padding: 8,
    borderRadius: 50, // Rounded button
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  cardContainer: {
    paddingBottom: 20,
  },
  list: {
    flexGrow: 0,
  },
  generateButton: {
    backgroundColor: '#83C687',
    paddingVertical: 15,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 17,
  },
  generateButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Regular',
  },
  loadingText: {
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 20,
  },
  emptyText: {
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 20,
    color: '#888',
  },
});

export default PantryScreen;

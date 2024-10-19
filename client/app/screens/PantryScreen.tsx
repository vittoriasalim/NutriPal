import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Dimensions, Alert } from 'react-native';
import PantryCategoryTab from '@/components/PantryCategoryTab'; 
import PantryItemCard from '@/components/PantryItemCard'; 
import AddIngredientModal from '@/components/AddIngredientModal'; 
import { Ionicons } from '@expo/vector-icons'; // Using Ionicons for the "+" icon
import { getPantryForUser } from '@/services/pantry'; // Import the pantry service

const PantryScreen: React.FC = () => {
  const categories = ['All', 'Meat', 'Seafood', 'Vegetable'];
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [pantryData, setPantryData] = useState([]); // Store fetched pantry ingredients
  const [isModalVisible, setModalVisible] = useState(false); // For modal visibility
  const screenHeight = Dimensions.get('window').height;

  const userId = 1; // Replace with actual userId

  // Fetch pantry data when component mounts
  const fetchPantryData = async () => {
    try {
      const data = await getPantryForUser(userId); // Fetch pantry data via the controller
      setPantryData(data); // Store the fetched data
    } catch (error) {
      console.error('Error fetching pantry data:', error);
      Alert.alert('Error', 'Failed to load pantry data.');
    }
  };

  useEffect(() => {
    fetchPantryData(); // Load pantry data on component mount
  }, []);

  const handleAddItem = () => {
    setModalVisible(true); // Show the modal to add an ingredient
  };

  const handleSuccess = () => {
    setModalVisible(false); // Close the modal after saving
    fetchPantryData(); // Refresh the pantry data after adding an ingredient
  };

  const filteredPantryData = selectedCategory === 'All'
    ? pantryData
    : pantryData.filter(item => item.ingredient.food_type === selectedCategory);

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

      {/* Pantry Items */}
      <FlatList
        data={filteredPantryData}
        numColumns={2}
        keyExtractor={(item) => item.ingredient.id.toString()} // Unique key for each pantry ingredient
        renderItem={({ item }) => (
          <PantryItemCard item={item} /> // Pass the entire item
        )}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.cardContainer}
        style={[styles.list, { maxHeight: screenHeight * 0.6 }]}
      />

      {/* Generate Recipes Button */}
      <TouchableOpacity style={styles.generateButton}>
        <Text style={styles.generateButtonText}>Generate Recipes</Text>
      </TouchableOpacity>

      {/* Add Ingredient Modal */}
      <AddIngredientModal
        visible={isModalVisible}
        onClose={() => setModalVisible(false)}
        userId={userId}
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
    backgroundColor: '#f5f5f5',
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
});

export default PantryScreen;

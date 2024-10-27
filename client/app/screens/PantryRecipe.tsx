import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Alert } from 'react-native';
import PantryCategoryTab from '@/components/PantryCategoryTab';
import RecipeItemCard from '@/components/RecipeItemCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute, useNavigation } from '@react-navigation/native';
import { generateRecipesWithPantry } from '@/services/pantry';

const PantryRecipeScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  
  const [customRecipeInput, setCustomRecipeInput] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Maintain');
  const [recipes, setRecipes] = useState({}); // Object to hold categorized recipes
  const [userId, setUserId] = useState<number | null>(null);
  const [hasFetchedRecipes, setHasFetchedRecipes] = useState(false);

  const recipeCategories = ['Weight Gain', 'Maintain', 'Weight Loss'];

  // Fetch user data and recipes from storage or backend
  const fetchRecipes = async () => {
    try {
      // Fetch user data from local storage
      const jsonValue = await AsyncStorage.getItem('user');
      if (jsonValue) {
        const user = JSON.parse(jsonValue);
        setUserId(user.id);
        await retrieveRecipes(user.id); // Retrieve recipes for the user
      } else {
        Alert.alert('Error', 'No user data found.');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      Alert.alert('Error', 'Failed to load user data.');
    }
  };

  // Retrieve recipes from the backend or local storage
  const retrieveRecipes = async (userId: number) => {
    try {
      const storedRecipes = await AsyncStorage.getItem('recipes');
      
      if (storedRecipes) {
        // Load recipes from local storage
        setRecipes(JSON.parse(storedRecipes));
      } else {
        // Fetch from backend and store in local storage
        const generatedRecipes = await generateRecipesWithPantry(userId);
        await AsyncStorage.setItem('recipes', JSON.stringify(generatedRecipes));
        setRecipes(generatedRecipes);
      }
    } catch (error) {
      console.error('Error retrieving recipes:', error);
      Alert.alert('Error', 'Failed to retrieve recipes.');
    } finally {
      setHasFetchedRecipes(true); // Mark as fetched
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Pantry Recipes</Text>
      </View>

      {/* Heading for asking specific instructions */}
      <Text style={styles.subHeading}>Ask for specific instructions here</Text>

      {/* Input Field for Customizing Recipes */}
      <TextInput
        style={styles.input}
        placeholder="Enter custom preferences for recipes..."
        placeholderTextColor="#999"
        value={customRecipeInput}
        onChangeText={setCustomRecipeInput}
      />

      {/* Recipe Categories Tab */}
      <PantryCategoryTab
        categories={recipeCategories}
        selectedCategory={selectedCategory}
        onCategorySelect={setSelectedCategory} // Pass the selected category handler
      />

      {/* Recipe List */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.recipeContainer}>
          {hasFetchedRecipes && recipes[selectedCategory] ? (
            recipes[selectedCategory].map((recipe: any, index: number) => (
              <RecipeItemCard
                key={index}
                title={recipe.title}
                description={recipe.shortDescription}
                category={selectedCategory} // Pass category to change background color
                recipe={recipe}
              />
            ))
          ) : (
            <Text style={styles.noRecipesText}>No recipes found for this category.</Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

// Updated styles
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
    justifyContent: 'center',
    marginBottom: 20,
  },
  header: {
    fontSize: 24,
    fontFamily: 'Poppins-Regular',
    marginTop: 60,
    flex: 1,
    textAlign: 'center',
  },
  subHeading: {
    fontSize: 18,
    fontFamily: 'Poppins-Regular',
    marginBottom: 15,
    color: '#333',
    marginVertical: 15,
  },
  input: {
    height: 45,
    borderColor: '#E5E5E5',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontFamily: 'Poppins-Regular',
    color: '#333',
    backgroundColor: '#F5F5F5',
  },
  scrollContainer: {
    paddingVertical: 20,
  },
  recipeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  noRecipesText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
  },
});

export default PantryRecipeScreen;

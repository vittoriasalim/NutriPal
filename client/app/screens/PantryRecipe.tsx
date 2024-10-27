import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Alert } from 'react-native';
import PantryCategoryTab from '@/components/PantryCategoryTab';
import RecipeItemCard from '@/components/RecipeItemCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute, useFocusEffect, useNavigation } from '@react-navigation/native';
import { generateRecipesWithPantry } from '@/services/pantry';

const PantryRecipeScreen: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { fromPantryScreen } = route.params || {}; // Check if navigation came from PantryScreen

  const [customRecipeInput, setCustomRecipeInput] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Maintain');
  const [recipes, setRecipes] = useState(null);
  const [userId, setUserId] = useState<number | null>(null);
  const [hasFetchedRecipes, setHasFetchedRecipes] = useState(false);

  const recipeCategories = ['Weight Gain', 'Maintain', 'Weight Loss'];

  // Function to clear previous recipes from AsyncStorage
  const clearStoredRecipes = async () => {
    try {
      await AsyncStorage.removeItem('recipes');
      console.log('Previous recipes cleared from storage.');
    } catch (error) {
      console.log('Error clearing stored recipes:', error);
    }
  };

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
      console.log('Error fetching data:', error);
      Alert.alert('Error', 'Failed to load user data.');
    }
  };

  // Retrieve recipes from the backend or local storage
  const retrieveRecipes = async (userId: number) => {
    try {
      if (fromPantryScreen) {
        // Clear stored recipes and regenerate if coming from PantryScreen
        await clearStoredRecipes();
      }

      // Fetch from backend and store in local storage
      const generatedRecipes = await generateRecipesWithPantry(userId);
      await AsyncStorage.setItem('recipes', JSON.stringify(generatedRecipes));
      setRecipes(generatedRecipes);

      // Reset fromPantryScreen to false
      navigation.setParams({ fromPantryScreen: false });

    } catch (error) {
      console.log('Error retrieving recipes:', error);
      Alert.alert('Error', 'Failed to retrieve recipes.');
    } finally {
      setHasFetchedRecipes(true); // Mark as fetched
    }
  };

  useFocusEffect(
    useCallback(() => {
      // Fetch user data and regenerate recipes if coming from PantryScreen
      fetchRecipes();
      console.log("Fetching new recipes...");
      return () => {
        // Clean-up logic if needed
      };
    }, [fromPantryScreen]) // Only regenerate if coming from PantryScreen
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Pantry Recipes</Text>
      </View>


      {/* Recipe Categories Tab */}
      <PantryCategoryTab
        categories={recipeCategories}
        selectedCategory={selectedCategory}
        onCategorySelect={setSelectedCategory}
      />

      {/* Recipe List */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.recipeContainer}>
          {hasFetchedRecipes && recipes && recipes[selectedCategory] ? (
            recipes[selectedCategory].map((recipe: any, index: number) => (
              <RecipeItemCard
                key={index}
                title={recipe.title}
                description={recipe.shortDescription}
                category={selectedCategory}
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

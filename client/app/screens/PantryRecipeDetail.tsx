import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import PantryCategoryTab from '@/components/PantryCategoryTab';  // Import the shared tab component
import { useRoute } from '@react-navigation/native';

const PantryRecipeDetail: React.FC = () => {
  // Example data for the recipe, including steps
  const route = useRoute();
  const { recipe } = route.params; // Destructure recipe from route.params
  console.log(recipe);
  const image = "data:image/jpeg;base64,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";

  // State to manage active tab (either 'Ingredients' or 'Procedure')
  const [selectedTab, setSelectedTab] = useState<'Ingredient' | 'Procedure'>('Ingredient');

  // Tab labels for PantryCategoryTab
  const tabCategories = ['Ingredient', 'Procedure'];

  return (
    <View style={styles.container}>
      {/* Fixed Header Section */}
      <View style={styles.fixedHeader}>
        <Text style={styles.header}>{recipe.title}</Text>
      </View>

      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Recipe Image */}
        <View style={styles.recipeImageContainer}>
          <Image
            source={{
              uri:image,}}
            style={styles.recipeImage}
          />
        </View>

        {/* Nutritional Info */}
        <View style={styles.nutritionInfoContainer}>
          <View style={styles.nutritionInfo}>
            <Ionicons name="flame-outline" size={24} color="red" />
            <Text style={styles.nutritionText}>Calorie{"\n"}{recipe.calorie} Kcal</Text>
          </View>
          <View style={styles.nutritionInfo}>
            <Ionicons name="barbell-outline" size={24} color="gray" />
            <Text style={styles.nutritionText}>Protein{"\n"}{recipe.protein}g</Text>
          </View>
          <View style={styles.nutritionInfo}>
            <Ionicons name="fast-food-outline" size={24} color="green" />
            <Text style={styles.nutritionText}>Fat{"\n"}{recipe.fat}g</Text>
          </View>
          <View style={styles.nutritionInfo}>
            <Ionicons name="leaf-outline" size={24} color="cyan" />
            <Text style={styles.nutritionText}>Fibre{"\n"}{recipe.fibre}g</Text>
          </View>
        </View>

        {/* Use PantryCategoryTab for switching between 'Ingredient' and 'Procedure' */}
        <PantryCategoryTab
          categories={tabCategories}
          selectedCategory={selectedTab}
          onCategorySelect={(category) => setSelectedTab(category as 'Ingredient' | 'Procedure')}
        />

        {/* Conditional Rendering for Ingredients or Procedure */}
        {selectedTab === 'Ingredient' ? (
          <View style={styles.ingredientContainer}>
            <View style={styles.ingredientHeader}>
              <Text style={styles.ingredientServings}>1 serve</Text>
              <Text style={styles.ingredientItems}>{recipe.ingredients.length} items</Text>
            </View>

            {recipe.ingredients.map((ingredient, index) => (
              <View key={index} style={styles.ingredientItem}>
                <Text style={styles.ingredientIcon}>{ingredient.icon}</Text>
                <Text style={styles.ingredientName}>{ingredient.name}</Text>
                <Text style={styles.ingredientQuantity}>{ingredient.quantity}</Text>
              </View>
            ))}
          </View>
        ) : (
          <View style={styles.procedureContainer}>
            {recipe.steps.map((step, index) => (
              <View key={index} style={styles.stepItem}>
                <Text style={styles.stepHeader}>Step {index + 1}</Text>
                <Text style={styles.stepText}>{step}</Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    paddingBottom: 50,
  },
  fixedHeader: {
    backgroundColor: '#fff',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    zIndex: 1,
    flexDirection: 'row',
  },
  header: {
    fontSize: 24,
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
    marginTop: 60,
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 80,
  },
  recipeImageContainer: {
    width: '100%',
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  recipeImage: {
    width: '60%',
    height: '100%',
    borderRadius: 10,
  },
  nutritionInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  nutritionInfo: {
    alignItems: 'center',
  },
  nutritionText: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 5,
  },
  ingredientContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  ingredientHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  ingredientServings: {
    fontSize: 16,
    color: '#333',
  },
  ingredientItems: {
    fontSize: 16,
    color: '#aaa',
  },
  ingredientItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  ingredientIcon: {
    fontSize: 24,
  },
  ingredientName: {
    fontSize: 16,
    color: '#333',
  },
  ingredientQuantity: {
    fontSize: 16,
    color: '#666',
  },
  procedureContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  stepItem: {
    marginBottom: 10,
    padding: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
  },
  stepHeader: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  stepText: {
    color: '#555',
  },
});

export default PantryRecipeDetail;

import { apiService } from './api'; // Adjust the import path if needed

// Add an ingredient to the pantry
export const addIngredientToPantry = async (userId: number, ingredientData: { ingredientName: string; expiryDate: Date; quantity: string }) => {
  try {
    const response = await apiService.postData(`/pantry/${userId}/ingredient`, ingredientData);
    return response;
  } catch (error) {
    console.error("Error adding ingredient to pantry:", error);
    throw error;
  }
};

// Get all ingredients from the user's pantry
export const getPantryForUser = async (userId: number) => {
  try {
    const response = await apiService.fetchData(`/pantry/${userId}`);
    return response;
  } catch (error) {
    console.error("Error fetching pantry for user:", error);
    throw error;
  }
};

// Get a specific ingredient from the user's pantry
export const getPantryIngredient = async (userId: number, ingredientId: number) => {
  try {
    const response = await apiService.fetchData(`/pantry/${userId}/ingredient/${ingredientId}`);
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error fetching specific pantry ingredient:", error);
    throw error;
  }
};

export const updatePantryIngredient = async (userId, ingredientId, updateData) => {
  try {
    const response = await apiService.putData(`/pantry/${userId}/pantryingredient/${ingredientId}`, updateData);
    return response;
  } catch (error) {
    console.error("Error updating pantry ingredient:", error);
    throw error;
  }
};


export const removePantryIngredient = async (userId, ingredientId) => {
  try {
    const response = await apiService.deleteData(`/pantry/${userId}/pantryIngredient/${ingredientId}`);
    return response;
  } catch (error) {
    console.error("Error removing ingredient from pantry:", error);
    throw error;
  }
};

export const deleteAllIngredients = async (userId, ingredientId) => {
  try {
    const response = await apiService.deleteData(`/pantry/${userId}/ingredient/${ingredientId}/all`);
    return response;
  } catch (error) {
    console.error("Error deleting all ingredients:", error);
    throw error;
  }
};

// Generate recipes based on the user's pantry ingredients
export const generateRecipesWithPantry = async (userId: number) => {
  try {
    const response = await apiService.postData(`/pantry/${userId}/generateRecipes`, {});
    console.log(JSON.parse(response));
    return JSON.parse(response);  // Return the generated recipes from the backend
  } catch (error) {
    console.error("Error generating recipes:", error);
    throw error;
  }
};
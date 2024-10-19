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

// Update a specific ingredient in the pantry
export const updatePantryIngredient = async (userId: number, ingredientId: number, updateData: { expiryDate?: Date; quantity?: string }) => {
  try {
    const response = await apiService.putData(`/pantry/${userId}/ingredient/${ingredientId}`, updateData);
    return response;
  } catch (error) {
    console.error("Error updating pantry ingredient:", error);
    throw error;
  }
};

// Remove an ingredient from the pantry
export const removePantryIngredient = async (userId: number, ingredientId: number) => {
  try {
    const response = await apiService.deleteData(`/pantry/${userId}/ingredient/${ingredientId}`);
    return response;
  } catch (error) {
    console.error("Error removing ingredient from pantry:", error);
    throw error;
  }
};

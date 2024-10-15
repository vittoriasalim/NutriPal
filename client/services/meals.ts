import { apiService } from './api';

interface Meal {
  id: number;
  mealName: string;
  description?: string;
  calorie?: number;
  protein?: number;
  fats?: number;
  carbohydrate?: number;
  createdAt: string; // ISO format timestamp
  updatedAt: string; // ISO format timestamp
}

// Fetch all meals
export const getAllMeals = async (): Promise<Meal[]> => {
  try {
    const response = await apiService.fetchData<Meal[]>('/meals');
    return response;
  } catch (error) {
    throw error;
  }
};

// Fetch a meal by ID
export const getMealById = async (mealId: number): Promise<Meal> => {
  try {
    const response = await apiService.fetchData<Meal>(`/meals/${mealId}`);
    return response;
  } catch (error) {
    throw error;
  }
};

// Create a new meal record
export const createMeal = async (mealData: Omit<Meal, 'id' | 'createdAt' | 'updatedAt'>): Promise<Meal> => {
  try {
    const response = await apiService.postData<Meal>('/meals', mealData);
    return response;
  } catch (error) {
    throw error;
  }
};

// Update a meal by ID
export const updateMeal = async (mealId: number, mealData: Omit<Meal, 'id' | 'createdAt' | 'updatedAt'>): Promise<Meal> => {
  try {
    const response = await apiService.putData<Meal>(`/meals/${mealId}`, mealData);
    return response;
  } catch (error) {
    throw error;
  }
};

// Delete a meal by ID
export const deleteMeal = async (mealId: number): Promise<void> => {
  try {
    await apiService.deleteData(`/meals/${mealId}`);
  } catch (error) {
    throw error;
  }
};
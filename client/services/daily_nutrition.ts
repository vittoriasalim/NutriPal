// app/services/dailyNutrition.ts
import { apiService } from './api';

interface DailyNutrition {
  id: number;
  date: string; // ISO format timestamp
  totalCalorie: number;
  totalProtein: number;
  totalFats: number;
  totalCarbohydrate: number;
  createdAt: string; // ISO format timestamp
  updatedAt: string; // ISO format timestamp
  clientId: number;
}

// Fetch daily nutrition for a specific client
export const getDailyNutritionByID = async (id: number): Promise<DailyNutrition> => {
    try {
        const response = await apiService.fetchData<DailyNutrition>(`/daily_nutrition/${id}`);
        
        return response;
    } catch (error) {
        throw error;
    }
};
  

// Fetch daily nutrition for a specific client
export const getDailyNutritionFortnightly = async (clientId: number): Promise<DailyNutrition[]> => {
  try {
    const response = await apiService.fetchData<DailyNutrition[]>(`/daily_nutrition/fortnightly/${clientId}`);

    console.log(response);
    return response;
  } catch (error) {
    throw error;
  }
};

// Create new daily nutrition record
export const createDailyNutrition = async (nutritionData: Omit<DailyNutrition, 'id' | 'createdAt' | 'updatedAt'>): Promise<DailyNutrition> => {
  try {
    const response = await apiService.postData<DailyNutrition>('/daily_nutrition', nutritionData);
    return response;
  } catch (error) {
    throw error;
  }
};

// Update existing daily nutrition record
export const updateDailyNutrition = async (id: number, nutritionData: Partial<Omit<DailyNutrition, 'id' | 'clientId' | 'createdAt' | 'updatedAt'>>): Promise<DailyNutrition> => {
  try {
    const response = await apiService.putData<DailyNutrition>(`/daily_nutrition/${id}`, nutritionData);
    console.log("successfully store");
    return response;
  } catch (error) {
    throw error;
  }
};

// Delete a daily nutrition record
export const deleteDailyNutrition = async (id: number): Promise<void> => {
  try {
    await apiService.deleteData(`/daily_nutrition/${id}`);
  } catch (error) {
    throw error;
  }
};
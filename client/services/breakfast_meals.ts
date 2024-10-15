import { apiService } from './api';

// Define the expected response structure from the API
interface Meal {
  mealName: string;
  description: string;
  calorie: number;
  protein: number;
  fats: number;
  carbohydrate: number;
}

interface BreakfastMealResponse {
  dailyNutritionId: number;
  mealId: number;
  id: number;
  createdAt: string;
  updatedAt: string;
  meal: Meal;
}

interface BreakfastMeal {
    mealId: number;
    dailyNutritionId: number;

  }



// Create a new meal record
export const createBreakfastMeal = async (mealData:BreakfastMeal): Promise<BreakfastMeal> => {
    try {
      const response = await apiService.postData<BreakfastMeal>('/breakfast_meals', mealData);
      return response;
    } catch (error) {
      throw error;
    }
  };

// Fetch breakfast by dailyNutritionId
export const getBreakfastById = async (dailyNutritionId: number): Promise<BreakfastMealResponse[]> => {
  try {


    
    const response = await apiService.fetchData<BreakfastMealResponse[]>(`/breakfast_meals/${dailyNutritionId}`);
 
    return response;
  } catch (error) {
    throw error;
  }
};


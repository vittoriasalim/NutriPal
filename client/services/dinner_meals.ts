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

interface dinnerMealResponse {
  dailyNutritionId: number;
  mealId: number;
  id: number;
  createdAt: string;
  updatedAt: string;
  meal: Meal;
}
interface DinnerMeal {
    mealId: number;
    dailyNutritionId: number;

  }



// Create a new meal record
export const createDinnerMeal = async (mealData:DinnerMeal): Promise<DinnerMeal> => {
    try {
      const response = await apiService.postData<DinnerMeal>('/dinner_meals', mealData);
      return response;
    } catch (error) {
      throw error;
    }
  };


// Fetch dinner by dailyNutritionId
export const getDinnerById = async (dailyNutritionId: number): Promise<dinnerMealResponse[]> => {
  try {

    const response = await apiService.fetchData<dinnerMealResponse[]>(`/dinner_meals/${dailyNutritionId}`);

    return response;
  } catch (error) {
    throw error;
  }
};
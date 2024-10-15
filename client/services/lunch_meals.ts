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

interface lunchMealResponse {
  dailyNutritionId: number;
  mealId: number;
  id: number;
  createdAt: string;
  updatedAt: string;
  meal: Meal;
}
interface LunchMeal {
    mealId: number;
    dailyNutritionId: number;

  }



// Create a new meal record
export const createLunchMeal = async (mealData:LunchMeal): Promise<LunchMeal> => {
    try {
      const response = await apiService.postData<LunchMeal>('/lunch_meals', mealData);
      return response;
    } catch (error) {
      throw error;
    }
  };

// Fetch lunch by dailyNutritionId
export const getLunchById = async (dailyNutritionId: number): Promise<lunchMealResponse[]> => {
  try {


    
    const response = await apiService.fetchData<lunchMealResponse[]>(`/lunch_meals/${dailyNutritionId}`);


    return response;
  } catch (error) {
    throw error;
  }
};
// frontend/services/meal_plans.js
import { apiService } from './api'; // Import your API service

export const getMealPlan = async (id) => {
    console.log("frontend/services/mealPlanService.js");
    try {
        const response = await apiService.postData(`/meal_plans/${id}`, {});
        console.log(response);
        return response.result; // Assuming the response structure has a result field
    } catch (error) {
        console.error('Error fetching meal plan:', error);
        throw error; // Handle the error appropriately in your app
    }
};

export const getLatestWeeklyMealPlan = async (userId) => {
    console.log("frontend/services/mealPlanService.js - Fetching latest weekly meal plan");

    try {
        const response = await apiService.fetchData(`/meal_plans/latest/${userId}`); // Adjust the endpoint as needed
        console.log('Fetched latest weekly meal plan:', response);
        return response; // Assuming the response structure has a result field
    } catch (error) {
        console.error('Error fetching latest weekly meal plan:', error);
        throw error; // Handle the error appropriately in your app
    }
};
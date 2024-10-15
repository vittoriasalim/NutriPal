import { apiService } from './api';

interface Nutritionist {
    id: number,
    userId: number,
    specialisation: string[],
    qualifications: string[],
    availability: number
}

export const getAllNutritionists = async (): Promise<Nutritionist[]> => {
    console.log("_________________________")
    console.log("GETTING NUTRITIONISTS");
    try {
        const response = await apiService.fetchData<Nutritionist[]>('/nutritionists');
        console.log('Fetched all nutritionists:', response);
        return response;
    } catch (error) {
        console.error('Error fetching all nutritionists:', error);
        throw error; // Propagate the error for further handling
    }
};
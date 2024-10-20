import { apiService } from './api';

interface NutritionistClients {
    nutritionistId: number,
    clientId: number,
}

export const createNewPair = async (pairData: NutritionistClients): Promise<NutritionistClients> => {
try {
    console.log("Creating new pair", pairData)
    // POST request to your API's registration endpoint
    const response = await apiService.postData<NutritionistClients>('/nutritionist_clients', pairData);
    
    // Return the newly created user object
    return response;
} catch (error) {

    throw error
}
};


export const getClientsByNutritionistId = async (nutritionistId:number) => {
    try {
  
        // POST request to your API's registration endpoint
        const response = await apiService.fetchData<NutritionistClients>(`/nutritionist_clients/clients/${nutritionistId}`);
        console.log(response);
        
        // Return the newly created user object
        return response;
    } catch (error) {
    
        throw error
    }
};

export const getNutritionistByClientId = async (clientId:number) => {
    try {
  
        // POST request to your API's registration endpoint
        const response = await apiService.fetchData<NutritionistClients>(`/nutritionist_clients/nutri/${clientId}`);
        console.log(response);
        
        // Return the newly created user object
        return response;
    } catch (error) {
    
        throw error
    }
};
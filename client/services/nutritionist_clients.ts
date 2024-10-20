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

export const getPairingByClientId = async (clientId: number): Promise<NutritionistClients> => {
    try {
        const response = await apiService.fetchData<NutritionistClients>(`/nutritionist_clients/clientId/${clientId}`);
        console.log("GET PARIING BY CLIENT ID", response);
        return response;
    } catch (error) {
        throw error;
    }
};

export const deletePairingByClientId = async (clientId: number): Promise<number> => {
    try {
        // First, fetch the pairing to get the nutritionistId
        const pairing = await getPairingByClientId(clientId);
        
        if (!pairing) {
            throw new Error("No pairing found for the given client ID.");
        }

        console.log("Deleting pairing for client ID", clientId);
        
        // Now delete the pairing
        await apiService.deleteData(`/nutritionist_clients/delete/${clientId}`);
        
        // Return the nutritionistId of the deleted pair
        return pairing.nutritionistId;
    } catch (error) {
        throw error;
    }
};
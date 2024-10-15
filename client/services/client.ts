import { Double, Float } from 'react-native/Libraries/Types/CodegenTypes';
import { apiService } from './api';

interface Client {
    id: number,
    userId: number,
    reportId: number,
    dailyNutritionId: number,
    weight: Double,
    height: Double,
    healthGoals: string[],
    dietaryPreferences: string[],
    nutritionalNeeds: string[],
    pantryId: number
}

export const getClientProfile = async (userId: number): Promise<Client> => {
    try {
      console.log("GET CLIENT PROFILE")
      console.log("Fetching from API:", `/clients/user?userId=${userId}`);
      const response = await apiService.fetchData<Client>(`/clients/user?userId=${userId}`);

      console.log('Response received:', response);
      return response;
    } catch (error) {
        console.error('Error fetching client profile:', error); // Log the error
        throw error;
    }
};

export const getAllClients = async (): Promise<Client[]> => {
    try {
        const response = await apiService.fetchData<Client[]>('/clients');
        console.log('Fetched all clients:', response);
        return response;
    } catch (error) {
        console.error('Error fetching all clients:', error);
        throw error; // Propagate the error for further handling
    }
};

export const updateClientById = async (id: number, clientData: Partial<Client>): Promise<Client> => {
    try {
        const response = await apiService.fetchData<Client>(`/clients/${id}`, {
            method: 'PUT', // Specify the HTTP method
            body: JSON.stringify(clientData), // Convert client data to JSON
            headers: {
                'Content-Type': 'application/json', // Set content type to JSON
            },
        });

        console.log('Client updated successfully:', response);
        return response; // Return the updated client data
    } catch (error) {
        console.error('Error updating client profile:', error);
        throw error; // Propagate the error for further handling
    }
};
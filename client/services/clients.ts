import { apiService } from './api';

interface Client {
  id: number;
  userId: number;
  weight: number;
  height: number;
  healthGoals?: string[]; // Optional field
  dietaryPreferences?: string[]; // Optional field
  nutritionalNeeds?: string[]; // Optional field
  pantryId?: number; // Optional field
  recommendationCal: number;
  createdAt: string; // ISO format timestamp
  updatedAt: string; // ISO format timestamp
}

// Fetch client by userId
export const getClientByUserId = async (userId: number): Promise<Client> => {
  try {
    const response = await apiService.fetchData<Client>(`/clients/user/${userId}`);
  
    return response;
  } catch (error) {
    throw error;
  }
};

// Create new client record
export const createClient = async (clientData: Omit<Client, 'id' | 'createdAt' | 'updatedAt'>): Promise<Client> => {
  try {
    const response = await apiService.postData<Client>('/clients', clientData);
    return response;
  } catch (error) {
    throw error;
  }
};

// Update existing client record
export const updateClient = async (id: number, clientData: Partial<Omit<Client, 'id' | 'userId' | 'createdAt' | 'updatedAt'>>): Promise<Client> => {
  try {
    const response = await apiService.putData<Client>(`/clients/${id}`, clientData);
    return response;
  } catch (error) {
    throw error;
  }
};

// Delete a client record
export const deleteClient = async (id: number): Promise<void> => {
  try {
    await apiService.deleteData(`/clients/${id}`);
  } catch (error) {
    throw error;
  }
};
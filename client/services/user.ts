// app/services/user.ts
import { apiService } from './api';

interface User {
  firstName: string; // Updated to camelCase to match input
  lastName: string;  // Updated to camelCase to match input
  email: string;
  password:string
  sex: string; // Added to support sex field
  userType: string; // Added 'ADMIN' for user
}



export const getUserProfile = async (userId: number): Promise<User> => {
  try {
    const response = await apiService.fetchData<User>(`/users/${userId}`);
    return response;
  } catch (error) {
    
    throw error;
  }
};

export const updateUserProfile = async (userId: number, userData: Partial<User>): Promise<User> => {
  try {
    const response = await apiService.putData<User>(`/users/${userId}`, userData);
    return response;
  } catch (error) {
   
    throw error;
  }
};
export const registerUser = async (
  userData: User
): Promise<User> => {
  try {
    // POST request to your API's registration endpoint
    const response = await apiService.postData<User>('/users', userData);
    
    // Return the newly created user object
    return response;
  } catch (error) {
  
    throw error
  }
};


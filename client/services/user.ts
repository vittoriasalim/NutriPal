// app/services/user.ts
import { apiService } from './api';

interface User {
  id: number;
  email: string;
  mobile: string;
  password:string;
}

export interface RegisterUserData {
  email: string;
  mobile: string;
  password: string;
}


export const getUserProfile = async (userId: number): Promise<User> => {
  try {
    const response = await apiService.fetchData<User>(`/users/${userId}`);
    return response;
  } catch (error) {
    console.error('Error fetching user profile', error);
    throw error;
  }
};

export const updateUserProfile = async (userId: number, userData: Partial<User>): Promise<User> => {
  try {
    const response = await apiService.putData<User>(`/users/${userId}`, userData);
    return response;
  } catch (error) {
    console.error('Error updating user profile', error);
    throw error;
  }
};
export const registerUser = async (
  userData: RegisterUserData
): Promise<RegisterUserData> => {
  try {
    // POST request to your API's registration endpoint
    const response = await apiService.postData<RegisterUserData>('/users', userData);
    
    // Return the newly created user object
    return response;
  } catch (error) {
    console.error('Error registering new user', error);
    throw error; // Re-throw to be handled by calling code
  }
};


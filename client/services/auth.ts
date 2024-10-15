// app/services/auth.ts
import { apiService } from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface LoginResponse {
  token: string;
  user: {
    id: number;
    mobile: string;
    password: string;
  };
}

interface User {
  id:string;
  firstName: string; // Updated to camelCase to match input
  lastName: string;  // Updated to camelCase to match input
  email: string;
  password:string
  sex: string; // Added to support sex field
  userType: string; // Added 'ADMIN' for user
}



export const login = async (email: string, password: string): Promise<{ token: string } | void> => {
  try {
    console.log('Sending request to:', email, password);
    const response = await apiService.postData<{ token: string , user:User}>('/users/auth/login', { email, password });
   

    const jsonValue = JSON.stringify(response.user);
    await AsyncStorage.setItem( "token",response.token);
    await AsyncStorage.setItem( "user",jsonValue);

    return response;  // Adjust based on whether you need this or not
  } catch (error) {

    throw error
   
    
  }
};


export const logout = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem('token');
  } catch (error) {
   
    throw error;
  }
};
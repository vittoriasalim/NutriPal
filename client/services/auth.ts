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


export const login = async (email: string, password: string): Promise<void> => {
  try {
    console.log('Sending request to:', email, password);
    const response = await apiService.postData<{ token: string }>('/users/auth/login', { email, password });
    console.log('Response received:', response);
    await AsyncStorage.setItem('token', response.token);
    console.log('Token stored successfully');
  } catch (error) {
    console.error('Error logging in', error);

  }
};


export const logout = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem('token');
  } catch (error) {
    console.error('Error logging out', error);
    throw error;
  }
};
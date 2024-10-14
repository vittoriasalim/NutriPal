// app/services/api.ts
import axios, { AxiosInstance,AxiosError, AxiosResponse, AxiosRequestConfig } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';  // Ensure you import AsyncStorage if it's not imported

const BASE_API_URL = 'http://localhost:3000';

// Define a generic type for API responses
type ApiResponse<T> = AxiosResponse<T>;

class ApiService {
  private api: AxiosInstance;


  constructor() {
    this.api = axios.create({
      baseURL: BASE_API_URL,
      timeout: 10000, // timeout in milliseconds
    });
    // // Add a request interceptor
    // this.api.interceptors.request.use(
    //   async (config: AxiosRequestConfig) => {  // Type the `config` parameter
    //     const token = await AsyncStorage.getItem('token');
    //     if (token && config.headers) {  // Ensure headers exist before modifying them
    //       config.headers['Authorization'] = `Bearer ${token}`;
    //     }
    //     return config;
    //   },
    //   (error: AxiosError) => {
    //     return Promise.reject(error);
    //   }
    // );
  }
  

  // Example: Fetch data from an endpoint
  async fetchData<T>(endpoint: string, params: Record<string, any> = {}): Promise<T> {
    try {
      const response: ApiResponse<T> = await this.api.get(endpoint, { params });
      return response.data;
    } catch (error) {
      
      throw error;
    }
  }

  // Example: Post data to an endpoint
  async postData<T>(endpoint: string, data: any): Promise<T> {
    try {
      const response: ApiResponse<T> = await this.api.post(endpoint, data);
      return response.data;
    } catch (error) {
      
      throw error;
    }
  }
  // Example: Update data at an endpoint (PUT)
  async putData<T>(endpoint: string, data: any): Promise<T> {
    try {
      const response: ApiResponse<T> = await this.api.put(endpoint, data);
      return response.data;
    } catch (error) {
      
      throw error;
    }
  }

  // Example: Delete data at an endpoint (DELETE)
  async deleteData<T>(endpoint: string): Promise<T> {
    try {
      const response: ApiResponse<T> = await this.api.delete(endpoint);
      return response.data;
    } catch (error) {
      
      throw error;
    }
  }
}

export const apiService = new ApiService();
export default apiService;

// app/services/api.ts
import axios, { AxiosInstance, AxiosError, AxiosResponse, AxiosRequestConfig } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';  // Ensure you import AsyncStorage if it's not imported

const BASE_API_URL = 'http://localhost:3000';

// Define a generic type for API responses
type ApiResponse<T> = AxiosResponse<T>;

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: BASE_API_URL,
      timeout: 20000, // timeout in milliseconds
    });
  }

  // Helper function to handle Axios errors
  private handleError(error: unknown) {
    if (axios.isAxiosError(error)) {
      // Check if the error is an AxiosError and handle it accordingly
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        // Server responded with a status code outside 2xx
        // console.log(`Error: ${axiosError.response.status} - ${axiosError.response.data}`);
        console.log("error")
      } else if (axiosError.request) {
        // No response was received after the request was made
        // console.log('No response received from server:', axiosError.request);
        console.log("error")
      } else {
        // Something happened while setting up the request
        // console.log('Error setting up request:', axiosError.message);
        console.log("error")
      }
    } else {
      // Non-Axios error (programming error, etc.)
      console.log("error")
    }
  }

  // Example: Fetch data from an endpoint
  async fetchData<T>(endpoint: string, params: Record<string, any> = {}): Promise<T> {
    try {
      const response: ApiResponse<T> = await this.api.get(endpoint, { params });
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  // Example: Post data to an endpoint
  // Example: Post data to an endpoint
  async postData<T>(endpoint: string, data: any): Promise<T> {
    try {
      console.log(`Sending request to ${endpoint} with data:`, JSON.stringify(data, null, 2));

      const response: ApiResponse<T> = await this.api.post(endpoint, data, {
        headers: {
          'Content-Type': 'application/json', // Ensure the server interprets the data as JSON
        },
      });

      console.log(`Response from ${endpoint}:`, JSON.stringify(response.data, null, 2));
      return response.data;
    } catch (error: any) {
      console.log('Error in postData:', error.message || error); // Log the error details
      return this.handleError(error);
    }
  }
  

  // Example: Update data at an endpoint (PUT)
  async putData<T>(endpoint: string, data: any): Promise<T> {
    try {
      const response: ApiResponse<T> = await this.api.put(endpoint, data);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  // Example: Delete data at an endpoint (DELETE)
  async deleteData<T>(endpoint: string): Promise<T> {
    try {
      const response: ApiResponse<T> = await this.api.delete(endpoint);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async patchData<T>(endpoint: string, data: any): Promise<T> {
    try {
      const response: ApiResponse<T> = await this.api.patch(endpoint, data);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }
}

export const apiService = new ApiService();
export default apiService;
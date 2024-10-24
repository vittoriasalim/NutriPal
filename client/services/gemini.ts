// The structure of the queryData you send to Gemini API
import { apiService } from './api';
export interface QueryData {
    query: string;  // The query you are sending
   
  }
  
  // The expected response structure from the Gemini API
  export interface GeminiResponse {
    result: string;  // The generated response from the Gemini API
    modelVersion: string;  // Information about the model version used
  }

export const postToGeminiApi = async (queryData: QueryData): Promise<GeminiResponse> => {
    try {
      // Make a POST request via apiService
      const response = await apiService.postData<GeminiResponse>('/gemini/query', queryData);
      return response;
    } catch (error) {
      // Handle error, for example logging
      console.error('Error posting data to Gemini API:', error);
      throw error;
    }
  };
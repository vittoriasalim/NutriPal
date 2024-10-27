// The structure of the queryData you send to Gemini API
import { apiService } from './api';
export interface QueryData {
    query: string;  // The query you are sending
   
  }
  
  // The expected response structure from the Gemini API
  export interface GeminiResponse {
    result: string;  // The generated response from the Gemini API
  
  }

export const postToGeminiApi = async (queryData: string): Promise<GeminiResponse> => {
    try {
      // Make a POST request via apiService
      const response = await apiService.postData<GeminiResponse>('/gemini/query', queryData);
      return response;
    } catch (error) {
      // Handle error, for example logging
      console.log('Error posting data to Gemini API:', error);
      throw error;
    }
  };


  export const postToGeminiApiRAG = async ( queryData: string , userId: number): Promise<GeminiResponse> => {
    try {
      // Ensure queryData is valid JSON
      const formattedData = { query: queryData};
      console.log("Sending formatted queryData:", formattedData);
  
      const response = await apiService.postData<GeminiResponse>(`/gemini/query/${userId}`, formattedData);
      console.log("Response from Gemini API:", response);
      return response;
    } catch (error) {
      console.log("Error in postToGeminiApiRAG:", error.message || error);
      throw error;
    }
  };
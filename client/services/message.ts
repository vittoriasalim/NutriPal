import { apiService } from './api';

// Define the Message interface
interface Message {
  id: number;
  nutritionistId: number;
  clientId: number;
  message: string;
  isNutriSender: boolean;
  createdAt: string; // ISO format timestamp
  updatedAt: string; // ISO format timestamp
}

// Define a conversation type (array of messages)
type Conversation = Message[];

// Send a new message
export const sendMessage = async (messageData: Omit<Message, 'id' | 'createdAt' | 'updatedAt'>): Promise<Message> => {
  try {
    const response = await apiService.postData<Message>('/message', messageData);
    return response;
  } catch (error) {
    throw error;
  }
};

// Get all messages between a nutritionist and a client (conversation)
export const getConversation = async (nutritionistId: number, clientId: number): Promise<Conversation> => {
  try {
    const response = await apiService.fetchData<Conversation>(`/message/conversation/${nutritionistId}/${clientId}`);
    return response;
  } catch (error) {
    throw error;
  }
};

// Get all messages for a specific client
export const getClientMessages = async (clientId: number): Promise<Conversation> => {
  try {
    const response = await apiService.fetchData<Conversation>(`/message/client/${clientId}`);
    return response;
  } catch (error) {
    throw error;
  }
};

// Get all messages for a specific nutritionist
export const getNutritionistMessages = async (nutritionistId: number): Promise<Conversation> => {
  try {
    const response = await apiService.fetchData<Conversation>(`/message/nutritionist/${nutritionistId}`);
    return response;
  } catch (error) {
    throw error;
  }
};

// Delete a specific message by ID
export const deleteMessage = async (messageId: number): Promise<void> => {
  try {
    await apiService.deleteData(`/message/${messageId}`);
  } catch (error) {
    throw error;
  }
};
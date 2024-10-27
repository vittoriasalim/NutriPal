import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {login, logout} from '../services/auth';


interface AuthContextType {
    isAuthenticated: boolean;
    login: () => void;
    logout: () => void;
    loading: boolean;
}

const defaultAuthContext: AuthContextType = {
    isAuthenticated: false,
    login: () => {},
    logout: () => {},
    loading: true,
};

const AuthContext = createContext<AuthContextType>(defaultAuthContext);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // To handle loading state

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        // Retrieve the token from AsyncStorage
        const token = await AsyncStorage.getItem('token');
        
        // Check if the token exists
        if (token) {
          // Optionally, you can verify the token by sending it to your backend here
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.log('Error checking login status:', error);
      } finally {
        setLoading(false); // Finished checking, so loading is complete
      }
    };

    checkLoginStatus();
  }, []);


  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
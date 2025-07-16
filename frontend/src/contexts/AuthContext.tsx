import React, { createContext, useContext, useEffect, useState } from 'react';
import { authAPI, getAuthToken } from '../lib/api';

interface User {
  id: string;
  fullName: string;
  email: string;
  avatar?: string;
  bio?: string;
  phone?: string;
  location?: string;
  website?: string;
  subscription: 'free' | 'pro' | 'enterprise';
  isEmailVerified?: boolean;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signUp: (fullName: string, email: string, password: string) => Promise<any>;
  signIn: (email: string, password: string) => Promise<any>;
  signOut: () => void;
  updateProfile: (profileData: any) => Promise<any>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<any>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      const token = getAuthToken();
      
      if (token) {
        try {
          const response = await authAPI.getCurrentUser();
          setUser(response.user);
        } catch (error) {
          console.error('Failed to get current user:', error);
          authAPI.logout();
        }
      }
      
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const signUp = async (fullName: string, email: string, password: string) => {
    try {
      const response = await authAPI.register({ fullName, email, password });
      setUser(response.user);
      return { data: response, error: null };
    } catch (error: any) {
      return { data: null, error: { message: error.message } };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const response = await authAPI.login({ email, password });
      setUser(response.user);
      return { data: response, error: null };
    } catch (error: any) {
      return { data: null, error: { message: error.message } };
    }
  };

  const signOut = () => {
    authAPI.logout();
    setUser(null);
  };

  const updateProfile = async (profileData: any) => {
    try {
      const response = await authAPI.updateProfile(profileData);
      setUser(response.user);
      return { data: response, error: null };
    } catch (error: any) {
      return { data: null, error: { message: error.message } };
    }
  };

  const changePassword = async (currentPassword: string, newPassword: string) => {
    try {
      const response = await authAPI.changePassword({ currentPassword, newPassword });
      return { data: response, error: null };
    } catch (error: any) {
      return { data: null, error: { message: error.message } };
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      signUp,
      signIn,
      signOut,
      updateProfile,
      changePassword
    }}>
      {children}
    </AuthContext.Provider>
  );
};
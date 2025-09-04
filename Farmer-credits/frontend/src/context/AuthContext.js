import React, { createContext, useState, useContext, useEffect } from 'react';
import { authAPI } from '../services/auth';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      const user = JSON.parse(localStorage.getItem('user'));
      setCurrentUser(user);
    }
    setLoading(false);
  }, [token]);

  const login = async (phone, password) => {
    try {
      const response = await authAPI.login(phone, password);
      if (response.data?.success) {
        const { token, farmer } = response.data.data;
        setToken(token);
        setCurrentUser(farmer);
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(farmer));
        return response.data;
      }
      return response.data;
    } catch (error) {
      const status = error.response?.status;
      const needsVerification = error.response?.data?.data?.needsVerification;
      if (status === 403 && needsVerification) {
        return { success: false, data: { needsVerification: true } };
      }
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      const response = await authAPI.register(userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const verifyOTP = async (phone, otp) => {
    try {
      const response = await authAPI.verifyOTP(phone, otp);
      
      if (response.data.success) {
        const { token, farmer } = response.data.data;
        setToken(token);
        setCurrentUser(farmer);
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(farmer));
        return response.data;
      }
    } catch (error) {
      throw error;
    }
  };

  const resendOTP = async (phone) => {
    try {
      const response = await authAPI.resendOTP(phone);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    setToken(null);
    setCurrentUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const value = {
    currentUser,
    token,
    login,
    register,
    verifyOTP,
    resendOTP,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
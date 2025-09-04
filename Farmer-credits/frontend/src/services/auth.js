import api from './api';

export const authAPI = {
  register: (userData) => api.post('/api/auth/register', userData),
  verifyOTP: (phone, otp) => api.post('/api/auth/verify-otp', { phone, otp }),
  login: (phone, password) => api.post('/api/auth/login', { phone, password }),
  resendOTP: (phone) => api.post('/api/auth/resend-otp', { phone }),
};
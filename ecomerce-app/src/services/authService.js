import { apiClient } from './api';

export const authService = {
  register: async (data) => {
    const res = await apiClient.post('/auth/register', data);
    return res.data ?? res;
  },

  login: async (data) => {
    const res = await apiClient.post('/auth/login', data);
    return res.data ?? res;
  },

  getProfile: async () => {
    const res = await apiClient.get('/auth/profile');
    return res.data ?? res;
  },

  updateProfile: async (data) => {
    const res = await apiClient.put('/auth/profile', data);
    return res.data ?? res;
  },

  changePassword: async (data) => {
    const res = await apiClient.put('/auth/change-password', data);
    return res.data ?? res;
  },

  forgotPassword: async (data) => {
    const res = await apiClient.post('/auth/forgot-password', data);
    return res.data ?? res;
  },
};

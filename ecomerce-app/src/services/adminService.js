import { apiClient } from './api';

export const adminService = {
  // Dashboard Stats
  getDashboardStats: () => apiClient.get('/admin/stats'),
  
  // Users Management
  getAllUsers: (page = 1, limit = 10) => 
    apiClient.get(`/admin/users?page=${page}&limit=${limit}`),
  
  deleteUser: (userId) => apiClient.delete(`/admin/users/${userId}`),
  
  updateUserRole: (userId, role) =>
    apiClient.put(`/admin/users/${userId}/role`, { role }),
};

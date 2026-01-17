import { apiClient } from './api';

export const orderService = {
  createOrder: (data) => apiClient.post('/orders', data),
  
  getUserOrders: () => apiClient.get('/orders/my-orders'),
  
  getAllOrders: (status = null, page = 1, limit = 10) => {
    const params = new URLSearchParams();
    if (status) params.append('status', status);
    params.append('page', page);
    params.append('limit', limit);
    return apiClient.get(`/orders/all-orders?${params.toString()}`);
  },
  
  getOrderById: (id) => apiClient.get(`/orders/${id}`),
  
  updateOrderStatus: (id, status) =>
    apiClient.put(`/orders/${id}/status`, { status }),
  
  cancelOrder: (id) => apiClient.put(`/orders/${id}/cancel`),
};

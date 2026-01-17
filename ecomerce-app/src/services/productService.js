import { apiClient } from './api';

export const productService = {
  getAllProducts: (page = 1, limit = 10, category = null) => {
    const params = new URLSearchParams();
    params.append('page', page);
    params.append('limit', limit);
    if (category) params.append('category', category);
    return apiClient.get(`/products?${params.toString()}`);
  },
  
  getProductById: (id) => apiClient.get(`/products/${id}`),
  
  createProduct: (data) => apiClient.post('/products', data),
  
  updateProduct: (id, data) => apiClient.put(`/products/${id}`, data),
  
  deleteProduct: (id) => apiClient.delete(`/products/${id}`),
  
  searchProducts: (query, category = null, minPrice = null, maxPrice = null) => {
    const params = new URLSearchParams();
    if (query) params.append('query', query);
    if (category) params.append('category', category);
    if (minPrice) params.append('minPrice', minPrice);
    if (maxPrice) params.append('maxPrice', maxPrice);
    return apiClient.get(`/products/search?${params.toString()}`);
  },
};

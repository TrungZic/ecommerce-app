import { apiClient } from './api';

export const cartService = {
  getCart: () => apiClient.get('/cart'),
  
  addToCart: (productId, quantity) => 
    apiClient.post('/cart/add', { productId, quantity }),
  
  updateQuantity: (productId, quantity) =>
    apiClient.put('/cart/update', { productId, quantity }),
  
  removeFromCart: (productId) =>
    apiClient.delete('/cart/remove', { productId }),
  
  clearCart: () => apiClient.delete('/cart/clear'),
};

# E-Commerce Backend API

## Giới thiệu
Backend API Node.js/Express cho ứng dụng e-commerce, tích hợp MongoDB database.

## Cập nhật frontend

Để kết nối frontend với backend, hãy cập nhật các services sau:

### 1. Tạo file `src/services/api.js`:

```javascript
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle responses
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
```

### 2. Tạo file `src/services/authService.js`:

```javascript
import api from './api';

export const authService = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getProfile: () => api.get('/auth/profile'),
  updateProfile: (data) => api.put('/auth/profile', data),
  changePassword: (data) => api.put('/auth/change-password', data),
  forgotPassword: (data) => api.post('/auth/forgot-password', data),
};
```

### 3. Tạo file `src/services/productService.js`:

```javascript
import api from './api';

export const productService = {
  getAllProducts: (page, limit, category) => 
    api.get('/products', { params: { page, limit, category } }),
  getProductById: (id) => api.get(`/products/${id}`),
  createProduct: (data) => api.post('/products', data),
  updateProduct: (id, data) => api.put(`/products/${id}`, data),
  deleteProduct: (id) => api.delete(`/products/${id}`),
  searchProducts: (query, category, minPrice, maxPrice) =>
    api.get('/products/search', { params: { query, category, minPrice, maxPrice } }),
};
```

### 4. Tạo file `src/services/cartService.js`:

```javascript
import api from './api';

export const cartService = {
  getCart: () => api.get('/cart'),
  addToCart: (productId, quantity) => 
    api.post('/cart/add', { productId, quantity }),
  updateQuantity: (productId, quantity) =>
    api.put('/cart/update', { productId, quantity }),
  removeFromCart: (productId) =>
    api.delete('/cart/remove', { data: { productId } }),
  clearCart: () => api.delete('/cart/clear'),
};
```

### 5. Tạo file `src/services/orderService.js`:

```javascript
import api from './api';

export const orderService = {
  createOrder: (data) => api.post('/orders', data),
  getUserOrders: () => api.get('/orders/my-orders'),
  getAllOrders: (status, page, limit) =>
    api.get('/orders/all-orders', { params: { status, page, limit } }),
  getOrderById: (id) => api.get(`/orders/${id}`),
  updateOrderStatus: (id, status) =>
    api.put(`/orders/${id}/status`, { status }),
  cancelOrder: (id) => api.put(`/orders/${id}/cancel`),
};
```

## Cài đặt Backend

### Prerequisites
- Node.js (v14+)
- MongoDB (local hoặc MongoDB Atlas)

### Cài đặt

1. Cài đặt dependencies:
```bash
npm install
```

2. Cấu hình `.env`:
```
MONGODB_URI=mongodb://localhost:27017/ecommerce_db
PORT=5000
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

3. Chạy server:
```bash
npm start
```

Hoặc chạy với nodemon (development):
```bash
npm run dev
```

## API Endpoints

### Auth Routes (`/api/auth`)
- `POST /register` - Đăng ký người dùng
- `POST /login` - Đăng nhập
- `GET /profile` - Lấy thông tin profile (cần token)
- `PUT /profile` - Cập nhật profile (cần token)
- `PUT /change-password` - Đổi mật khẩu (cần token)
- `POST /forgot-password` - Quên mật khẩu

### Product Routes (`/api/products`)
- `GET /` - Lấy tất cả sản phẩm
- `GET /search` - Tìm kiếm sản phẩm
- `GET /:id` - Lấy sản phẩm theo ID
- `POST /` - Tạo sản phẩm (admin only)
- `PUT /:id` - Cập nhật sản phẩm (admin only)
- `DELETE /:id` - Xóa sản phẩm (admin only)

### Cart Routes (`/api/cart`)
- `GET /` - Lấy giỏ hàng (cần token)
- `POST /add` - Thêm vào giỏ hàng (cần token)
- `PUT /update` - Cập nhật số lượng (cần token)
- `DELETE /remove` - Xóa sản phẩm (cần token)
- `DELETE /clear` - Xóa toàn bộ giỏ (cần token)

### Order Routes (`/api/orders`)
- `POST /` - Tạo đơn hàng (cần token)
- `GET /my-orders` - Lấy đơn hàng của user (cần token)
- `GET /all-orders` - Lấy tất cả đơn hàng (admin only)
- `GET /:id` - Lấy chi tiết đơn hàng (cần token)
- `PUT /:id/status` - Cập nhật trạng thái (admin only)
- `PUT /:id/cancel` - Hủy đơn hàng (cần token)

## Cấu trúc thư mục

```
backend/
├── models/              # Database schemas
│   ├── User.js
│   ├── Product.js
│   ├── Order.js
│   └── Cart.js
├── controllers/         # Request handlers
│   ├── authController.js
│   ├── productController.js
│   ├── orderController.js
│   └── cartController.js
├── routes/              # API routes
│   ├── authRoutes.js
│   ├── productRoutes.js
│   ├── orderRoutes.js
│   └── cartRoutes.js
├── middleware/          # Custom middleware
│   └── auth.js
├── server.js            # Express server
├── .env                 # Environment variables
└── package.json         # Dependencies
```

## Lưu ý quan trọng

1. **JWT Secret**: Thay đổi `JWT_SECRET` trong production
2. **CORS**: Cấu hình CORS_ORIGIN phù hợp
3. **Database**: Sử dụng MongoDB Atlas hoặc MongoDB local
4. **Error Handling**: Tất cả responses đều có `success` flag
5. **Authentication**: Các route protected yêu cầu Bearer token

## Troubleshooting

**Lỗi MongoDB Connection**:
- Kiểm tra MongoDB đang chạy
- Kiểm tra MONGODB_URI trong .env

**CORS Error**:
- Kiểm tra CORS_ORIGIN config
- Đảm bảo frontend URL khớp

**Token Error**:
- Kiểm tra JWT_SECRET
- Xóa token cũ từ localStorage

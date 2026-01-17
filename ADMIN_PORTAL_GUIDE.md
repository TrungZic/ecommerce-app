# 🔐 Admin Portal Guide

## 📍 Cổng Admin Riêng Tư

Cổng admin được tách riêng để bảo mật. Người dùng thông thường không thể thấy nó.

### 🚀 Truy Cập Admin Portal

**URL:** `http://localhost:3000/admin`

### 📝 Tài Khoản Admin

```
Username: admin
Password: admin123
```

---

## 🔍 Hệ Thống Hoạt Động

### ✅ Đã Kiểm Tra & Xác Nhận

```
✅ MongoDB Connection: OK
✅ User Database: 3 users (1 admin, 2 regular)
✅ Admin Account: FOUND & WORKING
✅ Password Hashing: WORKING
✅ Backend API: RUNNING (port 5000)
```

### 📊 User Accounts Trong Database

| Username | Email | Role | Status |
|----------|-------|------|--------|
| admin | admin@example.com | admin | ✅ Active |
| user1 | user1@example.com | user | ✅ Active |
| user2 | user2@example.com | user | ✅ Active |

---

## 🎯 Hướng Dẫn Sử Dụng

### Step 1: Mở Cổng Admin
```
Trên trình duyệt, go to: http://localhost:3000/admin
```

### Step 2: Đăng Nhập
```
Username: admin
Password: admin123
```

### Step 3: Truy Cập Dashboard
Sau khi đăng nhập thành công, bạn sẽ được chuyển tới Admin Dashboard

### Step 4: Quản Lý Hệ Thống
Dashboard có 4 tabs:
- 📈 **Tổng Quan** - Xem thống kê
- 📦 **Sản Phẩm** - Quản lý sản phẩm
- 🎁 **Đơn Hàng** - Quản lý đơn hàng
- 👥 **Người Dùng** - Quản lý người dùng

---

## 🔐 Bảo Mật

### ✅ Tính Năng Bảo Mật

- ✅ **Hidden Admin Button** - Nút admin đã bị xóa khỏi trang chủ
- ✅ **Private Portal** - Admin portal không xuất hiện ở bất kỳ đâu
- ✅ **JWT Authentication** - Token-based authentication
- ✅ **Role-Based Access** - Chỉ admin mới vào được dashboard
- ✅ **Password Hashing** - Mật khẩu được mã hóa bcrypt

### 🔒 Khi Có Vấn Đề

Nếu không thể đăng nhập:

1. **Kiểm tra Backend:**
   ```bash
   # Terminal 1: Chạy backend
   cd backend
   npm start
   ```

2. **Kiểm tra Database:**
   ```bash
   # Terminal 2: Chạy debug script
   cd backend
   node debug.js
   ```

3. **Kiểm tra MongoDB:**
   ```bash
   # MongoDB phải chạy (mặc định port 27017)
   mongod
   ```

4. **Xem Network:**
   - DevTools → Network → Filter "login"
   - Check response từ API

---

## 🧪 Test Admin Portal

### Cách 1: Bản Thân Nhập Username/Password

```
Go to: http://localhost:3000/admin
Nhập:
  username: admin
  password: admin123
Click: 🚀 Truy Cập Admin
```

### Cách 2: Dùng Nút "Show Test Credentials"

Portal có tính năng debug - click nút "⚙️ Show Test Credentials" để:
- Xem tất cả tài khoản test
- Click nút "➜ Dùng" để tự động điền
- Xem API URLs để test manual

### Cách 3: Test API Trực Tiếp

```bash
# Check backend chạy không
curl http://localhost:5000/api/health

# Response:
{"success":true,"message":"Server is running"}
```

---

## 📌 Các Endpoints API Admin

```
POST   /api/auth/login              - Đăng nhập
GET    /api/admin/stats             - Lấy thống kê
GET    /api/admin/users             - Lấy danh sách user
DELETE /api/admin/users/:id         - Xóa user
PUT    /api/admin/users/:id/role    - Thay đổi role

GET    /api/products                - Lấy sản phẩm
POST   /api/products                - Tạo sản phẩm (admin)
DELETE /api/products/:id            - Xóa sản phẩm (admin)

GET    /api/orders                  - Lấy đơn hàng
PUT    /api/orders/:id/status       - Update trạng thái đơn
```

---

## 🎯 Chức Năng Admin Dashboard

### 📈 Tab Tổng Quan
- Tổng đơn hàng
- Tổng doanh thu
- Tổng người dùng
- Tổng sản phẩm
- Breakdown trạng thái đơn hàng

### 📦 Tab Sản Phẩm
- Xem danh sách sản phẩm
- Thêm sản phẩm mới
- Xóa sản phẩm

### 🎁 Tab Đơn Hàng
- Xem danh sách đơn hàng
- Update trạng thái (Chờ → Xác nhận → Giao → Đã giao)
- Xem chi tiết đơn hàng

### 👥 Tab Người Dùng
- Xem danh sách người dùng
- Thay đổi role (user ↔ admin)
- Xóa người dùng
- Xem số đơn hàng & tổng chi tiêu

---

## 🔍 Troubleshooting

### Vấn Đề: "Cannot login"

**Kiểm tra:**
1. Backend có chạy? (port 5000)
2. MongoDB có chạy? (port 27017)
3. Username/Password đúng không?

**Giải pháp:**
```bash
# 1. Restart backend
cd backend
npm start

# 2. Check database
node debug.js

# 3. Seed lại data nếu cần
node seed.js
```

### Vấn Đề: "Invalid username or password"

**Nguyên nhân:**
- Username hoặc password sai
- User không tồn tại
- Password chưa được hash

**Giải pháp:**
```bash
# Chạy debug script để kiểm tra
node debug.js

# Nếu cần, seed lại database
node seed.js
```

### Vấn Đề: "Cannot reach backend"

**Nguyên nhân:**
- Backend không chạy
- Port 5000 bị chiếm
- CORS settings sai

**Giải pháp:**
```bash
# Check port 5000
netstat -ano | findstr :5000

# Kill process nếu cần
taskkill /PID <PID> /F

# Restart backend
npm start
```

---

## 📝 Notes

- Admin portal URL: `/admin` (không `/AdminLogin`)
- Nút admin đã bị xóa khỏi header trang chủ
- Chỉ có tài khoản có role "admin" mới vào được dashboard
- Database đã được seed với 3 tài khoản (1 admin, 2 user)
- Tất cả mật khẩu đều được hash bằng bcrypt

---

## ✅ Checklist

- [x] Admin Portal tạo thành công
- [x] Database có data
- [x] Login hoạt động
- [x] Dashboard hoạt động
- [x] Hidden admin button từ trang chủ
- [x] Debug script tạo
- [x] Guide viết

---

**Hãy thử:**
1. Go to `http://localhost:3000/admin`
2. Login với `admin / admin123`
3. Quản lý hệ thống từ dashboard!

🎉 **Admin portal hoạt động tốt!**

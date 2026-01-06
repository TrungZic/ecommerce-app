import React, { createContext, useState, useEffect } from 'react';

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [adminLoggedIn, setAdminLoggedIn] = useState(false);
  const [adminUser, setAdminUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [registeredUsers, setRegisteredUsers] = useState(() => {
    // Load registered users từ localStorage
    const saved = localStorage.getItem('registeredUsers');
    return saved ? JSON.parse(saved) : [];
  });

  // Cập nhật khi localStorage thay đổi (từ AuthContext)
  useEffect(() => {
    const handleStorageChange = () => {
      const saved = localStorage.getItem('registeredUsers');
      if (saved) {
        setRegisteredUsers(JSON.parse(saved));
      }
    };

    // Lắng nghe thay đổi từ các tab khác
    window.addEventListener('storage', handleStorageChange);
    
    // Cập nhật ngay khi component mount
    handleStorageChange();
    
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Hàm để refresh dữ liệu người dùng từ localStorage
  const refreshUsers = () => {
    const saved = localStorage.getItem('registeredUsers');
    if (saved) {
      setRegisteredUsers(JSON.parse(saved));
    }
  };

  // Thông tin đăng nhập admin
  const ADMIN_USERNAME = 'admin';
  const ADMIN_PASSWORD = '123456';

  const adminLogin = (username, password) => {
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setAdminLoggedIn(true);
      setAdminUser({ username: ADMIN_USERNAME, role: 'admin', loginTime: new Date() });
      return { success: true, message: 'Đăng nhập Admin thành công!' };
    }
    return { success: false, message: 'Tên đăng nhập hoặc mật khẩu Admin không chính xác!' };
  };

  const adminLogout = () => {
    setAdminLoggedIn(false);
    setAdminUser(null);
  };

  const addProduct = (product) => {
    const newProduct = {
      ...product,
      id: Math.max(...products.map(p => p.id), 0) + 1
    };
    setProducts([...products, newProduct]);
    return newProduct;
  };

  const updateProduct = (id, updatedProduct) => {
    setProducts(products.map(p => p.id === id ? { ...p, ...updatedProduct } : p));
  };

  const deleteProduct = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  return (
    <AdminContext.Provider 
      value={{ 
        adminLoggedIn, 
        adminUser, 
        adminLogin, 
        adminLogout,
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        registeredUsers,
        refreshUsers
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
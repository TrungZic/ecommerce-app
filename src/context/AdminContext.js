import React, { createContext, useState } from 'react';

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [adminLoggedIn, setAdminLoggedIn] = useState(false);
  const [adminUser, setAdminUser] = useState(null);

  // Thông tin đăng nhập admin
  const ADMIN_USERNAME = 'admin';
  const ADMIN_PASSWORD = '123456';

  const adminLogin = (username, password) => {
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setAdminLoggedIn(true);
      setAdminUser({ username: ADMIN_USERNAME, role: 'admin' });
      return { success: true, message: 'Đăng nhập Admin thành công!' };
    }
    return { success: false, message: 'Tên đăng nhập hoặc mật khẩu Admin không chính xác!' };
  };

  const adminLogout = () => {
    setAdminLoggedIn(false);
    setAdminUser(null);
  };

  return (
    <AdminContext.Provider 
      value={{ 
        adminLoggedIn, 
        adminUser, 
        adminLogin, 
        adminLogout 
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
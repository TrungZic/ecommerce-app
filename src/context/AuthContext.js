import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // Lưu danh sách tài khoản đã đăng ký
  const [registeredUsers, setRegisteredUsers] = useState([]);

  const login = (username, password) => {
    // Kiểm tra xem tài khoản có tồn tại không
    const foundUser = registeredUsers.find(
      u => u.username === username && u.password === password
    );

    if (foundUser) {
      setUser({ username: foundUser.username, email: foundUser.email });
      setIsLoggedIn(true);
      return { success: true, message: 'Đăng nhập thành công!' };
    } else {
      return { 
        success: false, 
        message: 'Tên đăng nhập hoặc mật khẩu không chính xác. Hoặc tài khoản chưa được đăng ký.' 
      };
    }
  };

  const register = (username, email, password, confirmPassword) => {
    // Kiểm tra mật khẩu có khớp không
    if (password !== confirmPassword) {
      return { success: false, message: 'Mật khẩu không khớp!' };
    }

    // Kiểm tra tài khoản đã tồn tại chưa
    const userExists = registeredUsers.some(u => u.username === username);
    if (userExists) {
      return { success: false, message: 'Tên đăng nhập đã tồn tại!' };
    }

    // Kiểm tra email đã tồn tại chưa
    const emailExists = registeredUsers.some(u => u.email === email);
    if (emailExists) {
      return { success: false, message: 'Email đã được đăng ký!' };
    }

    // Thêm tài khoản mới vào danh sách
    const newUser = { username, email, password };
    setRegisteredUsers([...registeredUsers, newUser]);

    return { success: true, message: 'Đăng ký thành công! Bây giờ bạn có thể đăng nhập.' };
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isLoggedIn, 
        login, 
        register, 
        logout,
        registeredUsers 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
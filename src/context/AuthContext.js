import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // Lưu danh sách tài khoản đã đăng ký
  const [registeredUsers, setRegisteredUsers] = useState(() => {
    // Load từ localStorage khi khởi động
    const saved = localStorage.getItem('registeredUsers');
    return saved ? JSON.parse(saved) : [];
  });

  // Lưu registeredUsers vào localStorage mỗi khi nó thay đổi
  useEffect(() => {
    localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
  }, [registeredUsers]);

  // Restore user login state từ localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    const savedLoggedIn = localStorage.getItem('isLoggedIn');
    if (savedUser && savedLoggedIn === 'true') {
      setUser(JSON.parse(savedUser));
      setIsLoggedIn(true);
    }
  }, []);

  const login = (username, password) => {
    // Kiểm tra xem tài khoản có tồn tại không
    const foundUser = registeredUsers.find(
      u => u.username === username && u.password === password
    );

    if (foundUser) {
      const userData = { username: foundUser.username, email: foundUser.email };
      setUser(userData);
      setIsLoggedIn(true);
      // Lưu vào localStorage
      localStorage.setItem('currentUser', JSON.stringify(userData));
      localStorage.setItem('isLoggedIn', 'true');
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
    // Xóa từ localStorage
    localStorage.removeItem('currentUser');
    localStorage.removeItem('isLoggedIn');
  };

    const resetPassword = (username, newPassword) => {
      // Tìm tài khoản và cập nhật mật khẩu
      const userIndex = registeredUsers.findIndex(u => u.username === username);
    
      if (userIndex === -1) {
        return { success: false, message: 'Tài khoản không tồn tại!' };
      }

      // Cập nhật mật khẩu
      const updatedUsers = [...registeredUsers];
      updatedUsers[userIndex].password = newPassword;
      setRegisteredUsers(updatedUsers);

      return { success: true, message: 'Mật khẩu đã được thay đổi thành công! Vui lòng đăng nhập lại.' };
    };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isLoggedIn, 
        login, 
        register, 
        logout,
          registeredUsers,
          resetPassword
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
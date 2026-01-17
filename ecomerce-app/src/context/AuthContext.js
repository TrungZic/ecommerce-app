import React, { createContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Restore login
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const savedToken = localStorage.getItem('token');
    if (savedUser && savedToken) {
      try {
        setUser(JSON.parse(savedUser));
        setIsLoggedIn(true);
      } catch {
        localStorage.clear();
      }
    }
  }, []);

  // ================= LOGIN =================
  const login = async (username, password) => {
    try {
      setLoading(true);
      setError(null);

      const res = await authService.login({ username, password });
      console.log('LOGIN RESPONSE:', res);

      if (!res || res.success !== true) {
        throw new Error(res?.message || 'Đăng nhập thất bại');
      }

      localStorage.setItem('token', res.token);
      localStorage.setItem('user', JSON.stringify(res.user));
      setUser(res.user);
      setIsLoggedIn(true);

      return { success: true, message: res.message };
    } catch (err) {
      setError(err.message);
      return { success: false, message: err.message };
    } finally {
      setLoading(false);
    }
  };

  // ================= REGISTER =================
 const register = async (formData) => {
  try {
    setLoading(true);
    setError(null);

    const res = await authService.register(formData);
    // res CHÍNH LÀ JSON TỪ BACKEND

    return {
      success: res.success,
      message: res.message
    };

  } catch (err) {
    return {
      success: false,
      message: err.message || 'Đăng ký thất bại'
    };
  } finally {
    setLoading(false);
  }
};


  // ================= LOGOUT =================
  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.clear();
  };

  // ================= FORGOT PASSWORD =================
  const forgotPassword = async (data) => {
    try {
      setLoading(true);
      const res = await authService.forgotPassword(data);

      return {
        success: res.success,
        message: res.message
      };
    } catch (err) {
      return {
        success: false,
        message: err.message
      };
    } finally {
      setLoading(false);
    }
  };

  // ================= UPDATE PROFILE =================
  const updateProfile = async (data) => {
    try {
      setLoading(true);
      const res = await authService.updateProfile(data);

      if (res.success) {
        localStorage.setItem('user', JSON.stringify(res.user));
        setUser(res.user);
      }

      return res;
    } catch (err) {
      return {
        success: false,
        message: err.message
      };
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn,
        login,
        register,
        logout,
        forgotPassword,
        updateProfile,
        loading,
        error
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

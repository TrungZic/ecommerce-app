import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { authService } from '../services/authService';
import '../css/AdminLogin.css';

function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { user, isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn && user?.role === 'admin') {
      navigate('/AdminDashboard');
    }
  }, [isLoggedIn, user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!username.trim() || !password.trim()) {
      setError('Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu!');
      return;
    }

    try {
      setIsLoading(true);
      const result = await authService.login({ username, password });
      
      if (result.success && result.user.role === 'admin') {
        navigate('/AdminDashboard');
      } else if (result.success) {
        setError('Bạn không có quyền truy cập Admin Dashboard');
      } else {
        setError(result.message || 'Đăng nhập thất bại');
      }
    } catch (err) {
      setError(err.message || 'Lỗi kết nối server');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-container">
        <div className="admin-login-form">
          <div className="admin-logo">👨‍💼</div>
          <h2>Admin Dashboard</h2>
          <p className="admin-subtitle">Đăng nhập để quản lý hệ thống</p>

          {error && <div className="error-message">⚠️ {error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Tên Đăng Nhập</label>
              <div className="input-wrapper">
                <span className="input-icon">👤</span>
                <input
                  id="username"
                  type="text"
                  placeholder="Nhập tên đăng nhập"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password">Mật Khẩu</label>
              <div className="input-wrapper">
                <span className="input-icon">🔒</span>
                <input
                  id="password"
                  type="password"
                  placeholder="Nhập mật khẩu"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button 
              type="submit" 
              className="admin-submit-btn"
              disabled={isLoading}
            >
              {isLoading ? '⏳ Đang xử lý...' : '🔓 Đăng Nhập'}
            </button>
          </form>

          <div className="admin-footer">
            <a href="/" className="back-link">← Quay lại trang chủ</a>
          </div>
        </div>
        
        <div className="admin-features">
          <h3>✨ Tính Năng Admin</h3>
          <ul>
            <li>📊 Xem tổng quan hệ thống</li>
            <li>📦 Quản lý sản phẩm</li>
            <li>📋 Quản lý đơn hàng</li>
            <li>👥 Quản lý người dùng</li>
            <li>💰 Thống kê doanh thu</li>
            <li>⚙️ Cài đặt hệ thống</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
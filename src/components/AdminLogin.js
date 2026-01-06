import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminContext } from '../context/AdminContext';
import './AdminLogin.css';

function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { adminLogin } = useContext(AdminContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!username.trim() || !password.trim()) {
      setError('Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu!');
      setIsLoading(false);
      return;
    }

    // Simulate loading
    setTimeout(() => {
      const result = adminLogin(username, password);
      setIsLoading(false);
      
      if (result.success) {
        navigate('/AdminDashboard');
      } else {
        setError(result.message);
      }
    }, 800);
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
              {isLoading ? '⏳ Đang xác thực...' : '🔐 Đăng Nhập Admin'}
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
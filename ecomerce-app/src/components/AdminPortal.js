import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import { LoadingSpinner } from './shared';
import '../css/AdminPortal.css';

function AdminPortal() {
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [showDebug, setShowDebug] = useState(false);
  const { login, user, isLoggedIn } = useContext(AuthContext);
  const { success, error: showError } = useNotification();
  const navigate = useNavigate();

  // Nếu đã đăng nhập và là admin, chuyển tới dashboard
  useEffect(() => {
    if (isLoggedIn && user?.role === 'admin') {
      navigate('/AdminDashboard');
    }
  }, [isLoggedIn, user, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!loginData.username || !loginData.password) {
      showError('Vui lòng nhập tên đăng nhập và mật khẩu');
      return;
    }

    setLoading(true);
    try {
      const result = await login(loginData.username, loginData.password);
      
      if (result.success) {
        if (result.user?.role === 'admin') {
          success('Đăng nhập thành công! Chuyển tới dashboard...');
          setTimeout(() => navigate('/AdminDashboard'), 1500);
        } else {
          showError('Tài khoản này không có quyền admin');
        }
      } else {
        showError(result.message || 'Đăng nhập thất bại');
      }
    } catch (err) {
      showError(err.message || 'Lỗi đăng nhập');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-portal-container">
      {/* Background effect */}
      <div className="portal-background">
        <div className="portal-shape portal-shape-1"></div>
        <div className="portal-shape portal-shape-2"></div>
        <div className="portal-shape portal-shape-3"></div>
      </div>

      {/* Main portal */}
      <div className="admin-portal">
        <div className="portal-header">
          <h1>🔐 Cổng Quản Lý</h1>
          <p>Admin Portal - Vào từ đây để quản lý hệ thống</p>
        </div>

        <form onSubmit={handleSubmit} className="portal-form">
          <div className="form-group">
            <label htmlFor="username">👤 Tên Đăng Nhập</label>
            <input
              id="username"
              type="text"
              name="username"
              placeholder="Nhập tên đăng nhập admin"
              value={loginData.username}
              onChange={handleInputChange}
              disabled={loading}
              autoFocus
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">🔑 Mật Khẩu</label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Nhập mật khẩu"
              value={loginData.password}
              onChange={handleInputChange}
              disabled={loading}
            />
          </div>

          <button type="submit" className="portal-btn-login" disabled={loading}>
            {loading ? (
              <>
                <LoadingSpinner size="small" /> Đang xác thực...
              </>
            ) : (
              '🚀 Truy Cập Admin'
            )}
          </button>
        </form>

        {/* Debug Section */}
        <div className="debug-section">
          <button 
            type="button" 
            className="debug-toggle"
            onClick={() => setShowDebug(!showDebug)}
          >
            {showDebug ? '✕ Ẩn' : '⚙️ Show'} Test Credentials
          </button>

          {showDebug && (
            <div className="debug-info">
              <h3>📝 Tài Khoản Test</h3>
              <div className="credential">
                <strong>Admin (có quyền):</strong>
                <code>username: admin | password: admin123</code>
                <button 
                  type="button"
                  onClick={() => {
                    setLoginData({ username: 'admin', password: 'admin123' });
                    showError('Đã điền tài khoản admin test');
                  }}
                >
                  ➜ Dùng
                </button>
              </div>
              <div className="credential">
                <strong>User 1 (không có quyền):</strong>
                <code>username: user1 | password: password123</code>
                <button 
                  type="button"
                  onClick={() => {
                    setLoginData({ username: 'user1', password: 'password123' });
                    showError('⚠️ Tài khoản này không phải admin');
                  }}
                >
                  ➜ Dùng
                </button>
              </div>
              <div className="credential">
                <strong>User 2 (không có quyền):</strong>
                <code>username: user2 | password: password123</code>
                <button 
                  type="button"
                  onClick={() => {
                    setLoginData({ username: 'user2', password: 'password123' });
                    showError('⚠️ Tài khoản này không phải admin');
                  }}
                >
                  ➜ Dùng
                </button>
              </div>
              <hr style={{margin: '15px 0'}} />
              <h4>🔍 API Test URL:</h4>
              <code style={{fontSize: '12px'}}>
                GET http://localhost:5000/api/health
              </code>
              <p style={{fontSize: '12px', marginTop: '10px', color: '#666'}}>
                Kiểm tra backend có chạy không
              </p>
            </div>
          )}
        </div>

        {/* Footer Info */}
        <div className="portal-footer">
          <p>⚠️ <strong>Chỉ Admin mới có thể truy cập</strong> dashboard quản lý</p>
          <p style={{fontSize: '12px', color: '#999', marginTop: '5px'}}>
            Backend: http://localhost:5000
          </p>
        </div>
      </div>

      {/* Go Back Button */}
      <div className="portal-back">
        <a href="/" className="back-link">← Quay lại trang chủ</a>
      </div>
    </div>
  );
}

export default AdminPortal;

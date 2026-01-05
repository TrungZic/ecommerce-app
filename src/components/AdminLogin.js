import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminContext } from '../context/AdminContext';

function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { adminLogin } = useContext(AdminContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!username.trim() || !password.trim()) {
      setError('Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu!');
      return;
    }

    const result = adminLogin(username, password);
    
    if (result.success) {
      navigate('/AdminDashboard');
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-form">
        <div className="admin-logo">👨‍💼</div>
        <h2>Admin Login</h2>
        <p className="admin-subtitle">Quản lý hệ thống cửa hàng</p>

        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Tên đăng nhập:</label>
            <input
              id="username"
              type="text"
              placeholder="Nhập: admin"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Mật khẩu:</label>
            <input
              id="password"
              type="password"
              placeholder="Nhập: 123456"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="admin-submit-btn">Đăng Nhập Admin</button>
        </form>

        <div className="admin-footer">
          <p style={{backgroundColor: '#e8f4f8', padding: '15px', borderRadius: '5px', marginBottom: '15px'}}>
            🔑 <strong>Tài khoản demo:</strong><br/>
            Username: <code>admin</code><br/>
            Password: <code>123456</code>
          </p>
          <a href="/">← Quay lại trang chủ</a>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
import React, { useState, useContext, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import { LoadingSpinner } from './shared';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useContext(AuthContext);
  const { success, error } = useNotification();
  const navigate = useNavigate();

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      console.log('🔥 LOGIN SUBMIT');

      if (!username.trim() || !password.trim()) {
        error('Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu!');
        return;
      }

      setLoading(true);
      try {
        const result = await login(username, password);

        if (result.success) {
          success('Đăng nhập thành công!');
          setTimeout(() => navigate('/'), 1000);
        } else {
          error(result.message || 'Đăng nhập thất bại');
        }
      } catch (err) {
        error(err.message || 'Đăng nhập thất bại');
      } finally {
        setLoading(false);
      }
    },
    [username, password, login, navigate, success, error]
  );

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>Đăng Nhập</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Tên đăng nhập</label>
            <input
              type="text"
              placeholder="Nhập tên đăng nhập"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label>Mật khẩu</label>
            <input
              type="password"
              placeholder="Nhập mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
          </div>

          {/* ❌ KHÔNG disable theo isFormValid */}
          <button type="submit" disabled={loading}>
            {loading ? (
              <>
                <LoadingSpinner size="small" /> Đang đăng nhập...
              </>
            ) : (
              'Đăng Nhập'
            )}
          </button>
        </form>

        <div className="forgot-password-link">
          <Link to="/forgot-password">Quên mật khẩu?</Link>
        </div>

        <div className="auth-footer">
          <p>
            Chưa có tài khoản? <Link to="/register">Đăng ký ngay</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;

import React, { useState, useContext, useCallback, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import { validateEmail, validatePassword } from '../utils';
import { LoadingSpinner } from './shared';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);

  const { register } = useContext(AuthContext);
  const { success, error } = useNotification();
  const navigate = useNavigate();

  // ===== VALIDATION =====
  const validationErrors = useMemo(() => {
    const errors = [];

    if (username.trim().length < 3) {
      errors.push('Tên đăng nhập phải có ít nhất 3 ký tự');
    }

    if (!validateEmail(email.trim())) {
      errors.push('Email không hợp lệ');
    }

    if (!validatePassword(password.trim())) {
      errors.push('Mật khẩu phải có ít nhất 6 ký tự');
    }

    if (password !== confirmPassword) {
      errors.push('Mật khẩu không khớp');
    }

    return errors;
  }, [username, email, password, confirmPassword]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    console.log('🔥 SUBMIT CLICKED'); // DEBUG

    if (validationErrors.length > 0) {
      error(validationErrors[0]);
      return;
    }

    setLoading(true);

    try {
      const result = await register({
  username,
  email,
  password,
  confirmPassword,
  fullName,
  phoneNumber,
  address,
  city
});


      if (result.success) {
        success('Đăng ký thành công!');
        setTimeout(() => navigate('/login'), 1500);
      } else {
        error(result.message || 'Đăng ký thất bại');
      }
    } catch (err) {
      error(err.message || 'Đăng ký thất bại');
    } finally {
      setLoading(false);
    }
  }, [
    username,
    email,
    password,
    confirmPassword,
    fullName,
    phoneNumber,
    address,
    city,
    validationErrors,
    register,
    navigate,
    success,
    error
  ]);

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>Đăng Ký</h2>

        <form onSubmit={handleSubmit}>
          <input
            placeholder="Tên đăng nhập"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={loading}
          />

          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />

          <input
            placeholder="Họ và tên"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            disabled={loading}
          />

          <input
            placeholder="Số điện thoại"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            disabled={loading}
          />

          <input
            placeholder="Địa chỉ"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            disabled={loading}
          />

          <input
            placeholder="Thành phố"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            disabled={loading}
          />

          <input
            type="password"
            placeholder="Mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />

          <input
            type="password"
            placeholder="Xác nhận mật khẩu"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={loading}
          />

          {/* ❌ KHÔNG disable theo isFormValid */}
          <button type="submit" disabled={loading}>
            {loading ? <LoadingSpinner size="small" /> : 'Đăng Ký'}
          </button>
        </form>

        <p>
          Đã có tài khoản? <Link to="/login">Đăng nhập</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;

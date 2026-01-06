import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function ForgotPassword() {
  const [step, setStep] = useState(1); // 1: nhập username/email, 2: nhập mật khẩu mới
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [foundUser, setFoundUser] = useState(null);
  
  const { registeredUsers, resetPassword } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleVerifyUser = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Kiểm tra không để trống
    if (!username.trim() || !email.trim()) {
      setError('Vui lòng nhập tên đăng nhập và email!');
      return;
    }

    // Tìm tài khoản
    const user = registeredUsers.find(
      u => u.username === username && u.email === email
    );

    if (user) {
      setFoundUser(user);
      setSuccess('✅ Xác thực thành công! Vui lòng tạo mật khẩu mới.');
      setTimeout(() => {
        setStep(2);
        setSuccess('');
      }, 1500);
    } else {
      setError('❌ Tên đăng nhập hoặc email không chính xác!');
    }
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Kiểm tra không để trống
    if (!newPassword.trim() || !confirmPassword.trim()) {
      setError('Vui lòng nhập đầy đủ mật khẩu!');
      return;
    }

    // Kiểm tra độ dài mật khẩu
    if (newPassword.length < 6) {
      setError('Mật khẩu phải có ít nhất 6 ký tự!');
      return;
    }

    // Kiểm tra mật khẩu khớp
    if (newPassword !== confirmPassword) {
      setError('Mật khẩu không khớp!');
      return;
    }

    // Gọi hàm reset password
    const result = resetPassword(foundUser.username, newPassword);
    
    if (result.success) {
      setSuccess('✅ ' + result.message);
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } else {
      setError('❌ ' + result.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form forgot-password-form">
        <h2>🔐 Đặt Lại Mật Khẩu</h2>
        
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}

        {step === 1 ? (
          <form onSubmit={handleVerifyUser}>
            <p className="step-description">Bước 1: Xác thực tài khoản của bạn</p>
            
            <div className="form-group">
              <label htmlFor="username">Tên đăng nhập:</label>
              <input
                id="username"
                type="text"
                placeholder="Nhập tên đăng nhập của bạn"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                id="email"
                type="email"
                placeholder="Nhập email của bạn"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button type="submit" className="submit-btn">Xác Thực</button>
          </form>
        ) : (
          <form onSubmit={handleResetPassword}>
            <p className="step-description">Bước 2: Tạo mật khẩu mới cho tài khoản <strong>{foundUser.username}</strong></p>
            
            <div className="form-group">
              <label htmlFor="newPassword">Mật khẩu mới:</label>
              <input
                id="newPassword"
                type="password"
                placeholder="Nhập mật khẩu mới (tối thiểu 6 ký tự)"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Xác nhận mật khẩu:</label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="Nhập lại mật khẩu"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <button type="submit" className="submit-btn">Đặt Lại Mật Khẩu</button>
            
            <button 
              type="button" 
              className="back-btn"
              onClick={() => {
                setStep(1);
                setUsername('');
                setEmail('');
                setNewPassword('');
                setConfirmPassword('');
                setFoundUser(null);
              }}
            >
              ← Quay Lại
            </button>
          </form>
        )}

        <div className="auth-footer">
          <p><Link to="/login">← Quay lại đăng nhập</Link></p>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;

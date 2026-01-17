import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { forgotPassword } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleVerifyUser = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!email.trim()) {
      setError('Vui lòng nhập email!');
      return;
    }

    setSuccess('✅ Vui lòng tạo mật khẩu mới.');
    setTimeout(() => {
      setStep(2);
      setSuccess('');
    }, 1500);
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!newPassword.trim() || !confirmPassword.trim()) {
      setError('Vui lòng nhập đầy đủ mật khẩu!');
      return;
    }

    if (newPassword.length < 6) {
      setError('Mật khẩu phải có ít nhất 6 ký tự!');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Mật khẩu không khớp!');
      return;
    }

    try {
      setLoading(true);
      const result = await forgotPassword(email, newPassword, confirmPassword);
      
      if (result.success) {
        setSuccess('✅ ' + result.message);
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        setError('❌ ' + result.message);
      }
    } catch (err) {
      setError(err.message || 'Có lỗi xảy ra');
    } finally {
      setLoading(false);
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
            <p className="step-description">Bước 1: Nhập email của bạn</p>
            
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

            <button type="submit" className="submit-btn">Tiếp Tục</button>
          </form>
        ) : (
          <form onSubmit={handleResetPassword}>
            <p className="step-description">Bước 2: Tạo mật khẩu mới</p>
            
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

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? 'Đang xử lý...' : 'Đặt Lại Mật Khẩu'}
            </button>
            
            <button 
              type="button" 
              className="back-btn"
              onClick={() => {
                setStep(1);
                setEmail('');
                setNewPassword('');
                setConfirmPassword('');
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

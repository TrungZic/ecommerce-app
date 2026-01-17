import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import { AdminContext } from '../context/AdminContext';

function Header() {
  const { isLoggedIn, user, logout } = useContext(AuthContext);
  const { cartItems } = useContext(CartContext);
  const { adminLoggedIn } = useContext(AdminContext);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="header">
      <div className="header-top">
        <h1>🛍️ Cửa Hàng Điện Tử</h1>
        <div className="user-info">
          {isLoggedIn ? (
            <>
              <span className="username">Xin chào, {user.username}!</span>
              <Link to="/account" className="account-link">👤 Tài khoản</Link>
              <button onClick={logout} className="logout-btn">Đăng Xuất</button>
            </>
          ) : (
            <>
              <Link to="/login" className="auth-link">Đăng Nhập</Link>
              <Link to="/register" className="auth-link">Đăng Ký</Link>
            </>
          )}
        </div>
      </div>
      <nav className="navbar">
        <Link to="/">Trang Chủ</Link>
        <Link to="/about">Giới Thiệu</Link>
        <Link to="/contact">Liên Hệ</Link>
        <Link to="/cart" className="cart-link">🛒 Giỏ Hàng ({totalItems})</Link>
      </nav>
    </header>
  );
}

export default Header;
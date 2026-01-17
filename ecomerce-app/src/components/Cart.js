import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { OrderContext } from '../context/OrderContext';

function Cart() {
  const { cartItems, removeFromCart, updateQuantity } = useContext(CartContext);
  const { user, isLoggedIn } = useContext(AuthContext);
  const { createOrder } = useContext(OrderContext);
  const navigate = useNavigate();

  const [showCheckout, setShowCheckout] = useState(false);
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleCheckout = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!isLoggedIn) {
      setError('Vui lòng đăng nhập để thanh toán');
      return;
    }

    if (!address.trim()) {
      setError('Vui lòng nhập địa chỉ giao hàng');
      return;
    }

    if (!phoneNumber.trim()) {
      setError('Vui lòng nhập số điện thoại');
      return;
    }

    // Tạo đơn hàng
    const result = createOrder(cartItems, total, user.username);

    if (result.success) {
      setSuccess(result.message);
      setShowCheckout(false);
      setTimeout(() => {
        navigate('/account');
      }, 2000);
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="cart">
      <h2>🛒 Giỏ Hàng</h2>

      {!isLoggedIn && (
        <div className="login-reminder">
          <p>⚠️ Vui lòng <a href="/login">đăng nhập</a> để thanh toán</p>
        </div>
      )}

      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <p>Giỏ hàng trống</p>
          <a href="/" className="continue-shopping">Tiếp tục mua sắm</a>
        </div>
      ) : (
        <>
          <table className="cart-table">
            <thead>
              <tr>
                <th>Sản phẩm</th>
                <th>Giá</th>
                <th>Số lượng</th>
                <th>Thành tiền</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map(item => (
                <tr key={item.id}>
                  <td className="product-name">{item.name}</td>
                  <td>{item.price.toLocaleString('vi-VN')} đ</td>
                  <td>
                    <div className="quantity-control">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="qty-btn"
                      >
                        −
                      </button>
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                        className="qty-input"
                      />
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="qty-btn"
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="item-total">
                    {(item.price * item.quantity).toLocaleString('vi-VN')} đ
                  </td>
                  <td>
                    <button 
                      className="delete-btn"
                      onClick={() => removeFromCart(item.id)}
                    >
                      🗑️ Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="cart-summary">
            <div className="summary-row">
              <span>Tổng sản phẩm:</span>
              <span>{cartItems.reduce((sum, item) => sum + item.quantity, 0)}</span>
            </div>
            <div className="summary-row">
              <span>Tổng tiền:</span>
              <span className="total-price">{total.toLocaleString('vi-VN')} đ</span>
            </div>
          </div>

          {!showCheckout ? (
            <div className="cart-actions">
              <a href="/" className="continue-shopping">← Tiếp tục mua sắm</a>
              <button 
                className="checkout-btn"
                onClick={() => setShowCheckout(true)}
                disabled={!isLoggedIn}
              >
                Thanh Toán
              </button>
            </div>
          ) : (
            <div className="checkout-form">
              <h3>Thông tin giao hàng</h3>
              {error && <p className="error-message">{error}</p>}
              {success && <p className="success-message">{success}</p>}
              
              <form onSubmit={handleCheckout}>
                <div className="form-group">
                  <label>Địa chỉ giao hàng *</label>
                  <input
                    type="text"
                    placeholder="Nhập địa chỉ giao hàng"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Số điện thoại *</label>
                  <input
                    type="tel"
                    placeholder="Nhập số điện thoại"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Ghi chú (tùy chọn)</label>
                  <textarea
                    placeholder="Ghi chú cho đơn hàng"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows="4"
                  ></textarea>
                </div>

                <div className="checkout-actions">
                  <button 
                    type="button" 
                    className="cancel-checkout-btn"
                    onClick={() => setShowCheckout(false)}
                  >
                    Hủy
                  </button>
                  <button type="submit" className="confirm-checkout-btn">
                    ✓ Xác nhận thanh toán
                  </button>
                </div>
              </form>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Cart;
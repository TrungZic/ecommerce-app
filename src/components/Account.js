import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { OrderContext } from '../context/OrderContext';
import '../css/Account.css';

function Account() {
  const { user, logout } = useContext(AuthContext);
  const { getUserOrders, deleteOrder, updateOrderStatus } = useContext(OrderContext);
  const [activeTab, setActiveTab] = useState('orders');
  const [expandedOrder, setExpandedOrder] = useState(null);

  if (!user) {
    return (
      <div className="account-container">
        <p>Vui lòng đăng nhập để xem tài khoản</p>
      </div>
    );
  }

  const userOrders = getUserOrders(user.username);
  const pendingOrders = userOrders.filter(o => o.status === 'Chờ xác nhận');
  const processingOrders = userOrders.filter(o => o.status === 'Đang xử lý');
  const shippingOrders = userOrders.filter(o => o.status === 'Đang giao hàng');
  const completedOrders = userOrders.filter(o => o.status === 'Đã giao hàng');

  const getStatusColor = (status) => {
    switch(status) {
      case 'Chờ xác nhận': return '#f39c12';
      case 'Đang xử lý': return '#3498db';
      case 'Đang giao hàng': return '#9b59b6';
      case 'Đã giao hàng': return '#27ae60';
      default: return '#7f8c8d';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Chờ xác nhận': return '⏳';
      case 'Đang xử lý': return '📦';
      case 'Đang giao hàng': return '🚚';
      case 'Đã giao hàng': return '✅';
      default: return '❓';
    }
  };

  return (
    <div className="account-container">
      {/* Header Tài khoản */}
      <div className="account-header">
        <div className="user-profile">
          <div className="avatar">👤</div>
          <div className="user-info-section">
            <h2>{user.username}</h2>
            <p>{user.email}</p>
          </div>
        </div>
        <button className="logout-btn" onClick={logout}>Đăng Xuất</button>
      </div>

      {/* Tab Navigation */}
      <div className="tab-navigation">
        <button 
          className={`tab-btn ${activeTab === 'orders' ? 'active' : ''}`}
          onClick={() => setActiveTab('orders')}
        >
          📋 Tất Cả Đơn Hàng ({userOrders.length})
        </button>
        <button 
          className={`tab-btn ${activeTab === 'pending' ? 'active' : ''}`}
          onClick={() => setActiveTab('pending')}
        >
          ⏳ Chờ Xác Nhận ({pendingOrders.length})
        </button>
        <button 
          className={`tab-btn ${activeTab === 'processing' ? 'active' : ''}`}
          onClick={() => setActiveTab('processing')}
        >
          📦 Đang Xử Lý ({processingOrders.length})
        </button>
        <button 
          className={`tab-btn ${activeTab === 'shipping' ? 'active' : ''}`}
          onClick={() => setActiveTab('shipping')}
        >
          🚚 Đang Giao ({shippingOrders.length})
        </button>
        <button 
          className={`tab-btn ${activeTab === 'completed' ? 'active' : ''}`}
          onClick={() => setActiveTab('completed')}
        >
          ✅ Đã Giao ({completedOrders.length})
        </button>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {activeTab === 'orders' && (
          <div className="orders-list">
            {userOrders.length === 0 ? (
              <p className="no-orders">Bạn chưa có đơn hàng nào</p>
            ) : (
              userOrders.map(order => (
                <div key={order.id} className="order-card">
                  <div className="order-header" onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}>
                    <div className="order-info-left">
                      <h3>Đơn hàng #{order.id}</h3>
                      <p className="order-date">{order.createdDate} - {order.createdTime}</p>
                    </div>
                    <div className="order-info-right">
                      <span className="status-badge" style={{ backgroundColor: getStatusColor(order.status) }}>
                        {getStatusIcon(order.status)} {order.status}
                      </span>
                      <span className="order-total">{order.totalPrice.toLocaleString('vi-VN')} đ</span>
                    </div>
                  </div>

                  {expandedOrder === order.id && (
                    <div className="order-details">
                      <div className="details-section">
                        <h4>Sản phẩm:</h4>
                        <div className="items-list">
                          {order.items.map(item => (
                            <div key={item.id} className="item-row">
                              <span className="item-name">{item.name}</span>
                              <span className="item-qty">x{item.quantity}</span>
                              <span className="item-price">{(item.price * item.quantity).toLocaleString('vi-VN')} đ</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {(order.deliveryAddress || order.phoneNumber) && (
                        <div className="details-section">
                          <h4>Thông tin giao hàng:</h4>
                          {order.deliveryAddress && <p><strong>Địa chỉ:</strong> {order.deliveryAddress}</p>}
                          {order.phoneNumber && <p><strong>Điện thoại:</strong> {order.phoneNumber}</p>}
                          {order.notes && <p><strong>Ghi chú:</strong> {order.notes}</p>}
                        </div>
                      )}

                      <div className="details-section total-section">
                        <p className="total-price">
                          <strong>Tổng cộng:</strong> 
                          <span>{order.totalPrice.toLocaleString('vi-VN')} đ</span>
                        </p>
                      </div>

                      <div className="order-actions">
                        {order.status === 'Chờ xác nhận' && (
                          <button 
                            className="action-btn cancel-btn"
                            onClick={() => deleteOrder(order.id)}
                          >
                            Hủy đơn
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'pending' && (
          <div className="orders-list">
            {pendingOrders.length === 0 ? (
              <p className="no-orders">Không có đơn hàng nào chờ xác nhận</p>
            ) : (
              pendingOrders.map(order => (
                <div key={order.id} className="order-card">
                  <div className="order-header" onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}>
                    <div className="order-info-left">
                      <h3>Đơn hàng #{order.id}</h3>
                      <p className="order-date">{order.createdDate}</p>
                    </div>
                    <div className="order-info-right">
                      <span className="status-badge" style={{ backgroundColor: getStatusColor(order.status) }}>
                        {getStatusIcon(order.status)} {order.status}
                      </span>
                      <span className="order-total">{order.totalPrice.toLocaleString('vi-VN')} đ</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'processing' && (
          <div className="orders-list">
            {processingOrders.length === 0 ? (
              <p className="no-orders">Không có đơn hàng nào đang xử lý</p>
            ) : (
              processingOrders.map(order => (
                <div key={order.id} className="order-card">
                  <div className="order-header">
                    <div className="order-info-left">
                      <h3>Đơn hàng #{order.id}</h3>
                      <p className="order-date">{order.createdDate}</p>
                    </div>
                    <div className="order-info-right">
                      <span className="status-badge" style={{ backgroundColor: getStatusColor(order.status) }}>
                        {getStatusIcon(order.status)} {order.status}
                      </span>
                      <span className="order-total">{order.totalPrice.toLocaleString('vi-VN')} đ</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'shipping' && (
          <div className="orders-list">
            {shippingOrders.length === 0 ? (
              <p className="no-orders">Không có đơn hàng nào đang giao</p>
            ) : (
              shippingOrders.map(order => (
                <div key={order.id} className="order-card">
                  <div className="order-header">
                    <div className="order-info-left">
                      <h3>Đơn hàng #{order.id}</h3>
                      <p className="order-date">{order.createdDate}</p>
                    </div>
                    <div className="order-info-right">
                      <span className="status-badge" style={{ backgroundColor: getStatusColor(order.status) }}>
                        {getStatusIcon(order.status)} {order.status}
                      </span>
                      <span className="order-total">{order.totalPrice.toLocaleString('vi-VN')} đ</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'completed' && (
          <div className="orders-list">
            {completedOrders.length === 0 ? (
              <p className="no-orders">Không có đơn hàng nào đã giao</p>
            ) : (
              completedOrders.map(order => (
                <div key={order.id} className="order-card">
                  <div className="order-header">
                    <div className="order-info-left">
                      <h3>Đơn hàng #{order.id}</h3>
                      <p className="order-date">{order.createdDate}</p>
                    </div>
                    <div className="order-info-right">
                      <span className="status-badge" style={{ backgroundColor: getStatusColor(order.status) }}>
                        {getStatusIcon(order.status)} {order.status}
                      </span>
                      <span className="order-total">{order.totalPrice.toLocaleString('vi-VN')} đ</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Account;
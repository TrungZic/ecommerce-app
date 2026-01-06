import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminContext } from '../context/AdminContext';
import { OrderContext } from '../context/OrderContext';

function AdminDashboard() {
  const { adminLoggedIn, adminUser, adminLogout, registeredUsers, refreshUsers } = useContext(AdminContext);
  const { orders, updateOrderStatus } = useContext(OrderContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  // Refresh registered users khi switch sang tab users
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === 'users') {
      refreshUsers();
    }
  };

  if (!adminLoggedIn) {
    return navigate('/AdminLogin');
  }

  // Tính toán thống kê
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, order) => sum + order.totalPrice, 0);
  const totalUsers = registeredUsers.length;
  const pendingOrders = orders.filter(o => o.status === 'Chờ xác nhận').length;
  const processingOrders = orders.filter(o => o.status === 'Đang xử lý').length;
  const shippingOrders = orders.filter(o => o.status === 'Đang giao hàng').length;
  const completedOrders = orders.filter(o => o.status === 'Đã giao hàng').length;

  const handleStatusChange = (orderId, newStatus) => {
    updateOrderStatus(orderId, newStatus);
  };

  return (
    <div className="admin-dashboard">
      {/* Admin Header */}
      <div className="admin-header">
        <div className="admin-title">
          <h1>📊 Admin Dashboard</h1>
          <p>Quản lý hệ thống cửa hàng online</p>
        </div>
        <div className="admin-user-info">
          <span>Xin chào, <strong>{adminUser.username}</strong></span>
          <button className="admin-logout-btn" onClick={() => {
            adminLogout();
            navigate('/AdminLogin');
          }}>Đăng Xuất</button>
        </div>
      </div>

      {/* Admin Navigation */}
      <div className="admin-nav">
        <button 
          className={`admin-nav-btn ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => handleTabChange('overview')}
        >
          📈 Tổng Quan
        </button>
        <button 
          className={`admin-nav-btn ${activeTab === 'products' ? 'active' : ''}`}
          onClick={() => handleTabChange('products')}
        >
          📦 Quản Lý Sản Phẩm
        </button>
        <button 
          className={`admin-nav-btn ${activeTab === 'orders' ? 'active' : ''}`}
          onClick={() => handleTabChange('orders')}
        >
          🎁 Quản Lý Đơn Hàng
        </button>
        <button 
          className={`admin-nav-btn ${activeTab === 'users' ? 'active' : ''}`}
          onClick={() => handleTabChange('users')}
        >
          👥 Quản Lý Người Dùng
        </button>
      </div>

      {/* Admin Content */}
      <div className="admin-content">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="overview-section">
            <h2>Tổng Quan Hệ Thống</h2>
            
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon">📦</div>
                <div className="stat-info">
                  <h3>Tổng Đơn Hàng</h3>
                  <p className="stat-number">{totalOrders}</p>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon">💰</div>
                <div className="stat-info">
                  <h3>Tổng Doanh Thu</h3>
                  <p className="stat-number">{totalRevenue.toLocaleString('vi-VN')} đ</p>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon">👥</div>
                <div className="stat-info">
                  <h3>Tổng Người Dùng</h3>
                  <p className="stat-number">{totalUsers}</p>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon">⏳</div>
                <div className="stat-info">
                  <h3>Đang Chờ Xác Nhận</h3>
                  <p className="stat-number">{pendingOrders}</p>
                </div>
              </div>
            </div>

            <div className="order-status-overview">
              <h3>Trạng Thái Đơn Hàng</h3>
              <div className="status-bars">
                <div className="status-bar">
                  <span className="status-label">⏳ Chờ xác nhận:</span>
                  <div className="bar-container">
                    <div className="bar pending" style={{ width: `${(pendingOrders / totalOrders * 100) || 0}%` }}></div>
                  </div>
                  <span className="status-count">{pendingOrders}</span>
                </div>

                <div className="status-bar">
                  <span className="status-label">📦 Đang xử lý:</span>
                  <div className="bar-container">
                    <div className="bar processing" style={{ width: `${(processingOrders / totalOrders * 100) || 0}%` }}></div>
                  </div>
                  <span className="status-count">{processingOrders}</span>
                </div>

                <div className="status-bar">
                  <span className="status-label">🚚 Đang giao:</span>
                  <div className="bar-container">
                    <div className="bar shipping" style={{ width: `${(shippingOrders / totalOrders * 100) || 0}%` }}></div>
                  </div>
                  <span className="status-count">{shippingOrders}</span>
                </div>

                <div className="status-bar">
                  <span className="status-label">✅ Đã giao:</span>
                  <div className="bar-container">
                    <div className="bar completed" style={{ width: `${(completedOrders / totalOrders * 100) || 0}%` }}></div>
                  </div>
                  <span className="status-count">{completedOrders}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div className="products-management">
            <div className="products-header">
              <h2>Quản Lý Sản Phẩm</h2>
              <p className="products-count">Tổng cộng: <strong>{0}</strong> sản phẩm</p>
            </div>
            <p className="no-data">📌 Chức năng quản lý sản phẩm sẽ được cập nhật sớm</p>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div className="orders-management">
            <h2>Quản Lý Đơn Hàng</h2>
            
            {orders.length === 0 ? (
              <p className="no-data">Không có đơn hàng nào</p>
            ) : (
              <div className="orders-table-container">
                <table className="orders-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Người Dùng</th>
                      <th>Tổng Tiền</th>
                      <th>Ngày Tạo</th>
                      <th>Trạng Thái</th>
                      <th>Hành Động</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map(order => (
                      <tr key={order.id}>
                        <td>#{order.id}</td>
                        <td>{order.userName}</td>
                        <td>{order.totalPrice.toLocaleString('vi-VN')} đ</td>
                        <td>{order.createdDate}</td>
                        <td>
                          <select 
                            className="status-select"
                            value={order.status}
                            onChange={(e) => handleStatusChange(order.id, e.target.value)}
                          >
                            <option value="Chờ xác nhận">⏳ Chờ xác nhận</option>
                            <option value="Đang xử lý">📦 Đang xử lý</option>
                            <option value="Đang giao hàng">🚚 Đang giao hàng</option>
                            <option value="Đã giao hàng">✅ Đã giao hàng</option>
                          </select>
                        </td>
                        <td>
                          <button className="view-btn">Xem Chi Tiết</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="users-management">
            <h2>Quản Lý Người Dùng</h2>
            
            {registeredUsers.length === 0 ? (
              <p className="no-data">Không có người dùng nào</p>
            ) : (
              <div className="users-table-container">
                <table className="users-table">
                  <thead>
                    <tr>
                      <th>STT</th>
                      <th>Tên Đăng Nhập</th>
                      <th>Email</th>
                      <th>Số Đơn Hàng</th>
                      <th>Tổng Chi Tiêu</th>
                    </tr>
                  </thead>
                  <tbody>
                    {registeredUsers.map((user, index) => {
                      const userOrders = orders.filter(o => o.userName === user.username);
                      const userSpent = userOrders.reduce((sum, o) => sum + o.totalPrice, 0);
                      
                      return (
                        <tr key={user.username}>
                          <td>{index + 1}</td>
                          <td>{user.username}</td>
                          <td>{user.email}</td>
                          <td>{userOrders.length}</td>
                          <td>{userSpent.toLocaleString('vi-VN')} đ</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
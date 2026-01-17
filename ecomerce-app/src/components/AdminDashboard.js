import React, { useContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import { adminService } from '../services/adminService';
import { productService } from '../services/productService';
import { orderService } from '../services/orderService';
import { StatsCard, ProductForm, ProductTable, OrderTable, UserTable } from './AdminDashboardComponents';
import { LoadingSpinner } from './shared';
import '../css/AdminDashboard.css';

function AdminDashboard() {
  const { user, isLoggedIn } = useContext(AuthContext);
  const { success, error: showError } = useNotification();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(false);

  // Stats
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [usersRaw, setUsersRaw] = useState(null);
  const [ordersRaw, setOrdersRaw] = useState(null);
  const [showUsersRaw, setShowUsersRaw] = useState(false);
  const [showOrdersRaw, setShowOrdersRaw] = useState(false);
  const [showProductForm, setShowProductForm] = useState(false);

  // Check admin access
  useEffect(() => {
    if (!isLoggedIn || user?.role !== 'admin') {
      navigate('/admin');
    }
  }, [isLoggedIn, user, navigate]);

  const loadDashboardStats = useCallback(async () => {
    try {
      setLoading(true);
      const response = await adminService.getDashboardStats();
      if (response.success) {
        setStats(response.stats);
      }
    } catch (err) {
      showError(err.message || 'Lỗi tải thống kê');
    } finally {
      setLoading(false);
    }
  }, [showError]);

  const loadUsers = useCallback(async () => {
    try {
      setLoading(true);
      const response = await adminService.getAllUsers();
      setUsersRaw(response);
      if (response && response.success) {
        setUsers(response.users || []);
      } else {
        setUsers([]);
      }
    } catch (err) {
      showError(err.message || 'Lỗi tải người dùng');
    } finally {
      setLoading(false);
    }
  }, [showError]);

  const loadProducts = useCallback(async () => {
    try {
      setLoading(true);
      const response = await productService.getAllProducts(1, 100);
      if (response.success) {
        setProducts(response.products);
      }
    } catch (err) {
      showError(err.message || 'Lỗi tải sản phẩm');
    } finally {
      setLoading(false);
    }
  }, [showError]);

  const loadOrders = useCallback(async () => {
    try {
      setLoading(true);
      const response = await orderService.getAllOrders();
      setOrdersRaw(response);
      if (response && response.success) {
        setOrders(response.orders || []);
      } else {
        setOrders([]);
      }
    } catch (err) {
      showError(err.message || 'Lỗi tải đơn hàng');
    } finally {
      setLoading(false);
    }
  }, [showError]);

  // Load data based on active tab
  useEffect(() => {
    switch(activeTab) {
      case 'overview':
        loadDashboardStats();
        break;
      case 'products':
        loadProducts();
        break;
      case 'orders':
        loadOrders();
        break;
      case 'users':
        loadUsers();
        break;
      default:
        break;
    }
  }, [activeTab, loadDashboardStats, loadProducts, loadOrders, loadUsers]);

  // Product handlers with memoization
  const handleAddProduct = useCallback(async (formData) => {
    try {
      setLoading(true);
      const response = await productService.createProduct(formData);
      if (response.success) {
        success('Thêm sản phẩm thành công!');
        setShowProductForm(false);
        await loadProducts();
      }
    } catch (err) {
      showError(err.message || 'Lỗi thêm sản phẩm');
    } finally {
      setLoading(false);
    }
  }, [success, showError, loadProducts]);

  const handleDeleteProduct = useCallback(async (productId) => {
    if (!window.confirm('Xác nhận xóa sản phẩm?')) return;
    
    try {
      setLoading(true);
      await productService.deleteProduct(productId);
      success('Xóa sản phẩm thành công!');
      await loadProducts();
    } catch (err) {
      showError(err.message || 'Lỗi xóa sản phẩm');
    } finally {
      setLoading(false);
    }
  }, [success, showError, loadProducts]);

  const handleDeleteUser = useCallback(async (userId) => {
    if (!window.confirm('Xác nhận xóa người dùng?')) return;
    
    try {
      setLoading(true);
      await adminService.deleteUser(userId);
      success('Xóa người dùng thành công!');
      await loadUsers();
    } catch (err) {
      showError(err.message || 'Lỗi xóa người dùng');
    } finally {
      setLoading(false);
    }
  }, [success, showError, loadUsers]);

  const handleUpdateOrderStatus = useCallback(async (orderId, newStatus) => {
    try {
      setLoading(true);
      await orderService.updateOrderStatus(orderId, newStatus);
      success('Cập nhật trạng thái thành công!');
      await loadOrders();
    } catch (err) {
      showError(err.message || 'Lỗi cập nhật trạng thái');
    } finally {
      setLoading(false);
    }
  }, [success, showError, loadOrders]);

  const handleUpdateUserRole = useCallback(async (userId, newRole) => {
    try {
      setLoading(true);
      await adminService.updateUserRole(userId, newRole);
      success('Cập nhật vai trò thành công!');
      await loadUsers();
    } catch (err) {
      showError(err.message || 'Lỗi cập nhật vai trò');
    } finally {
      setLoading(false);
    }
  }, [success, showError, loadUsers]);

  if (!user || user.role !== 'admin') {
    return null;
  }

  return (
    <div className="admin-dashboard">
      {/* Admin Header */}
      <div className="admin-header">
        <div className="admin-title">
          <h1>📊 Admin Dashboard</h1>
          <p>Quản lý hệ thống cửa hàng online</p>
        </div>
        <div className="admin-user-info">
          <span>Xin chào, <strong>{user.username}</strong></span>
        </div>
      </div>

      {/* Admin Navigation */}
      <div className="admin-nav">
        <button 
          className={`admin-nav-btn ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          📈 Tổng Quan
        </button>
        <button 
          className={`admin-nav-btn ${activeTab === 'products' ? 'active' : ''}`}
          onClick={() => setActiveTab('products')}
        >
          📦 Sản Phẩm
        </button>
        <button 
          className={`admin-nav-btn ${activeTab === 'orders' ? 'active' : ''}`}
          onClick={() => setActiveTab('orders')}
        >
          🎁 Đơn Hàng
        </button>
        <button 
          className={`admin-nav-btn ${activeTab === 'users' ? 'active' : ''}`}
          onClick={() => setActiveTab('users')}
        >
          👥 Người Dùng
        </button>
      </div>

      {/* Admin Content */}
      <div className="admin-content">
        {loading && activeTab === 'overview' && <LoadingSpinner size="large" />}

        {/* Overview Tab */}
        {activeTab === 'overview' && stats && (
          <div className="overview-section">
            <h2>Tổng Quan Hệ Thống</h2>
            
            <div className="stats-grid">
              <StatsCard title="Tổng Đơn Hàng" value={stats.totalOrders} icon="📦" color="#667eea" />
              <StatsCard title="Tổng Doanh Thu" value={`${stats.totalRevenue.toLocaleString('vi-VN')} đ`} icon="💰" color="#10b981" />
              <StatsCard title="Tổng Người Dùng" value={stats.totalUsers} icon="👥" color="#f59e0b" />
              <StatsCard title="Tổng Sản Phẩm" value={stats.totalProducts} icon="📦" color="#8b5cf6" />
            </div>

            <div className="order-status-overview">
              <h3>Trạng Thái Đơn Hàng</h3>
              <div className="status-items">
                {Object.entries(stats.ordersByStatus || {}).map(([status, count]) => (
                  <div key={status} className="status-item">
                    <span>{status}: <strong>{count}</strong></span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div className="products-management">
            <div className="products-header">
              <h2>Quản Lý Sản Phẩm ({products.length})</h2>
              <button 
                className="btn-add"
                onClick={() => setShowProductForm(!showProductForm)}
              >
                {showProductForm ? '✕ Hủy' : '+ Thêm'}
              </button>
            </div>

            {showProductForm && (
              <ProductForm
                onSubmit={handleAddProduct}
                onCancel={() => setShowProductForm(false)}
                loading={loading}
              />
            )}

            <ProductTable
              products={products}
              onEdit={() => {}}
              onDelete={handleDeleteProduct}
              loading={loading}
            />
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div className="orders-management">
            <h2>Quản Lý Đơn Hàng ({orders.length})</h2>
            <div className="debug-controls">
              <button className="btn-debug" onClick={() => setShowOrdersRaw(v => !v)}>
                {showOrdersRaw ? 'Ẩn raw orders' : 'Hiện raw orders'}
              </button>
            </div>
            <OrderTable
              orders={orders}
              onStatusChange={handleUpdateOrderStatus}
              loading={loading}
            />
            {showOrdersRaw && (
              <pre className="raw-json">{JSON.stringify(ordersRaw, null, 2)}</pre>
            )}
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="users-management">
            <h2>Quản Lý Người Dùng ({users.length})</h2>
            <div className="debug-controls">
              <button className="btn-debug" onClick={() => setShowUsersRaw(v => !v)}>
                {showUsersRaw ? 'Ẩn raw users' : 'Hiện raw users'}
              </button>
            </div>
            <UserTable
              users={users}
              onRoleChange={handleUpdateUserRole}
              onDelete={handleDeleteUser}
              loading={loading}
            />
            {showUsersRaw && (
              <pre className="raw-json">{JSON.stringify(usersRaw, null, 2)}</pre>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;


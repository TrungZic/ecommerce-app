// Dashboard tab components - memoized for performance
import React, { memo, useCallback } from 'react';
import { LoadingSpinner, Button } from './shared';

export const StatsCard = memo(({ title, value, icon, color = '#667eea' }) => (
  <div className="stat-card" style={{ borderTopColor: color }}>
    <div className="stat-icon" style={{ backgroundColor: color }}>
      {icon}
    </div>
    <div className="stat-content">
      <p className="stat-title">{title}</p>
      <h3 className="stat-value">{value}</h3>
    </div>
  </div>
));

StatsCard.displayName = 'StatsCard';

export const ProductForm = memo(({ product, onSubmit, onCancel, loading }) => {
  const [formData, setFormData] = React.useState(product || {
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
  });

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'stock' ? parseFloat(value) || '' : value
    }));
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    onSubmit(formData);
  }, [formData, onSubmit]);

  return (
    <form onSubmit={handleSubmit} className="product-form">
      <div className="form-group">
        <label>Tên sản phẩm</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          disabled={loading}
          required
        />
      </div>

      <div className="form-group">
        <label>Mô tả</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          disabled={loading}
          required
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Giá</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            disabled={loading}
            required
          />
        </div>
        <div className="form-group">
          <label>Danh mục</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            disabled={loading}
            required
          />
        </div>
        <div className="form-group">
          <label>Kho hàng</label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            disabled={loading}
            required
          />
        </div>
      </div>

      <div className="form-actions">
        <Button type="submit" disabled={loading}>
          {loading ? <LoadingSpinner size="small" /> : 'Lưu'}
        </Button>
        <Button type="button" variant="secondary" onClick={onCancel} disabled={loading}>
          Hủy
        </Button>
      </div>
    </form>
  );
});

ProductForm.displayName = 'ProductForm';

export const ProductTable = memo(({ products, onEdit, onDelete, loading }) => {
  if (!products.length) {
    return <p className="empty-table">Không có sản phẩm nào</p>;
  }

  return (
    <div className="table-responsive">
      <table className="products-table">
        <thead>
          <tr>
            <th>Sản phẩm</th>
            <th>Giá</th>
            <th>Kho hàng</th>
            <th>Danh mục</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <ProductRow
              key={product._id}
              product={product}
              onEdit={onEdit}
              onDelete={onDelete}
              disabled={loading}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
});

ProductTable.displayName = 'ProductTable';

const ProductRow = memo(({ product, onEdit, onDelete, disabled }) => (
  <tr>
    <td>{product.name}</td>
    <td>${product.price}</td>
    <td>{product.stock}</td>
    <td>{product.category}</td>
    <td className="action-buttons">
      <Button
        size="small"
        variant="primary"
        onClick={() => onEdit(product)}
        disabled={disabled}
      >
        Sửa
      </Button>
      <Button
        size="small"
        variant="danger"
        onClick={() => onDelete(product._id)}
        disabled={disabled}
      >
        Xóa
      </Button>
    </td>
  </tr>
));

ProductRow.displayName = 'ProductRow';

export const OrderTable = memo(({ orders, onStatusChange, loading }) => {
  if (!orders.length) {
    return <p className="empty-table">Không có đơn hàng nào</p>;
  }

  return (
    <div className="table-responsive">
      <table className="orders-table">
        <thead>
          <tr>
            <th>Mã đơn hàng</th>
            <th>Khách hàng</th>
            <th>Giá trị</th>
            <th>Trạng thái</th>
            <th>Ngày đặt</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <OrderRow
              key={order._id}
              order={order}
              onStatusChange={onStatusChange}
              disabled={loading}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
});

OrderTable.displayName = 'OrderTable';

const OrderRow = memo(({ order, onStatusChange, disabled }) => {
  const statusOptions = ['Chờ xác nhận', 'Đã xác nhận', 'Đang giao', 'Đã giao', 'Hủy'];
  
  const handleStatusChange = useCallback((e) => {
    onStatusChange(order._id, e.target.value);
  }, [order._id, onStatusChange]);

  return (
    <tr>
      <td>#{order._id?.slice(-6)}</td>
      <td>{order.userName}</td>
      <td>${order.totalPrice}</td>
      <td>
        <select
          value={order.status}
          onChange={handleStatusChange}
          disabled={disabled}
          className="status-select"
        >
          {statusOptions.map(status => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
      </td>
      <td>{new Date(order.createdAt).toLocaleDateString('vi-VN')}</td>
    </tr>
  );
});

OrderRow.displayName = 'OrderRow';

export const UserTable = memo(({ users, onRoleChange, onDelete, loading }) => {
  if (!users.length) {
    return <p className="empty-table">Không có người dùng nào</p>;
  }

  return (
    <div className="table-responsive">
      <table className="users-table">
        <thead>
          <tr>
            <th>Tên</th>
            <th>Email</th>
            <th>Vai trò</th>
            <th>Đơn hàng</th>
            <th>Tổng chi tiêu</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <UserRow
              key={user._id}
              user={user}
              onRoleChange={onRoleChange}
              onDelete={onDelete}
              disabled={loading}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
});

UserTable.displayName = 'UserTable';

const UserRow = memo(({ user, onRoleChange, onDelete, disabled }) => {
  const handleRoleChange = useCallback((e) => {
    onRoleChange(user._id, e.target.value);
  }, [user._id, onRoleChange]);

  const handleDelete = useCallback(() => {
    if (window.confirm(`Xác nhận xóa người dùng ${user.fullName}?`)) {
      onDelete(user._id);
    }
  }, [user._id, user.fullName, onDelete]);

  return (
    <tr>
      <td>{user.fullName}</td>
      <td>{user.email}</td>
      <td>
        <select
          value={user.role}
          onChange={handleRoleChange}
          disabled={disabled}
          className="role-select"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      </td>
      <td>{user.orderCount || 0}</td>
      <td>${user.totalSpent || 0}</td>
      <td>
        <Button
          size="small"
          variant="danger"
          onClick={handleDelete}
          disabled={disabled}
        >
          Xóa
        </Button>
      </td>
    </tr>
  );
});

UserRow.displayName = 'UserRow';

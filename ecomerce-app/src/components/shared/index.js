import React from 'react';

/**
 * Loading Spinner Component
 */
export const LoadingSpinner = ({ size = 'medium' }) => {
  const sizeClass = {
    small: 'spinner-small',
    medium: 'spinner-medium',
    large: 'spinner-large',
  }[size];

  return (
    <div className={`loading-spinner ${sizeClass}`}>
      <div className="spinner"></div>
    </div>
  );
};

/**
 * Toast Notification Component
 */
export const Toast = ({ message, type = 'success', onClose }) => {
  React.useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const typeClass = {
    success: 'toast-success',
    error: 'toast-error',
    warning: 'toast-warning',
    info: 'toast-info',
  }[type];

  return (
    <div className={`toast ${typeClass}`}>
      <span>{message}</span>
      <button className="toast-close" onClick={onClose}>×</button>
    </div>
  );
};

/**
 * Button Component
 */
export const Button = React.memo(({
  children,
  variant = 'primary',
  size = 'medium',
  loading = false,
  disabled = false,
  onClick,
  className = '',
  ...props
}) => {
  const variantClass = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    danger: 'btn-danger',
    success: 'btn-success',
    info: 'btn-info',
  }[variant];

  const sizeClass = {
    small: 'btn-small',
    medium: 'btn-medium',
    large: 'btn-large',
  }[size];

  return (
    <button
      className={`btn ${variantClass} ${sizeClass} ${className}`}
      onClick={onClick}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? <span className="btn-loading">⏳</span> : children}
    </button>
  );
});

Button.displayName = 'Button';

/**
 * Modal Component
 */
export const Modal = React.memo(({ isOpen, onClose, title, children, footer }) => {
  if (!isOpen) return null;

  return (
    <>
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="modal">
        <div className="modal-header">
          <h3>{title}</h3>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">
          {children}
        </div>
        {footer && <div className="modal-footer">{footer}</div>}
      </div>
    </>
  );
});

Modal.displayName = 'Modal';

/**
 * Alert Component
 */
export const Alert = React.memo(({ type = 'info', message, onClose }) => {
  const typeClass = {
    success: 'alert-success',
    error: 'alert-error',
    warning: 'alert-warning',
    info: 'alert-info',
  }[type];

  return (
    <div className={`alert ${typeClass}`}>
      <span>{message}</span>
      {onClose && <button className="alert-close" onClick={onClose}>×</button>}
    </div>
  );
});

Alert.displayName = 'Alert';

/**
 * Empty State Component
 */
export const EmptyState = React.memo(({ icon = '📭', title, description, action }) => {
  return (
    <div className="empty-state">
      <div className="empty-state-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{description}</p>
      {action && <div className="empty-state-action">{action}</div>}
    </div>
  );
});

EmptyState.displayName = 'EmptyState';

/**
 * Skeleton Loader Component
 */
export const SkeletonLoader = ({ count = 1, height = 20 }) => {
  return (
    <div className="skeleton-loader">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="skeleton-item" style={{ height: `${height}px` }}></div>
      ))}
    </div>
  );
};

/**
 * Badge Component
 */
export const Badge = React.memo(({ children, variant = 'primary', className = '' }) => {
  return (
    <span className={`badge badge-${variant} ${className}`}>
      {children}
    </span>
  );
});

Badge.displayName = 'Badge';

/**
 * Pagination Component
 */
export const Pagination = React.memo(({ 
  currentPage, 
  totalPages, 
  onPageChange 
}) => {
  return (
    <div className="pagination">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        ← Trước
      </button>
      <span>Trang {currentPage} / {totalPages}</span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Sau →
      </button>
    </div>
  );
});

Pagination.displayName = 'Pagination';

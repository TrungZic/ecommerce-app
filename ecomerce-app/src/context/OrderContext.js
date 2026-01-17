import React, { createContext, useState } from 'react';

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);

  // Tạo đơn hàng mới từ giỏ hàng
  const createOrder = (cartItems, totalPrice, userName) => {
    if (cartItems.length === 0) {
      return { success: false, message: 'Giỏ hàng trống!' };
    }

    const newOrder = {
      id: Date.now(),
      userName: userName,
      items: cartItems,
      totalPrice: totalPrice,
      status: 'Chờ xác nhận',
      createdDate: new Date().toLocaleDateString('vi-VN'),
      createdTime: new Date().toLocaleTimeString('vi-VN'),
      deliveryAddress: '',
      phoneNumber: '',
      notes: '',
    };

    setOrders([...orders, newOrder]);
    return { success: true, message: 'Đơn hàng được tạo thành công!', order: newOrder };
  };

  // Cập nhật thông tin giao hàng
  const updateOrderInfo = (orderId, address, phone, notes) => {
    setOrders(orders.map(order =>
      order.id === orderId
        ? { ...order, deliveryAddress: address, phoneNumber: phone, notes: notes }
        : order
    ));
  };

  // Cập nhật trạng thái đơn hàng
  const updateOrderStatus = (orderId, status) => {
    setOrders(orders.map(order =>
      order.id === orderId ? { ...order, status: status } : order
    ));
  };

  // Lấy đơn hàng của người dùng
  const getUserOrders = (userName) => {
    return orders.filter(order => order.userName === userName);
  };

  // Xóa đơn hàng
  const deleteOrder = (orderId) => {
    setOrders(orders.filter(order => order.id !== orderId));
  };

  return (
    <OrderContext.Provider 
      value={{ 
        orders, 
        createOrder, 
        updateOrderInfo, 
        updateOrderStatus,
        getUserOrders,
        deleteOrder
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};
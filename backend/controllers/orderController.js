const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Product = require('../models/Product');

// Tạo đơn hàng
exports.createOrder = async (req, res) => {
  try {
    const { items, totalPrice, deliveryAddress, phoneNumber, notes, paymentMethod } = req.body;

    if (!items || !deliveryAddress || !phoneNumber) {
      return res.status(400).json({ success: false, message: 'Vui lòng điền đầy đủ thông tin' });
    }

    // Kiểm tra stock
    for (let item of items) {
      const product = await Product.findById(item.productId);
      if (!product || product.stock < item.quantity) {
        return res.status(400).json({ success: false, message: `Sản phẩm ${item.productName} không đủ hàng` });
      }
    }

    const order = await Order.create({
      userId: req.user.id,
      userName: req.user.username,
      items,
      totalPrice,
      deliveryAddress,
      phoneNumber,
      notes,
      paymentMethod: paymentMethod || 'cash',
    });

    // Cập nhật stock
    for (let item of items) {
      await Product.findByIdAndUpdate(
        item.productId,
        { $inc: { stock: -item.quantity } },
        { new: true }
      );
    }

    // Xóa giỏ hàng
    await Cart.findOneAndDelete({ userId: req.user.id });

    res.status(201).json({
      success: true,
      message: 'Tạo đơn hàng thành công!',
      order,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Lấy đơn hàng của user
exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id }).populate('items.productId');

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Lấy tất cả đơn hàng (admin)
exports.getAllOrders = async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    const filter = status ? { status } : {};

    const orders = await Order.find(filter)
      .populate('userId', 'username email fullName phoneNumber address city')
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Order.countDocuments(filter);

    res.status(200).json({
      success: true,
      orders,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Lấy chi tiết đơn hàng
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('items.productId');

    if (!order) {
      return res.status(404).json({ success: false, message: 'Đơn hàng không tồn tại' });
    }

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Cập nhật trạng thái đơn hàng (admin)
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!order) {
      return res.status(404).json({ success: false, message: 'Đơn hàng không tồn tại' });
    }

    res.status(200).json({
      success: true,
      message: 'Cập nhật trạng thái đơn hàng thành công!',
      order,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Hủy đơn hàng
exports.cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ success: false, message: 'Đơn hàng không tồn tại' });
    }

    if (order.userId.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Bạn không có quyền hủy đơn hàng này' });
    }

    // Hoàn trả stock
    for (let item of order.items) {
      await Product.findByIdAndUpdate(
        item.productId,
        { $inc: { stock: item.quantity } },
        { new: true }
      );
    }

    order.status = 'Hủy';
    await order.save();

    res.status(200).json({
      success: true,
      message: 'Hủy đơn hàng thành công!',
      order,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

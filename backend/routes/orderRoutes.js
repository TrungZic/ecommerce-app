const express = require('express');
const {
  createOrder,
  getUserOrders,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  cancelOrder,
} = require('../controllers/orderController');
const { auth, adminAuth } = require('../middleware/auth');

const router = express.Router();

router.post('/', auth, createOrder);
router.get('/my-orders', auth, getUserOrders);
router.get('/all-orders', auth, adminAuth, getAllOrders);
router.get('/:id', auth, getOrderById);
router.put('/:id/status', auth, adminAuth, updateOrderStatus);
router.put('/:id/cancel', auth, cancelOrder);

module.exports = router;

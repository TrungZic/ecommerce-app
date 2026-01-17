const express = require('express');
const {
  getCart,
  addToCart,
  updateCartQuantity,
  removeFromCart,
  clearCart,
} = require('../controllers/cartController');
const { auth } = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, getCart);
router.post('/add', auth, addToCart);
router.put('/update', auth, updateCartQuantity);
router.delete('/remove', auth, removeFromCart);
router.delete('/clear', auth, clearCart);

module.exports = router;

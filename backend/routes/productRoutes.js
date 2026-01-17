const express = require('express');
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProducts,
} = require('../controllers/productController');
const { auth, adminAuth } = require('../middleware/auth');

const router = express.Router();

router.get('/search', searchProducts);
router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.post('/', auth, adminAuth, createProduct);
router.put('/:id', auth, adminAuth, updateProduct);
router.delete('/:id', auth, adminAuth, deleteProduct);

module.exports = router;

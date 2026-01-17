const express = require('express');
const {
  getDashboardStats,
  getAllUsers,
  deleteUser,
  updateUserRole,
} = require('../controllers/adminController');
const { auth, adminAuth } = require('../middleware/auth');

const router = express.Router();

// Tất cả routes admin cần xác thực và admin role
router.use(auth, adminAuth);

router.get('/stats', getDashboardStats);
router.get('/users', getAllUsers);
router.delete('/users/:id', deleteUser);
router.put('/users/:id/role', updateUserRole);

module.exports = router;

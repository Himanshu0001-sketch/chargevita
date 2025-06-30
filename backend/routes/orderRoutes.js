// backend/routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const {
  createOrder,
  getMyOrders,
  updateOrderStatus,
  deleteOrder,
} = require('../controllers/orderController');
const { protect, isAdmin } = require('../middleware/authMiddleware');

// User: create a new order (requires authentication)
router.post('/', protect, createOrder);

// User: fetch logged-in user's orders
router.get('/my-orders', protect, getMyOrders);

// Admin: fetch all orders
router.get('/admin', protect, isAdmin, async (req, res) => {
  try {
    const orders = await require('../models/Order').find();
    res.json(orders);
  } catch (err) {
    console.error('Error fetching all orders:', err);
    res.status(500).json({ message: 'Failed to fetch orders' });
  }
});

// Admin: update an order's payment status
router.post('/update-status', protect, isAdmin, updateOrderStatus);

// Admin: delete an order by ID
router.delete('/:id', protect, isAdmin, deleteOrder);

module.exports = router;

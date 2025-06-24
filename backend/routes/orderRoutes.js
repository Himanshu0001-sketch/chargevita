// backend/routes/orderRoutes.js
const express = require('express');
const router  = express.Router();
const Order   = require('../models/Order');
const {
  createOrder,
  getMyOrders,
  updateOrderStatus,
  deleteOrder,
} = require('../controllers/orderController');
const { isAdmin, protect } = require('../middleware/authMiddleware');

// User: create a new order (requires authentication)
router.post('/', protect, createOrder);

// User: fetch logged-in user's orders
router.get('/my-orders', protect, getMyOrders);

// Admin: fetch all orders
router.get('/admin', isAdmin, async (req, res) => {
  try {
    const orders = await Order.find().populate('products.product');
    res.json(orders);
  } catch (err) {
    console.error('Error fetching all orders:', err);
    res.status(500).json({ message: 'Failed to fetch orders' });
  }
});

// Admin: update an order's payment status
router.post('/update-status', isAdmin, updateOrderStatus);

// Admin: delete an order by ID
router.delete('/:id', isAdmin, deleteOrder);

module.exports = router;

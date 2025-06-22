const express = require('express');
const router = express.Router();
const {
  createOrder,
  updateOrderStatus,
  deleteOrder,
} = require('../controllers/orderController');
const { isAdmin } = require('../middleware/authMiddleware');
const Order = require("../models/Order");

router.post('/', createOrder);

router.get("/admin", isAdmin, async (req, res) => {
  try {
    const orders = await Order.find().populate("products.product");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch orders" });
  }
});

router.post('/update-status', isAdmin, updateOrderStatus);
router.delete('/:id', isAdmin, deleteOrder);

module.exports = router;

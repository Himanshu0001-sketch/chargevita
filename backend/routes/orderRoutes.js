const express = require("express");
const router = express.Router();
const { createOrder, getAllOrders,updateOrderStatus, deleteOrder } = require("../controllers/orderController");
const { isAdmin } = require("../middleware/authMiddleware");

// Public: create order
//   POST /api/orders
router.post("/", createOrder);

// Admin only: view all orders (expects { username, password } in body)
//   POST /api/orders/admin
router.post("/admin", isAdmin, getAllOrders);
router.post("/update-status", updateOrderStatus);
router.delete("/:id", deleteOrder);

module.exports = router;

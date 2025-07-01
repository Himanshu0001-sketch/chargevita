// backend/routes/orderRoutes.js
const express = require("express");
const router  = express.Router();
const {
  createOrder,
  getAllOrders
} = require("../controllers/orderController");

// Place a new order (guest checkout)
router.post("/", createOrder);



module.exports = router;

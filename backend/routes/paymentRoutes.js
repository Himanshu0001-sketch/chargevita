// backend/routes/paymentRoutes.js
const express = require('express');
const router = express.Router();
const { createPayment, paymentCallback } = require('../controllers/paymentController');

// POST /api/payment/create → create Razorpay order
router.post('/create', createPayment);

// GET /api/payment/callback → handle Razorpay callback
router.get('/callback', paymentCallback);

module.exports = router;

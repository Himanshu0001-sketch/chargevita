// backend/controllers/paymentController.js
const Razorpay = require('razorpay');
const Order = require('../models/Order');

const { RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET } = process.env;

const razorpay = new Razorpay({
  key_id: RAZORPAY_KEY_ID,
  key_secret: RAZORPAY_KEY_SECRET,
});

const createPayment = async (req, res) => {
  try {
    const { products, totalAmount, address } = req.body; // Get address from the request body

    // Create an order with the address
    const newOrder = new Order({
      products,
      totalAmount,
      paymentStatus: 'Pending',
      address, // Save address details
    });

    const savedOrder = await newOrder.save();

    const merchantTransactionId = savedOrder._id.toString();
    const callbackUrl = `${req.protocol}://${req.get('host')}/api/payment/callback`;

    const orderData = {
      amount: totalAmount * 100, // Convert ₹ to paise
      currency: 'INR',
      receipt: merchantTransactionId, 
      payment_capture: 1,
    };

    let razorpayOrder;
    try {
      razorpayOrder = await razorpay.orders.create(orderData);
    } catch (razorpayError) {
      console.error('❌ Razorpay error:', razorpayError);
      return res.status(500).json({ message: 'Razorpay order creation failed', details: razorpayError.message });
    }

    if (!razorpayOrder || !razorpayOrder.id) {
      return res.status(500).json({ message: 'Failed to create order with Razorpay' });
    }

    const paymentUrl = `https://checkout.razorpay.com/v1/checkout/embedded?order_id=${razorpayOrder.id}`;
    
    return res.json({
      orderId: savedOrder._id,
      paymentUrl,
      razorpayOrderId: razorpayOrder.id,
    });
  } catch (err) {
    console.error('❌ Unexpected error:', err);
    return res.status(500).json({ message: 'Payment creation error', details: err.message });
  }
};

const paymentCallback = async (req, res) => {
  const { merchantTransactionId, status } = req.query;
  try {
    const order = await Order.findById(merchantTransactionId);
    if (!order) {
      return res.status(404).send('Order not found');
    }

    order.paymentStatus = status === 'SUCCESS' ? 'Paid' : 'Failed';
    await order.save();

    return res.redirect(`http://localhost:5173/payment-result?status=${status}`);
  } catch (err) {
    console.error('❌ Error processing callback:', err);
    return res.status(500).send('Callback processing failed');
  }
};

module.exports = { createPayment, paymentCallback };

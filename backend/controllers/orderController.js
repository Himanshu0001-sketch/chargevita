// controllers/orderController.js
const Order = require("../models/Order");
const nodemailer = require("nodemailer");

exports.createOrder = async (req, res) => {
  try {
    const userId = req.user._id;
    const { products, totalAmount, address } = req.body;

    // validate payload
    if (
      !Array.isArray(products) ||
      products.length === 0 ||
      typeof totalAmount !== "number" ||
      !address?.name ||
      !address?.phone ||
      !address?.street ||
      !address?.city ||
      !address?.state ||
      !address?.postalCode
    ) {
      return res.status(400).json({ message: "Invalid order payload" });
    }

    // ensure each product has productId, name, price, quantity
    for (const p of products) {
      if (
        !p.productId ||
        typeof p.name   !== "string" ||
        typeof p.price  !== "number" ||
        typeof p.quantity !== "number"
      ) {
        return res
          .status(400)
          .json({ message: "Each product must include productId, name, price, quantity" });
      }
    }

    // create & save
    const order = new Order({
      user: userId,
      products,      // array of { productId, name, price, quantity }
      totalAmount,
      address        // { name, phone, email?, street, city, state, postalCode }
    });
    await order.save();

    // send notification email to admin
    if (process.env.ADMIN_EMAIL && process.env.ADMIN_EMAIL_PASS) {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.ADMIN_EMAIL,
          pass: process.env.ADMIN_EMAIL_PASS,
        },
      });
      const productDetails = products
        .map(p => `<li>${p.quantity} × ${p.name} @ ₹${p.price}</li>`)
        .join("");
      await transporter.sendMail({
        from: `"Shop Notification" <no-reply@yourstore.com>`,
        to: process.env.ADMIN_EMAIL,
        subject: `🛒 New Order from ${address.name}`,
        html: `
          <h2>New Order Received</h2>
          <p><strong>User:</strong> ${address.name}</p>
          <p><strong>Total Amount:</strong> ₹${totalAmount}</p>
          <p><strong>Products:</strong></p>
          <ul>${productDetails}</ul>
        `,
      }).catch(console.error);
    }

    return res.status(201).json(order);
  } catch (err) {
    console.error("Error placing order:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.getMyOrders = async (req, res) => {
  try {
    const userId = req.user._id;
    const orders = await Order.find({ user: userId }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error("Error fetching user orders:", err);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { id, status } = req.body;
    // assumes your Order schema has a paymentStatus field
    await Order.findByIdAndUpdate(id, { paymentStatus: status });
    res.json({ message: "Order status updated" });
  } catch (err) {
    console.error("Error updating order status:", err);
    res.status(500).json({ message: "Failed to update status" });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.json({ message: "Order deleted" });
  } catch (err) {
    console.error("Error deleting order:", err);
    res.status(500).json({ message: "Failed to delete order" });
  }
};

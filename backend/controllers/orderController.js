const Order = require("../models/Order");

const nodemailer = require("nodemailer");

exports.createOrder = async (req, res) => {
  try {
    console.log("Received order data:", req.body);
    const { products, totalAmount, address } = req.body;

    if (!products || !Array.isArray(products) || !totalAmount || !address || !address.name) {
      return res.status(400).json({ message: "Missing or invalid order data" });
    }

    // associate to logged-in user
    const userId = req.user._id;

    const order = new Order({ user: userId, products, totalAmount, address });
    await order.save();
    await order.populate("products.product");

    if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_EMAIL_PASS) {
      throw new Error("Missing ADMIN_EMAIL or ADMIN_EMAIL_PASS");
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.ADMIN_EMAIL_PASS,
      },
    });

    const productDetails = order.products.map((p) =>
      `<li>${p.quantity} × ${p.product?.name || "Unknown"}</li>`
    ).join("");

    const mailOptions = {
      from: '"Shop Notification" <no-reply@yourstore.com>',
      to: process.env.ADMIN_EMAIL,
      subject: `🛒 New Order from ${address.name}`,
      html: `
        <h2>New Order Received</h2>
        <p><strong>User ID:</strong> ${userId}</p>
        <p><strong>Name:</strong> ${address.name}</p>
        <p><strong>Phone:</strong> ${address.phone}</p>
        ${address.email ? `<p><strong>Email:</strong> ${address.email}</p>` : ""}
        <p><strong>Address:</strong> ${address.street}, ${address.city}, ${address.state} - ${address.postalCode}</p>
        <p><strong>Total Amount:</strong> ₹${totalAmount}</p>
        <p><strong>Products:</strong></p>
        <ul>${productDetails}</ul>
      `
    };

    try {
      await transporter.sendMail(mailOptions);
    } catch (emailErr) {
      console.error("❌ Failed to send email:", emailErr);
    }

    res.status(201).json(order);
  } catch (err) {
    console.error("❌ Error placing order:", err);
    res.status(500).json({ message: "Failed to place order", error: err.message });
  }
};

exports.getMyOrders = async (req, res) => {
  try {
    const userId = req.user._id;
    const orders = await Order.find({ user: userId }).populate("products.product");
    res.json(orders);
  } catch (err) {
    console.error("❌ Error fetching user orders:", err);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { id, status } = req.body;
    await Order.findByIdAndUpdate(id, { paymentStatus: status });
    res.json({ message: "Order status updated" });
  } catch (err) {
    res.status(500).json({ message: "Failed to update status" });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.json({ message: "Order deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete order" });
  }
};

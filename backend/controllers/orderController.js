const Order = require("../models/Order");
const Product = require("../models/Product");
const nodemailer = require("nodemailer");
/* const { createShiprocketOrder } = require("../utils/shiprocket"); */

exports.createOrder = async (req, res) => {
  try {
    const { products, totalAmount, address } = req.body;

    // 1. Create and save the order
    const order = new Order({ products, totalAmount, address });
    await order.save();
    await order.populate("products.product");

    // 2. Optional: Create shipment (Shiprocket)
     /* await createShiprocketOrder(order);
 */
    // 3. Send email notification to admin
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.ADMIN_EMAIL_PASS,
      },
    });

    const productDetails = order.products.map((p) => {
      return `<li>${p.quantity} × ${p.product?.name || "Unknown"}</li>`;
    }).join("");

    const mailOptions = {
      from: '"Shop Notification" <no-reply@yourstore.com>',
      to: process.env.ADMIN_EMAIL,
      subject: `🛒 New Order from ${address.name}`,
      html: `
        <h2>New Order Received</h2>
        <p><strong>Name:</strong> ${address.name}</p>
        <p><strong>Phone:</strong> ${address.phone}</p>
        ${address.email ? `<p><strong>Email:</strong> ${address.email}</p>` : ""}
        <p><strong>Address:</strong> ${address.street}, ${address.city}, ${address.state} - ${address.postalCode}</p>
        <p><strong>Total Amount:</strong> ₹${totalAmount}</p>
        <p><strong>Products:</strong></p>
        <ul>${productDetails}</ul>
      `
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json(order);
  } catch (err) {
    console.error("❌ Error placing order:", err);
    res.status(500).json({ message: "Failed to place order", error: err.message });
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

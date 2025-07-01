// backend/controllers/orderController.js
const Order      = require("../models/Order");
const nodemailer = require("nodemailer");

exports.createOrder = async (req, res) => {
  try {
    const { products, totalAmount, address } = req.body;
    const customerEmail = address.email;

    // Validate payload
    if (
      !Array.isArray(products) ||
      products.length === 0 ||
      typeof totalAmount !== "number" ||
      !address?.name ||
      !address?.phone ||
      !address?.email ||
      !address?.street ||
      !address?.city ||
      !address?.state ||
      !address?.postalCode
    ) {
      return res.status(400).json({ message: "Invalid order payload" });
    }

    // Validate each product entry
    for (const p of products) {
      if (
        !p.productId ||
        typeof p.name     !== "string" ||
        typeof p.price    !== "number" ||
        typeof p.quantity !== "number"
      ) {
        return res.status(400).json({
          message: "Each product must include productId, name, price, quantity"
        });
      }
    }

    // Create & save the order
    const order = new Order({ products, totalAmount, address });
    await order.save();

    // Prepare product details list
    const productDetails = products
      .map(p => `<li>${p.quantity} × ${p.name} @ ₹${p.price}</li>`)
      .join("");

    // Only proceed with emails if transporter creds exist
    if (process.env.ADMIN_EMAIL && process.env.ADMIN_EMAIL_PASS) {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.ADMIN_EMAIL,
          pass: process.env.ADMIN_EMAIL_PASS
        },
      });

      // 1) Email to ADMIN
      const adminHtml = `
        <h2>🛒 New Order Received</h2>
        <p><strong>Order ID:</strong> ${order._id}</p>
        <p><strong>Customer Email:</strong> ${customerEmail}</p>
        <p><strong>Total Amount:</strong> ₹${totalAmount}</p>
        <h3>Shipping Address:</h3>
        <p>
          ${address.name}<br/>
          ${address.street}<br/>
          ${address.city}, ${address.state} - ${address.postalCode}<br/>
          Phone: ${address.phone}
        </p>
        <h3>Products:</h3>
        <ul>${productDetails}</ul>
      `;
      transporter.sendMail({
        from:    `"Shop Notification" <${process.env.ADMIN_EMAIL}>`,
        to:      process.env.ADMIN_EMAIL,
        subject: `🛒 New Order #${order._id}`,
        html:    adminHtml
      }).catch(console.error);

      // 2) Confirmation email to CUSTOMER
      const customerHtml = `
        <h2>Thank you for your order!</h2>
        <p>Your Order ID is <strong>${order._id}</strong></p>
        <h3>Order Details:</h3>
        <ul>
          ${products.map(p => `<li>${p.quantity} × ${p.name}</li>`).join("")}
        </ul>
        <p>We will notify you once your order ships.</p>
      `;
      transporter.sendMail({
        from:    `"ChargeVita.in" <${process.env.ADMIN_EMAIL}>`,
        to:      customerEmail,
        subject: `Your Order Confirmation (#${order._id})`,
        html:    customerHtml
      }).catch(console.error);
    }

    return res.status(201).json(order);
  } catch (err) {
    console.error("Error placing order:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error("Error fetching orders:", err);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

const Order = require("../models/Order");

// POST /api/orders → create a new order (status “Pending”)
const createOrder = async (req, res) => {
  try {
    const { products, totalAmount } = req.body;
    const order = new Order({
      products,
      totalAmount,
      paymentStatus: "Pending",
    });
    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  } catch (err) {
    res.status(500).json({ message: "Order creation failed" });
  }
};

// POST /api/orders/admin → admin only: list all orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate("products.product", "name price");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

// Update order status
const updateOrderStatus = async (req, res) => {
  const { id, status } = req.body; // Getting order ID and new status from request body
  try {
    // Fetch the order by its ID
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Update the order's payment status
    order.paymentStatus = status;
    await order.save();

    return res.json({ message: "Order status updated successfully", order });
  } catch (error) {
    console.error("Error updating order status:", error);
    return res.status(500).json({ message: "Error updating order status", error });
  }
};


// DELETE /api/orders/:id → Delete order by ID
const deleteOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findByIdAndDelete(id); // Delete order by ID
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (err) {
    console.error("Error deleting order:", err);
    res.status(500).json({ message: "Error deleting order", error: err.message });
  }
};


module.exports = { createOrder, getAllOrders,updateOrderStatus, deleteOrder };

const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true, default: 1 },
      },
    ],
    totalAmount: { type: Number, required: true },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Shipped", "Delivered", "Cancelled", "Yet to Dispatch"],  // Include all statuses here
      default: "Pending",
    },
    createdAt: { type: Date, default: Date.now },
    address: {
      name: { type: String, required: true },
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      postalCode: { type: String, required: true },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);

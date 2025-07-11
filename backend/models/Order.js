// backend/models/Order.js
const mongoose = require("mongoose");

const ProductItemSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  name:      { type: String, required: true },
  price:     { type: Number, required: true },
  quantity:  { type: Number, required: true, default: 1 }
}, { _id: false });

const OrderSchema = new mongoose.Schema({
  products: {
    type:     [ProductItemSchema],
    required: true,
    validate: arr => Array.isArray(arr) && arr.length > 0
  },
  totalAmount:   { type: Number, required: true },
  paymentStatus: { type: String, required: true, default: "Pending" },
  address: {
    name:       { type: String, required: true },
    phone:      { type: String, required: true },
    email:      { type: String },  // optional
    street:     { type: String, required: true },
    city:       { type: String, required: true },
    state:      { type: String, required: true },
    postalCode: { type: String, required: true }
  }
}, { timestamps: true });

module.exports = mongoose.model("Order", OrderSchema);

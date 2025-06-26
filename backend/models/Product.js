const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true }, // main image
  gallery: { type: [String], default: [] }, // multiple images
  price: { type: Number, required: true },
  description: { type: String, default: "" },
  features: { type: [String], required: true }
});

module.exports = mongoose.model("Product", productSchema);

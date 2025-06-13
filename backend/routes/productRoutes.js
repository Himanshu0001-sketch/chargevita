const express = require("express");
const router = express.Router();
const { getProducts, seedProducts } = require("../controllers/productController");
const { updateOrderStatus, deleteOrder } = require('../controllers/orderController');
const Product = require("../models/Product");

// Seed six products (call once after DB is empty):
//   GET /api/products/seed
router.get("/seed", seedProducts);

// GET /api/products → Fetch all products
router.get("/", getProducts);

// GET /api/products/:id → Get a product by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params; // Extract product ID from the request parameters
  try {
    // Fetch the product by ID from the database
    const product = await Product.findById(id); 
    
    if (!product) {
      // If no product is found with the given ID, return a 404
      return res.status(404).json({ message: "Product not found" });
    }
    
    // Return the found product as JSON
    res.json(product);
  } catch (err) {
    console.error("Error fetching product:", err);
    // Return a 500 status if there was an error fetching the product
    res.status(500).json({ message: "Error fetching product", error: err.message });
  }
});

// POST /api/orders/update-status → Update order status (shipped, delivered, etc.)
router.post('/update-status', updateOrderStatus);

// DELETE /api/orders/:id → Delete an order
router.delete('/:id', deleteOrder);


module.exports = router;

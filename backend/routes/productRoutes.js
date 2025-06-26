const express = require('express');
const router = express.Router();
const { isAdmin } = require('../middleware/authMiddleware');
const { upload } = require('../middleware/UploadMiddleware'); // updated to support multiple fields
const {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');

// Routes
router.get('/', getProducts);                  // Get all products
router.get('/:id', getProductById);            // Get product by ID

router.post('/', upload, isAdmin, addProduct); // Add product (with main + gallery images)
router.put('/:id', isAdmin, updateProduct);    // Update product
router.delete('/:id', isAdmin, deleteProduct); // Delete product

module.exports = router;

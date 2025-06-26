const express = require('express');
const router = express.Router();
const { isAdmin } = require('../middleware/authMiddleware');
const { upload } = require('../middleware/UploadMiddleware');
const {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');

// Route order matters
router.get('/', getProducts);  // Get all products
router.get('/:id', getProductById);  // Get product by ID

router.post('/', upload.single('image'), isAdmin, addProduct);  // Add a new product (admin only)
router.put('/:id', isAdmin, updateProduct);  // Update a product by ID (admin only)
router.delete('/:id', isAdmin, deleteProduct);  // Delete a product by ID (admin only)

module.exports = router;

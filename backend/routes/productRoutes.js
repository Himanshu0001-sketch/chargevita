const express = require('express');
const router = express.Router();
const { isAdmin } = require('../middleware/authMiddleware');
const { upload } = require('../middleware/UploadMiddleware');

const {
  getProducts,
  getProductById,
  seedProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');

router.get('/', getProducts);
router.get('/:id', getProductById);

router.get('/seed', seedProducts);

// ✅ FIXED LINE: use upload.single('image') instead of just upload
router.post('/', upload.single('image'), isAdmin, addProduct);
router.put('/:id', isAdmin, updateProduct);
router.delete('/:id', isAdmin, deleteProduct);

module.exports = router;

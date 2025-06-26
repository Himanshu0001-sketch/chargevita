const Product = require("../models/Product");
const { upload } = require('../middleware/UploadMiddleware'); 

// Get all products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch products", error: err.message });
  }
};

// Get a product by ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(400).json({ message: 'Invalid product ID' });
  }
};

// Add a new product
const addProduct = async (req, res) => {
  try {
    const { name, price, description, features } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Image upload failed" });
    }

    const product = new Product({
      name,
      price,
      description,
      features: features.split(','),
      image: `/uploads/${req.file.filename}`,
    });

    await product.save();
    res.status(201).json({ message: 'Product added successfully!', product });
  } catch (error) {
    res.status(500).json({ message: 'Error adding product', error });
  }
};

// Update a product
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, image, price, description, features } = req.body;

  try {
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Update fields safely
    product.name = name || product.name;
    product.image = image || product.image;
    product.price = price || product.price;
    product.description = description || product.description;

    if (typeof features === "string") {
      product.features = features.split(",").map(f => f.trim());
    } else if (Array.isArray(features)) {
      product.features = features;
    }

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (err) {
    res.status(500).json({ message: "Failed to update product", error: err.message });
  }
};

// Delete a product
const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete product", error: err.message });
  }
};

module.exports = { 
  getProducts, 
  getProductById, 
  addProduct, 
  updateProduct, 
  deleteProduct 
};

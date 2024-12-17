// backend/controllers/productController.js

// backend/controllers/productController.js
const Product = require('../models/Product');

// Add Product (Vendor Only)
exports.addProduct = async (req, res) => {
  try {
    const { name, description, price, stock, category, image } = req.body;

    if (!name || !description || !price || !stock || !category || !image) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const product = new Product({
      name,
      description,
      price,
      stock,
      category,
      image,
      vendorId: req.vendor._id, // Ensure vendorId comes from middleware
    });

    const savedProduct = await product.save();
    res.status(201).json({ message: 'Product added successfully', product: savedProduct });
  } catch (error) {
    console.error('Error adding product:', error.message);
    res.status(500).json({ message: 'Error adding product', error: error.message });
  }
};

// Update Product (Vendor Only)
exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const product = await Product.findOneAndUpdate(
      { _id: id, vendorId: req.vendor._id },
      { ...updates, updatedAt: new Date() },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ message: 'Product not found or unauthorized' });
    }

    res.status(200).json({ message: 'Product updated successfully', product });
  } catch (error) {
    console.error('Error updating product:', error.message);
    res.status(500).json({ message: 'Error updating product', error: error.message });
  }
};

// Delete Product (Vendor Only)
exports.deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findOneAndDelete({
      _id: id,
      vendorId: req.vendor._id,
    });

    if (!product) {
      return res.status(404).json({ message: 'Product not found or unauthorized' });
    }

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error.message);
    res.status(500).json({ message: 'Error deleting product', error: error.message });
  }
};

// Get All Products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error.message);
    res.status(500).json({ message: 'Error fetching products', error: error.message });
  }
};

// Get Vendor's Products
exports.getVendorProducts = async (req, res) => {
  try {
    const products = await Product.find({ vendorId: req.vendor._id });
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching vendor products:', error.message);
    res.status(500).json({ message: 'Error fetching products', error: error.message });
  }
};

// backend/routes/vendorRoutes.js

const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Vendor = require('../models/Vendor');
const Product = require('../models/Product');
const { authenticateVendor } = require('../middleware/authMiddleware');

const router = express.Router();

// Register Vendor
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingVendor = await Vendor.findOne({ email });
    if (existingVendor) {
      return res.status(400).json({ message: 'Vendor already exists.' });
    }

    const vendor = new Vendor({ name, email, password });
    await vendor.save();

    res.status(201).json({ message: 'Vendor registered successfully', vendor });
  } catch (error) {
    res.status(500).json({ message: 'Error registering vendor', error: error.message });
  }
});

// Login Vendor
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const vendor = await Vendor.findOne({ email });
    if (!vendor) return res.status(400).json({ message: 'Vendor not found.' });

    const isMatch = await bcrypt.compare(password, vendor.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials.' });

    const token = jwt.sign({ id: vendor._id, isVendor: true }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({ token, vendor });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in vendor', error: error.message });
  }
});

// Vendor Products
router.get('/products', authenticateVendor, async (req, res) => {
  try {
    const products = await Product.find({ vendorId: req.vendor._id });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error: error.message });
  }
});

// Add a new product
router.post('/products', authenticateVendor, async (req, res) => {
  try {
    const { name, description, price, stock, category, image } = req.body;

    const newProduct = new Product({
      name,
      description,
      price,
      stock,
      category,
      image,
      vendorId: req.vendor._id, // Attach vendor ID from middleware
    });

    const savedProduct = await newProduct.save();
    res.status(201).json({ message: 'Product added successfully', product: savedProduct });
  } catch (error) {
    console.error('Error adding product:', error.message);
    res.status(500).json({ message: 'Error adding product', error: error.message });
  }
});

// Update a product
router.put('/products/:id', authenticateVendor, async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedProduct = await Product.findOneAndUpdate(
      { _id: id, vendorId: req.vendor._id }, // Ensure only vendor's product is updated
      { ...updates },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found or unauthorized' });
    }

    res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });
  } catch (error) {
    res.status(500).json({ message: 'Error updating product', error: error.message });
  }
});

// Delete a product
router.delete('/products/:id', authenticateVendor, async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProduct = await Product.findOneAndDelete({
      _id: id,
      vendorId: req.vendor._id,
    });

    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found or unauthorized' });
    }

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product', error: error.message });
  }
});

module.exports = router;

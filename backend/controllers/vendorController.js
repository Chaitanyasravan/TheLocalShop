// backend/controllers/vendorController.js

const Product = require('../models/Product');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const vendorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Hash password before saving
vendorSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next(); // Only hash if password field is modified
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare entered password with hashed password
vendorSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('Vendor', vendorSchema);


// Get Products for a Vendor
exports.getVendorProducts = async (req, res) => {
  const vendorId = req.user.id; // Assuming authentication middleware adds `req.user`
  try {
    const products = await Product.find({ vendor: vendorId });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error.' });
  }
};

// Add Product
exports.addProduct = async (req, res) => {
  const vendorId = req.user.id;
  const { name, description, price, category, stock } = req.body;

  try {
    const product = new Product({ name, description, price, category, stock, vendor: vendorId });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Failed to add product.' });
  }
};

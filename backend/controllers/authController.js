// backend/controllers/authController.js

const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Vendor = require('../models/Vendor');

// User Registration
exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  if (await User.findOne({ email })) return res.status(400).json({ message: 'Email already exists.' });
  const user = await User.create({ name, email, password });
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.status(201).json({ message: 'User registered', token });
};

// User Login
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password)))
    return res.status(400).json({ message: 'Invalid credentials.' });
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ message: 'User logged in', token });
};

// Seller Registration
exports.registerSeller = async (req, res) => {
  const { name, email, password } = req.body;
  if (await Vendor.findOne({ email })) return res.status(400).json({ message: 'Seller exists.' });
  const vendor = await Vendor.create({ name, email, password });
  const token = jwt.sign({ id: vendor._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.status(201).json({ message: 'Seller registered', token });
};

// Seller Login
exports.loginSeller = async (req, res) => {
  const { email, password } = req.body;
  const vendor = await Vendor.findOne({ email });
  if (!vendor || !(await vendor.comparePassword(password)))
    return res.status(400).json({ message: 'Invalid credentials.' });
  const token = jwt.sign({ id: vendor._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ message: 'Seller logged in', token });
};

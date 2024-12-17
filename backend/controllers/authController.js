// backend/controllers/authController.js

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // For general users
const Vendor = require('../models/Vendor'); // For sellers

// User Registration
exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({
      message: 'User registered successfully.',
      user: { id: user._id, name: user.name, email: user.email },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error.' });
  }
};

// User Login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({
      message: 'User logged in successfully.',
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error.' });
  }
};


// Register Seller (Using Vendor Model)
exports.registerSeller = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if seller already exists
    const existingSeller = await Vendor.findOne({ email });
    if (existingSeller) {
      return res.status(400).json({ message: 'Seller already exists.' });
    }

    // Create new seller (password will be hashed in the model pre('save') hook)
    const seller = await Vendor.create({ name, email, password });

    // Generate token
    const token = jwt.sign({ id: seller._id, isSeller: true }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(201).json({
      message: 'Seller registered successfully.',
      token,
      seller: { id: seller._id, name: seller.name, email: seller.email },
    });
  } catch (error) {
    console.error('Error registering seller:', error.message);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

// Seller Login
exports.loginSeller = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find seller by email
    const seller = await Vendor.findOne({ email });
    if (!seller) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }

    // Compare entered password with stored password
    const isPasswordValid = await seller.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }

    // Generate token
    const token = jwt.sign({ id: seller._id, isSeller: true }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(200).json({
      message: 'Login successful.',
      token,
      seller: { id: seller._id, name: seller.name, email: seller.email },
    });
  } catch (error) {
    console.error('Error logging in seller:', error.message);
    res.status(500).json({ message: 'Internal server error.' });
  }
};


const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); 
const Vendor = require('../models/Vendor'); 

// Register Seller
exports.registerSeller = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingSeller = await Vendor.findOne({ email });
    if (existingSeller) {
      return res.status(400).json({ message: 'Seller already exists.' });
    }

    const seller = await Vendor.create({ name, email, password });

    console.log('Password saved in DB (hashed):', seller.password);

    const token = jwt.sign({ id: seller._id, isSeller: true }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(201).json({
      message: 'Seller registered successfully.',
      token,
      seller: { id: seller._id, name: seller.name, email: seller.email },
    });
  } catch (error) {
    console.error('Error registering seller:', error.message);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

// Login Seller
exports.loginSeller = async (req, res) => {
  const { email, password } = req.body;

  try {
    const seller = await Vendor.findOne({ email });
    if (!seller) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }

    console.log('Entered Password:', password);
    console.log('Stored Hashed Password:', seller.password);

    const isPasswordValid = await seller.comparePassword(password);
    console.log('Password Match Result:', isPasswordValid);

    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }

    const token = jwt.sign({ id: seller._id, isSeller: true }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(200).json({
      message: 'Login successful.',
      token,
      seller: { id: seller._id, name: seller.name, email: seller.email },
    });
  } catch (error) {
    console.error('Error logging in seller:', error.message);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

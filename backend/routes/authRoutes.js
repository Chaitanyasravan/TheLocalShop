// backend/routes/authRoutes.js
const { authenticateToken, authenticateVendor } = require('../middleware/authMiddleware');

const express = require('express');
const {
  register,
  login,
  registerSeller,
  loginSeller,
} = require('../controllers/authController');

const router = express.Router();

// User Authentication Routes
router.post('/register', register); // Register User
router.post('/login', login); // Login User

// Seller Authentication Routes
router.post('/seller-register', registerSeller); // Register Seller
router.post('/seller-login', loginSeller); // Login Seller

module.exports = router;


// Protected Routes
router.get('/profile', authenticateToken, getUserProfile); // User profile
router.get('/vendor-profile', authenticateVendor, (req, res) => {
  res.status(200).json({ message: 'Vendor profile accessed', vendorId: req.vendor._id });
});

module.exports = router;

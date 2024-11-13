// backend/routes/authRoutes.js

const express = require('express');
const { register, login, getUserProfile } = require('../controllers/authController');
const { authenticateToken } = require('../middleware/authMiddleware');

const router = express.Router();

// Authentication Routes
router.post('/register', register);
router.post('/login', login);

// Protected Route to get user profile details
router.get('/profile', authenticateToken, getUserProfile);

module.exports = router;


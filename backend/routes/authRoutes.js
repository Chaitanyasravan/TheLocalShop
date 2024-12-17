// backend/routes/authRoutes.js

const express = require('express');
const { registerUser, loginUser, registerSeller, loginSeller } = require('../controllers/authController');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/seller-register', registerSeller);
router.post('/seller-login', loginSeller);

module.exports = router;

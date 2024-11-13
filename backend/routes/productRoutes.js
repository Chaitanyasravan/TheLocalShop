// backend/routes/productRoutes.js
const express = require('express');
const Product = require('../models/Product'); // Assuming you have a Product model
const router = express.Router();

// Route to get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products); // Ensure products array is returned
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

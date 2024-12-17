// backend/routes/productRoutes.js

// backend/routes/productRoutes.js
const express = require('express');
const {
  addProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getVendorProducts,
} = require('../controllers/productController');
const { authenticateVendor } = require('../middleware/authMiddleware');

const router = express.Router();

// Add Product (Vendor Only)
router.post('/', authenticateVendor, addProduct);

// Update Product (Vendor Only)
router.put('/:id', authenticateVendor, updateProduct);

// Delete Product (Vendor Only)
router.delete('/:id', authenticateVendor, deleteProduct);

// Get All Products
router.get('/', getAllProducts);

// Get Vendor's Products
router.get('/vendor', authenticateVendor, getVendorProducts);

module.exports = router;

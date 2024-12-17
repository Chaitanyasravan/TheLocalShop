// backend/routes/cartRoutes.js
const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const { authenticateToken } = require('../middleware/authMiddleware');

// Add product to cart
router.post('/:productId', authenticateToken, async (req, res) => {
  const { productId } = req.params;
  const { quantity } = req.body; // Accept quantity in request
  const userId = req.user.id;

  try {
    const cart = await Cart.findOneAndUpdate(
      { user: userId },
      { $addToSet: { products: { product: productId, quantity: quantity || 1 } } },
      { new: true, upsert: true }
    );
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Error adding to cart', error: error.message });
  }
});

module.exports = router;

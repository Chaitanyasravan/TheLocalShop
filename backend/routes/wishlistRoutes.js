// backend/routes/wishlistRoutes.js
const express = require('express');
const router = express.Router();
const Wishlist = require('../models/Wishlist');
const { authenticateToken } = require('../middleware/authMiddleware');

// Add product to wishlist
router.post('/:productId', authenticateToken, async (req, res) => {
  const { productId } = req.params;
  const userId = req.user.id;

  try {
    const wishlist = await Wishlist.findOneAndUpdate(
      { user: userId },
      { $addToSet: { products: productId } },
      { new: true, upsert: true }
    );
    res.status(200).json(wishlist);
  } catch (error) {
    res.status(500).json({ message: 'Error adding to wishlist', error: error.message });
  }
});

module.exports = router;

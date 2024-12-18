// backend/routes/cartRoutes.js
const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const { authenticateUser } = require('../middleware/authMiddleware'); // Import middleware

// Add product to cart
router.post('/:productId', authenticateUser, async (req, res) => {
  const { productId } = req.params;
  const { quantity } = req.body; // Accept quantity in request body
  const userId = req.user._id; // Extract user ID from req.user

  try {
    // Find the user's cart
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      // If no cart exists, create a new one
      cart = new Cart({ user: userId, products: [] });
    }

    // Check if the product already exists in the cart
    const productIndex = cart.products.findIndex((item) => item.product.toString() === productId);

    if (productIndex > -1) {
      // If product exists, update its quantity
      cart.products[productIndex].quantity += quantity || 1;
    } else {
      // If product doesn't exist, add it to the cart
      cart.products.push({ product: productId, quantity: quantity || 1 });
    }

    // Save the updated cart
    await cart.save();

    res.status(200).json({ message: 'Product added to cart successfully', cart });
  } catch (error) {
    console.error('Error adding to cart:', error.message);
    res.status(500).json({ message: 'Error adding to cart', error: error.message });
  }
});

// Fetch user's cart
router.get('/', authenticateUser, async (req, res) => {
  const userId = req.user._id;

  try {
    // Find the user's cart and populate product details
    const cart = await Cart.findOne({ user: userId })
        .populate('products.product', 'name description price') // Populate product fields
        .exec();

    if (!cart || cart.products.length === 0) {
      return res.status(200).json([]); // Return an empty array if no cart or products exist
    }

    // Transform cart data for clean response
    const cartData = cart.products.map((item) => ({
      product: {
        _id: item.product._id,
        name: item.product.name,
        description: item.product.description,
        price: item.product.price,
      },
      quantity: item.quantity,
    }));

    res.status(200).json(cartData);
  } catch (error) {
    console.error('Error fetching cart:', error.message);
    res.status(500).json({ message: 'Error fetching cart', error: error.message });
  }
});

module.exports = router;

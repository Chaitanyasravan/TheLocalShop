// backend/routes/profileRoutes.js
const express = require('express');
const User = require('../models/User'); // Import the User model
const { verifyToken } = require('../middleware/authMiddleware'); // Ensure the user is authenticated
const router = express.Router();

// PUT /profile - Update user profile
router.put('/', verifyToken, async (req, res) => {
  try {
    const userId = req.user.id; // Get user ID from token (assuming JWT token with user ID)
    const { name, email, address } = req.body; // Get the updated profile data from request body

    // Find user by ID and update the details
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, email, address },
      { new: true } // Option to return the updated document
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      message: 'Profile updated successfully',
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating profile', error: error.message });
  }
});

module.exports = router;

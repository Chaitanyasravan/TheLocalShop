// backend/middleware/authMiddleware.js

const jwt = require('jsonwebtoken');
const Vendor = require('../models/Vendor'); // Vendor Model
const User = require('../models/User');     // User Model

// Authenticate General User
exports.authenticateToken = async (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'No token provided. Access denied.' });
  }

  try {
    const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ message: 'Invalid token. User not found.' });
    }

    req.user = user; // Attach user data to request
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid or expired token.' });
  }
};

// Authenticate Vendor
exports.authenticateVendor = async (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'No token provided. Access denied.' });
  }

  try {
    const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);

    // Check if the decoded token has `isSeller: true`
    if (!decoded.isSeller) {
      return res.status(403).json({ message: 'Unauthorized: Not a seller account.' });
    }

    const vendor = await Vendor.findById(decoded.id);

    if (!vendor) {
      return res.status(401).json({ message: 'Invalid token. Vendor not found.' });
    }

    req.vendor = vendor; // Attach vendor data to request
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid or expired token.' });
  }
};

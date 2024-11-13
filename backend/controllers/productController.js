// backend/controllers/productController.js
const Product = require('../models/Product');

exports.addProduct = async (req, res) => {
  const { name, description, price, category, stock, vendorId } = req.body;
  try {
    const product = new Product({ name, description, price, category, stock, vendor: vendorId });
    await product.save();
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// backend/controllers/orderController.js
const Cart = require('../models/Cart');
const Order = require('../models/Order');

exports.checkout = async (req, res) => {
  const { userId } = req.body;
  try {
    const cart = await Cart.findOne({ user: userId }).populate('products.product');
    if (!cart) return res.status(400).json({ message: 'Cart is empty' });


    const totalAmount = cart.products.reduce((sum, item) => {
      if (!item.product || !item.product.price) {
        throw new Error('Invalid product data');
      }
      return sum + item.product.price * item.quantity;
    }, 0);
    

    const order = new Order({
      user: userId,
      products: cart.products,
      totalAmount
    });

    await order.save();
    await Cart.deleteOne({ user: userId }); // Empty cart after order is placed
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

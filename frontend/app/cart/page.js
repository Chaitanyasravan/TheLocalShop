// app/cart/page.js

'use client';

import React, { useEffect, useState } from 'react';
import api from '../utils/api';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await api.get('/cart');
        setCart(response.data);

        // Calculate total
        const totalAmount = response.data.reduce(
          (sum, item) => sum + item.product.price * item.quantity,
          0
        );
        setTotal(totalAmount);
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    };

    fetchCart();
  }, []);

  const handleRemove = (productId) => {
    alert(`Feature to remove ${productId} coming soon!`);
  };

  const handleCheckout = () => {
    alert('Redirecting to checkout!');
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">My Cart</h1>

        <div className="grid grid-cols-1 gap-4 mb-8">
          {cart.map((item) => (
            <div key={item.product._id} className="bg-white shadow-lg rounded-lg p-4">
              <h2 className="text-xl font-bold">{item.product.name}</h2>
              <p>{item.product.description}</p>
              <p className="text-yellow-600 font-bold mt-2">${item.product.price}</p>
              <p className="mt-2">Quantity: {item.quantity}</p>
              <button
                className="bg-red-600 text-white px-4 py-2 rounded mt-4"
                onClick={() => handleRemove(item.product._id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <div className="text-right">
          <p className="text-xl font-bold mb-4">Total: ${total}</p>
          <button
            onClick={handleCheckout}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;

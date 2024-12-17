// app/wishlist/page.js

'use client';

import React, { useEffect, useState } from 'react';
import api from '../utils/api';

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      const response = await api.get('/wishlist');
      setWishlist(response.data.wishlist);
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      await api.delete(`/wishlist/${productId}`);
      setWishlist(wishlist.filter(item => item._id !== productId));
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  const moveToCart = async (productId) => {
    try {
      await api.post(`/cart/${productId}`);
      await removeFromWishlist(productId); // Remove from wishlist after adding to cart
    } catch (error) {
      console.error('Error moving item to cart:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-4xl font-bold text-center mb-6">Your Wishlist</h1>
      {wishlist.length === 0 ? (
        <p className="text-lg text-gray-600 text-center">Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map(product => (
            <div key={product._id} className="bg-white shadow-lg rounded-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-800">{product.name}</h2>
              <p className="text-gray-600">{product.description}</p>
              <p className="text-yellow-500 font-bold mt-2">${product.price}</p>
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => moveToCart(product._id)}
                  className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
                >
                  Move to Cart
                </button>
                <button
                  onClick={() => removeFromWishlist(product._id)}
                  className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;

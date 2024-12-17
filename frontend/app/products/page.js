// app/products/page.js

'use client';

import React, { useEffect, useState } from 'react';
import api from '../utils/api';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('/products'); // Correct endpoint

        console.log('Fetched Products:', response.data); // Debug response
        const fetchedProducts = response.data || [];
        setProducts(fetchedProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
        setProducts([]); // Set to an empty array on error
      }
    };
  
    fetchProducts();
  }, []);
  

  // Handle undefined product fields
  const filteredProducts = products.filter((product) =>
    product?.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Products</h1>

        {/* Search Bar */}
        <div className="flex justify-center mb-8">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border p-2 rounded-lg w-full max-w-md"
          />
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product._id}
                className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center text-center"
              >
                <img
                  src={product.image || 'https://via.placeholder.com/150'}
                  alt={product.name || 'No name'}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <h2 className="text-xl font-bold mt-4">{product.name || 'No Name'}</h2>
                <p className="text-gray-600">{product.description || 'No Description'}</p>
                <p className="text-yellow-600 font-bold mt-2">
                  ${product.price ? product.price.toFixed(2) : '0.00'}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">No products available.</p>
        )}
      </div>
    </div>
  );
};

export default Products;

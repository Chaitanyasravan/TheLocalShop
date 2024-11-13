'use client';

import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import AddToCartButton from '../components/AddToCartButton';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Fetch the products from the API
    api.get('/products')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => console.log(error));
  }, []);

  // Filter products based on search query
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-blue-200 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-blue-800 mb-6">Products</h1>

        {/* Search bar */}
        <div className="flex justify-center mb-6">
          <input
            type="text"
            placeholder="Search for products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-96 p-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Product list */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <div key={product._id} className="bg-white shadow-md p-6 rounded-lg hover:shadow-xl transition duration-200">
                <h2 className="text-2xl font-semibold text-gray-800">{product.name}</h2>
                <p className="text-gray-700 mt-2">{product.description}</p>
                <p className="text-lg font-semibold text-yellow-500 mt-2">${product.price}</p>
                <AddToCartButton productId={product._id} />
              </div>
            ))
          ) : (
            <p className="text-center text-lg text-gray-600 col-span-full">No products found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;

// app/seller-dashboard/page.js

'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '../utils/api';

const SellerDashboard = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem('vendorToken'); // Match the token key
        if (!token) {
          router.push('/seller-login'); // Redirect to login if no token
          return;
        }

        // Fetch all products from the correct endpoint
        const response = await api.get('/products/vendor', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProducts(response.data); // Set the fetched products
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to fetch products. Please try again.');
      }
    };

    fetchProducts();
  }, [router]);

  const handleAddProduct = () => {
    router.push('/add-product'); // Redirect to Add Product page
  };

  const handleLogout = () => {
    localStorage.removeItem('vendorToken'); // Correct token key
    router.push('/seller-login');
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Navbar */}
      <nav className="bg-white shadow-md py-4 px-8">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Seller Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="p-8">
        <h2 className="text-3xl font-bold text-gray-800">Welcome to your dashboard</h2>
        <p className="mt-4 text-gray-600">
          Manage your products, orders, and more from this portal.
        </p>

        <div className="flex justify-end my-6">
          <button
            onClick={handleAddProduct}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg shadow-md"
          >
            Add Product
          </button>
        </div>

        {error && <p className="text-red-500">{error}</p>}

        {/* Product List */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div key={product._id} className="bg-white shadow-lg rounded-lg p-4">
                <h3 className="text-xl font-semibold text-gray-800">{product.name}</h3>
                <p className="text-gray-600 mt-2">{product.description}</p>
                <p className="font-bold text-yellow-500 mt-2">${product.price}</p>
                <button
                  className="text-red-500 hover:text-red-700 mt-2"
                  onClick={() => alert(`Feature to edit or delete ${product.name} coming soon!`)}
                >
                  Edit / Delete
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-700 mt-4">No products available. Add your first product!</p>
        )}
      </main>
    </div>
  );
};

export default SellerDashboard;

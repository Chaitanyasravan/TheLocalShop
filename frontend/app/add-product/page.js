// app/add-product/page.js

'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '../utils/api';

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    category: '',
    image: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Submit Form Data to API
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('vendorToken'); // Ensure vendorToken exists
      if (!token) {
        setError('Please log in to add a product.');
        return;
      }

      // Validate Form Data (all fields required)
      if (
        !formData.name ||
        !formData.description ||
        !formData.price ||
        !formData.stock ||
        !formData.category ||
        !formData.image
      ) {
        setError('All fields are required.');
        return;
      }

      // Send the product data to the backend
      const response = await api.post('/products', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setSuccess('Product added successfully!');
      setFormData({
        name: '',
        description: '',
        price: '',
        stock: '',
        category: '',
        image: '',
      });

      // Redirect to the dashboard after 2 seconds
      setTimeout(() => {
        router.push('/seller-dashboard');
      }, 2000);
    } catch (error) {
      console.error('Error:', error.response || error.message);
      setError(error.response?.data?.message || 'Failed to add product. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg space-y-6"
      >
        <h1 className="text-2xl font-bold text-gray-800 text-center">Add New Product</h1>

        {error && <p className="text-red-600 text-center">{error}</p>}
        {success && <p className="text-green-600 text-center">{success}</p>}

        {/* Product Name */}
        <div>
          <label className="block text-gray-700">Product Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-700">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg"
          />
        </div>

        {/* Price */}
        <div>
          <label className="block text-gray-700">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg"
          />
        </div>

        {/* Stock */}
        <div>
          <label className="block text-gray-700">Stock</label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-gray-700">Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg"
          />
        </div>

        {/* Image */}
        <div>
          <label className="block text-gray-700">Image URL</label>
          <input
            type="url"
            name="image"
            value={formData.image}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;

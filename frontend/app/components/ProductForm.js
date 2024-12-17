'use client';

import React, { useState } from 'react';
import api from '../utils/api';

const ProductForm = ({ product = {}, onSubmit }) => {
  const [name, setName] = useState(product.name || '');
  const [description, setDescription] = useState(product.description || '');
  const [price, setPrice] = useState(product.price || '');
  const [stock, setStock] = useState(product.stock || '');
  const [category, setCategory] = useState(product.category || '');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const productData = { name, description, price, stock, category };
    await onSubmit(productData); // Callback function to handle Add or Update
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 space-y-4">
      <input
        type="text"
        placeholder="Product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full border rounded px-4 py-2"
        required
      />
      <textarea
        placeholder="Product Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full border rounded px-4 py-2"
        required
      />
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="w-full border rounded px-4 py-2"
        required
      />
      <input
        type="number"
        placeholder="Stock"
        value={stock}
        onChange={(e) => setStock(e.target.value)}
        className="w-full border rounded px-4 py-2"
        required
      />
      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full border rounded px-4 py-2"
        required
      />
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
      >
        {product._id ? 'Update Product' : 'Add Product'}
      </button>
    </form>
  );
};

export default ProductForm;

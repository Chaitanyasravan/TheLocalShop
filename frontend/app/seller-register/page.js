// app/seller-register/page.js

'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '../utils/api';

const SellerRegister = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(''); // Clear any previous errors

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    // Validate password requirements
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if (!passwordRegex.test(password)) {
      setError(
        'Password must be at least 8 characters, contain one uppercase letter, and one special character.'
      );
      return;
    }

    try {
      await api.post('/auth/seller-register', { name, email, password });
      alert('Seller registration successful! Please login.');
      router.push('/seller-login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed.');
    }
  };

  return (
    <div className="hero-image min-h-screen flex items-center justify-center bg-cover bg-center">
      <div className="bg-white shadow-lg rounded-lg p-10 max-w-md w-full space-y-6 border border-gray-200">
        <div className="text-center">
          <div className="logo h-16 w-16 mx-auto mb-4"></div>
          <h2 className="text-3xl font-extrabold text-gray-900">Create Your Seller Account</h2>
          <p className="mt-2 text-sm text-gray-600">Register to start selling on TheLocalShop</p>
        </div>

        {error && <p className="text-red-600 text-center font-semibold">{error}</p>}

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-gray-800 text-sm font-medium mb-1">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
              className="w-full border border-gray-300 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-800 text-sm font-medium mb-1">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full border border-gray-300 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-800 text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
              required
              className="w-full border border-gray-300 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <p className="text-sm text-gray-500 mt-2">
              Password must be at least 8 characters, contain one uppercase letter, and one special character.
            </p>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg font-bold py-3 rounded-lg shadow-md transition duration-150"
          >
            Register
          </button>
        </form>

        <div className="flex items-center justify-between mt-4">
          <button
            type="button"
            onClick={() => router.push('/seller-home')}
            className="text-gray-600 hover:text-gray-700 text-sm transition duration-150"
          >
            Back to Home
          </button>
          <button
            type="button"
            onClick={() => router.push('/seller-login')}
            className="text-blue-600 hover:text-blue-700 text-sm font-semibold transition duration-150"
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
};

export default SellerRegister;

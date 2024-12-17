// app/seller-login/page.js

'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '../utils/api';

const SellerLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Loading state for better UX
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
  
    try {
      const { data } = await api.post('/auth/seller-login', { email, password });
      localStorage.setItem('vendorToken', data.token);
      alert('Login successful!');
      router.push('/seller-dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed.');
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center hero-image bg-cover bg-center">
      <div className="bg-white shadow-lg rounded-lg p-10 max-w-md w-full space-y-6 border border-gray-200">
        <div className="text-center">
          <div className="logo h-16 w-16 mx-auto mb-4"></div>
          <h2 className="text-3xl font-extrabold text-gray-900">Seller Login</h2>
          <p className="mt-2 text-sm text-gray-600">Log in to manage your products and orders</p>
        </div>

        {error && (
          <p className="text-red-600 text-center font-semibold">{error}</p>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-gray-800 text-sm font-medium mb-1">
              Email Address
            </label>
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
            <label className="block text-gray-800 text-sm font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="w-full border border-gray-300 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            className={`w-full text-lg font-bold py-3 rounded-lg shadow-md transition duration-150 ${
              isLoading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Login'}
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
            onClick={() => router.push('/seller-register')}
            className="text-blue-600 hover:text-blue-700 text-sm font-semibold transition duration-150"
          >
            Create Account
          </button>
        </div>

        <div className="text-center mt-4">
          <a
            href="#"
            className="text-blue-500 hover:underline text-sm"
          >
            Forgot Password?
          </a>
        </div>
      </div>
    </div>
  );
};

export default SellerLogin;

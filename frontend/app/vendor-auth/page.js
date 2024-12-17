// frontend/app/vendor-auth/page.js

'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '../utils/api';

const VendorAuth = ({ type }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const endpoint = type === 'login' ? '/api/vendor/login' : '/api/vendor/register';
      const data = type === 'login' ? { email, password } : { name, email, password };

      const response = await api.post(endpoint, data);

      if (type === 'login') {
        localStorage.setItem('vendorToken', response.data.token);
        alert('Login successful!');
        router.push('/vendor-dashboard');
      } else {
        alert('Registration successful! You can now log in.');
        router.push('/seller-login');
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Authentication failed.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {type === 'register' && (
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full border border-gray-300 rounded-lg py-3 px-4"
        />
      )}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full border border-gray-300 rounded-lg py-3 px-4"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="w-full border border-gray-300 rounded-lg py-3 px-4"
      />
      <button className="w-full bg-blue-600 text-white py-3 rounded-lg">
        {type === 'login' ? 'Login' : 'Register'}
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
};

export default VendorAuth;

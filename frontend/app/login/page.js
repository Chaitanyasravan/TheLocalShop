// app/login/page.js

'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // use next/navigation with App Router
import api from '../utils/api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/login', { email, password });
      const { token } = response.data;

      // Save the token to local storage
      localStorage.setItem('token', token);
      alert('Login successful!');

      // Redirect to the home page
      router.push('/');
    } catch (error) {
      setError('Invalid credentials, please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-blue-200 p-6">
      <form onSubmit={handleLogin} className="bg-white shadow-lg rounded-lg p-10 max-w-md w-full space-y-6 border border-gray-200">
        <h2 className="text-4xl font-bold text-center text-blue-800 mb-6">Login to Your Account</h2>

        {error && <p className="text-red-600 text-center font-semibold">{error}</p>}

        <div>
          <label className="block text-gray-800 text-lg font-semibold mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="border border-gray-300 rounded-lg w-full py-3 px-4 text-lg text-gray-800 focus:outline-none focus:border-blue-500 shadow-sm"
          />
        </div>

        <div>
          <label className="block text-gray-800 text-lg font-semibold mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
            className="border border-gray-300 rounded-lg w-full py-3 px-4 text-lg text-gray-800 focus:outline-none focus:border-blue-500 shadow-sm"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-black text-lg font-bold py-3 rounded-lg shadow-md transition duration-150"
        >
          Login
        </button>

        <div className="flex justify-between mt-8 text-lg">
          <button
            type="button"
            onClick={() => router.push('/')}
            className="text-gray-600 hover:text-gray-700 transition duration-150"
          >
            Back to Home
          </button>
          <button
            type="button"
            onClick={() => router.push('/register')}
            className="text-blue-600 hover:text-blue-700 font-semibold transition duration-150"
          >
            Create Account
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;

// app/register/page.js

'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Correct import for App Router
import api from '../utils/api';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    
    // Validation checks
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!passwordRegex.test(password)) {
      setError('Password must be at least 8 characters, contain one uppercase letter, and one special character.');
      return;
    }

    setError(''); // Clear previous errors
    try {
      await api.post('/auth/register', { name, email, password });
      alert('Registration successful! You can now log in.');
      router.push('/login'); // Redirect to login
    } catch (error) {
      setError('Error during registration, please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-blue-200 p-6">
      <form onSubmit={handleRegister} className="bg-white shadow-lg rounded-lg p-10 max-w-md w-full space-y-6 border border-gray-200">
        <h2 className="text-4xl font-bold text-center text-blue-800 mb-6">Create your Account</h2>

        {error && <p className="text-red-600 text-center font-semibold">{error}</p>}

        <div>
          <label className="block text-gray-800 text-lg font-semibold mb-2">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            required
            className="border border-gray-300 rounded-lg w-full py-3 px-4 text-lg text-gray-800 focus:outline-none focus:border-blue-500 shadow-sm"
          />
        </div>

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
            placeholder="Create a password"
            required
            className="border border-gray-300 rounded-lg w-full py-3 px-4 text-lg text-gray-800 focus:outline-none focus:border-blue-500 shadow-sm"
          />
          <p className="text-sm text-gray-500 mt-2">
            Password must be at least 8 characters, contain one uppercase letter, and one special character.
          </p>
        </div>

        <button
          type="submit"
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-black text-lg font-bold py-3 rounded-lg shadow-md transition duration-150"
        >
          Register
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
            onClick={() => router.push('/login')}
            className="text-blue-600 hover:text-blue-700 font-semibold transition duration-150"
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;

// app/profile/page.js
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Use `next/navigation` in the App Router
import api from '../utils/api';

const Profile = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    address: '',
  });
  const [initialUser, setInitialUser] = useState(null);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Example fetching user profile; replace with your own data fetching
    const fetchUser = async () => {
      try {
        // Replace this with your actual API call to fetch the user data
        const fetchedUser = {
          name: 'John Doe',
          email: 'johndoe@example.com',
          address: '123 Main St, Springfield',
        };
        setUser(fetchedUser);
        setInitialUser(fetchedUser); // Keep a copy of the initial user data for canceling
      } catch (error) {
        setError('Error fetching user data');
      }
    };
    fetchUser();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put('/profile', user);
      alert('Profile updated successfully!');
      router.push('/');
    } catch (error) {
      alert('Error updating profile.');
    }
  };

  const handleCancel = () => {
    setUser(initialUser); // Reset to initial user data
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-10 max-w-md w-full space-y-6 border border-gray-200">
        <h2 className="text-4xl font-bold text-center text-blue-800 mb-6">Your Profile</h2>

        {error && <p className="text-red-600 text-center font-semibold">{error}</p>}

        <div>
          <label className="block text-gray-800 text-lg font-semibold mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-lg w-full py-3 px-4 text-lg text-gray-800 focus:outline-none focus:border-blue-500 shadow-sm"
          />
        </div>

        <div>
          <label className="block text-gray-800 text-lg font-semibold mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-lg w-full py-3 px-4 text-lg text-gray-800 focus:outline-none focus:border-blue-500 shadow-sm"
          />
        </div>

        <div>
          <label className="block text-gray-800 text-lg font-semibold mb-2">Address</label>
          <input
            type="text"
            name="address"
            value={user.address}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-lg w-full py-3 px-4 text-lg text-gray-800 focus:outline-none focus:border-blue-500 shadow-sm"
          />
        </div>

        <div className="flex justify-between mt-8">
          <button
            type="button"
            onClick={() => router.push('/')}
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-300 transition duration-150"
          >
            Back to Home
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition duration-150"
          >
            Cancel
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white text-lg font-bold py-3 rounded-lg shadow-md transition duration-150 mt-4"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default Profile;

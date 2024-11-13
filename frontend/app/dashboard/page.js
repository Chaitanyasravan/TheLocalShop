// app/dashboard/page.js

'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaShoppingCart } from 'react-icons/fa';
import Products from '../products/page'; // Add the correct path to Products component

export default function Dashboard() {
  const [user, setUser] = useState({ name: 'John Doe', address: '123 Main St, Springfield' });
  const router = useRouter();

  useEffect(() => {
    // Fetch user profile details after login (you can replace this with an actual API call)
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login'); // Redirect to login if not authenticated
    } else {
      // Set user details here if available
      setUser({
        name: 'John Doe',
        address: '123 Main St, Springfield',
      });
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      
      {/* Navbar */}
      <nav className="bg-white shadow-md py-3 px-6">
        <div className="container mx-auto flex items-center justify-between">
          
          {/* Logo and Title */}
          <div className="flex items-center space-x-2">
            <img src="/path/to/logo.png" alt="TheLocalShop Logo" className="h-8 w-8" />
            <h1 className="text-xl font-bold text-gray-800">TheLocalShop</h1>
          </div>

          {/* Delivered to and Search Bar */}
          <div className="flex items-center space-x-4">
            <p className="text-gray-600">
              Delivered to: <span className="font-semibold">{user.address}</span>
            </p>
            <input
              type="text"
              placeholder="Search for products..."
              className="w-64 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-4">
            <Link href="/profile" className="text-gray-700 hover:text-gray-800">Profile</Link>
            <Link href="/contact" className="text-gray-700 hover:text-gray-800">Contact Us</Link>
            <Link href="/categories" className="text-gray-700 hover:text-gray-800">Categories</Link>
          </div>

          {/* Additional Links for Logged-in Users */}
          <div className="flex items-center space-x-4">
            <Link href="/wishlist" className="text-blue-500 hover:text-blue-700">Wishlist</Link>
            <Link href="/orders" className="text-blue-500 hover:text-blue-700">Orders</Link>
          </div>

          {/* Cart Icon */}
          <Link href="/cart" className="text-gray-700 hover:text-gray-800">
            <FaShoppingCart size={24} className="ml-2" />
          </Link>
        </div>
      </nav>

      {/* Main Content Section */}
      <section className="relative bg-[url('/path/to/hero-image.jpg')] bg-cover bg-center h-[600px] flex items-center justify-center text-center shadow-lg">
        <div className="bg-black bg-opacity-60 text-white p-8 rounded-lg max-w-lg mx-auto">
          <h1 className="text-5xl font-bold mb-6">Welcome, {user.name}</h1>
          <p className="text-lg mb-8">
            Explore your dashboard and manage your account, orders, and saved products.
          </p>
          <div className="flex flex-col gap-4 md:flex-row md:gap-6 justify-center">
            <Link href="/products">
              <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 px-6 rounded-full shadow-md transition transform hover:scale-105">
                Shop Now
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products Section (similar to Home) */}
      <section className="py-16 bg-white border-t border-gray-200">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-semibold">Featured Products</h2>
          <p className="text-gray-600">Explore our collection of exclusive, locally made products.</p>
        </div>
        <div className="max-w-6xl mx-auto px-4">
          <Products />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-gray-900 text-white text-center">
        <p>© {new Date().getFullYear()} TheLocalShop. All rights reserved.</p>
      </footer>
    </div>
  );
}

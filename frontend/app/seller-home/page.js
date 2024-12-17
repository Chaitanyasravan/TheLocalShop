// app/seller-home/page.js

'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

const SellerHome = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans">
      {/* Navbar */}
      <nav className="bg-white shadow-md py-3 px-6">
        <div className="container mx-auto flex items-center justify-between">
          {/* Logo and Title */}
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => router.push('/')} // Navigate to the main home page
          >
            <div className="logo h-8 w-8"></div> {/* Use the global `logo` class */}
            <h1 className="text-xl font-bold text-gray-800">TheLocalShop</h1>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center space-x-4">
            <button
              className="text-blue-500 hover:text-blue-700 font-semibold transition duration-150"
              onClick={() => router.push('/about-seller')}
            >
              About
            </button>
            <button
              className="text-blue-500 hover:text-blue-700 font-semibold transition duration-150"
              onClick={() => router.push('/seller-login')}
            >
              Login
            </button>
            <button
              className="text-blue-500 hover:text-blue-700 font-semibold transition duration-150"
              onClick={() => router.push('/seller-register')}
            >
              Sign Up
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative hero-image bg-cover bg-center h-[600px] flex items-center justify-center text-center shadow-lg">
          <div className="bg-black bg-opacity-60 text-white p-8 rounded-lg max-w-lg mx-auto">
            <h1 className="text-5xl font-bold mb-6">Welcome to TheLocalShop Seller Portal</h1>
            <p className="text-lg mb-8">
              Manage your products, view orders, and grow your business with ease.
            </p>
            <div className="flex justify-center">
              <button
                onClick={() => router.push('/')}
                className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3 px-6 rounded-full shadow-md transition transform hover:scale-105"
              >
                Back to the Shop
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white text-center py-8">
        <p>© {new Date().getFullYear()} TheLocalShop. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default SellerHome;

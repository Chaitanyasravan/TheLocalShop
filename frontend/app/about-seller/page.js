// app/about-seller/page.js

'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

const AboutSeller = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans">
      {/* Navbar */}
      <nav className="bg-white shadow-md py-3 px-6">
        <div className="container mx-auto flex items-center justify-between">
          {/* Logo and Title */}
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => router.push('/')} // Navigate to the home page
          >
            <div className="logo h-8 w-8"></div> {/* Use the global `logo` class */}
            <h1 className="text-xl font-bold text-gray-800">TheLocalShop</h1>
          </div>
          <div className="flex items-center space-x-4">
            <button
              className="text-blue-500 hover:text-blue-700 font-semibold transition duration-150"
              onClick={() => router.back()}
            >
              Back
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow container mx-auto py-16 px-4 text-center">
        <h1 className="text-4xl font-bold mb-6 text-gray-800">
          About TheLocalShop Seller
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          TheLocalShop Seller Portal is designed to empower local artisans,
          small business owners, and creators to showcase their unique products
          to a global audience. With tools for product management, order
          tracking, and performance analytics, our platform helps you grow your
          business with ease and efficiency.
        </p>
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Why Join TheLocalShop Seller?
          </h2>
          <ul className="text-left list-disc list-inside max-w-3xl mx-auto text-gray-600">
            <li>Reach a global customer base with your local products.</li>
            <li>Easy-to-use tools for managing inventory and orders.</li>
            <li>Dedicated support to help you succeed.</li>
            <li>Highlight the cultural uniqueness of your creations.</li>
          </ul>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white text-center py-8">
        <p>© {new Date().getFullYear()} TheLocalShop. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AboutSeller;

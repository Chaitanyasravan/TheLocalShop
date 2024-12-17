// app/about/page.js

'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

const About = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
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
              onClick={() => router.back()}
              className="text-blue-500 hover:text-blue-700 font-semibold transition duration-150"
            >
              Back
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto py-16 px-4 text-center">
        <h1 className="text-4xl font-bold mb-6 text-gray-800">About TheLocalShop</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          TheLocalShop is a platform dedicated to connecting local artisans and small business owners with a global audience. 
          We aim to empower creators to showcase their unique craftsmanship and cultural heritage, 
          making it accessible to customers worldwide.
        </p>
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Our Mission</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our mission is to support artisans by providing them with tools and resources to grow their businesses, 
            while offering customers an authentic shopping experience filled with unique, handmade products.
          </p>
        </div>
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Why Choose Us?</h2>
          <ul className="text-left list-disc list-inside max-w-3xl mx-auto text-gray-600">
            <li>Promote sustainable commerce by connecting artisans with customers directly.</li>
            <li>Celebrate and preserve cultural heritage through authentic products.</li>
            <li>Provide secure and seamless shopping for customers.</li>
          </ul>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 bg-gray-900 text-white text-center">
        <p>© {new Date().getFullYear()} TheLocalShop. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default About;

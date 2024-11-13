// app/dashboard/page.js

'use client';

import React from 'react';
import Link from 'next/link';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-blue-200 py-10 px-4">
      <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-lg p-8 border border-gray-200">
        <h1 className="text-4xl font-bold text-center text-blue-800 mb-6">Dashboard</h1>
        
        {/* Welcome Message */}
        <p className="text-center text-gray-700 mb-8">
          Welcome to your dashboard! Here you can manage products, view orders, and keep track of your store's performance.
        </p>

        {/* Dashboard Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-center">
          <Link href="/dashboard/manage-products" className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-4 px-6 rounded-lg shadow-md transition transform hover:scale-105">
            Manage Products
          </Link>

          <Link href="/dashboard/orders" className="bg-green-500 hover:bg-green-600 text-white font-semibold py-4 px-6 rounded-lg shadow-md transition transform hover:scale-105">
            View Orders
          </Link>

          <Link href="/dashboard/analytics" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-4 px-6 rounded-lg shadow-md transition transform hover:scale-105">
            Analytics
          </Link>
        </div>

        {/* Placeholder for Future Stats */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-blue-800 mb-4">Quick Stats</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gray-100 p-6 rounded-lg shadow-md text-center">
              <h3 className="text-lg font-semibold">Total Products</h3>
              <p className="text-3xl font-bold text-blue-700">50</p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow-md text-center">
              <h3 className="text-lg font-semibold">Total Orders</h3>
              <p className="text-3xl font-bold text-green-600">120</p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow-md text-center">
              <h3 className="text-lg font-semibold">Revenue</h3>
              <p className="text-3xl font-bold text-yellow-500">$1,200</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

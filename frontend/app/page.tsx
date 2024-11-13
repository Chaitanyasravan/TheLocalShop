// app/page.tsx

'use client';

import Products from './products/page';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaShoppingCart } from 'react-icons/fa';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({
    address: '123 Main St, Springfield', // Placeholder; replace with actual address post-login
  });
  const router = useRouter();

  useEffect(() => {
    const userLoggedIn = Boolean(localStorage.getItem('token'));
    setIsLoggedIn(userLoggedIn);

    if (userLoggedIn) {
      setUser({
        name: 'John Doe',
        address: '123 Main St, Springfield',
      });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from localStorage
    setIsLoggedIn(false); // Update logged-in state
    router.push('/'); // Redirect to the homepage
  };

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
          <div className="flex items-center flex-grow space-x-6">
            <p className="hidden md:block text-gray-600">
              Delivered to: <span className="font-semibold">{user.address}</span>
            </p>
            <input
              type="text"
              placeholder="Search for products..."
              className="flex-grow max-w-md px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Profile, Contact Us, and Conditional Links */}
          <div className="flex items-center space-x-4">
            <Link href="/profile" className="text-gray-700 hover:text-gray-800">Profile</Link>
            <Link href="/contact" className="text-gray-700 hover:text-gray-800">Contact Us</Link>
            <Link href="/categories" className="text-gray-700 hover:text-gray-800">Categories</Link>

            {isLoggedIn ? (
              <>
                <Link href="/wishlist" className="text-blue-500 hover:text-blue-700">Wishlist</Link>
                <Link href="/orders" className="text-blue-500 hover:text-blue-700">Orders</Link>
              </>
            ) : (
              <>
                <Link href="/login" className="text-blue-500 hover:text-blue-700">Login</Link>
                <Link href="/register" className="text-blue-500 hover:text-blue-700">Sign Up</Link>
              </>
            )}

            {/* Cart Icon */}
            <Link href="/cart" className="text-gray-700 hover:text-gray-800">
              <FaShoppingCart size={24} className="ml-2" />
            </Link>

            {/* Logout Button (only visible when logged in) */}
            {isLoggedIn && (
              <button
                onClick={handleLogout}
                className="text-red-500 hover:text-red-700 font-semibold transition duration-150 ml-4"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-[url('/path/to/hero-image.jpg')] bg-cover bg-center h-[600px] flex items-center justify-center text-center shadow-lg">
        <div className="bg-black bg-opacity-60 text-white p-8 rounded-lg max-w-lg mx-auto">
          <h1 className="text-5xl font-bold mb-6">Welcome to TheLocalShop</h1>
          <p className="text-lg mb-8">
            Discover handcrafted, locally made products that celebrate unique craftsmanship.
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

      {/* Featured Products Section */}
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

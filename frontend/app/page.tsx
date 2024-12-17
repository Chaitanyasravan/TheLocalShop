// app/page.tsx

'use client';

import Products from './products/page';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaShoppingCart, FaSearch } from 'react-icons/fa';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({
    address: '123 Main St, Springfield',
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
    if (confirm('Are you sure you want to log out?')) {
      localStorage.removeItem('token');
      setIsLoggedIn(false);
      router.push('/');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Navbar */}
      <nav className="bg-white shadow-md py-4 px-8">
        <div className="container mx-auto flex items-center justify-between">
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => router.push('/')}
          >
            <div className="logo"></div>
            <h1 className="text-xl font-bold text-gray-800">TheLocalShop</h1>
          </div>

          {/* Search Bar */}
          <div className="relative flex-grow mx-6">
            <input
              type="text"
              placeholder="Search for products..."
              className="w-full px-4 py-3 border rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white p-2 rounded-full shadow-lg hover:bg-blue-600"
            >
              <FaSearch size={18} className="text-white" />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-6">
            {!isLoggedIn ? (
              <>
                <button
                  onClick={() => router.push('/seller-home')}
                  className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 px-4 rounded-lg"
                >
                  Become a Seller
                </button>
                <button
                  onClick={() => router.push('/about')}
                  className="text-gray-700 hover:text-gray-800 font-semibold"
                >
                  About
                </button>
              </>
            ) : (
              <Link href="/profile" className="text-gray-700 hover:text-gray-800">
                Profile
              </Link>
            )}
            <Link href="/contact" className="text-gray-700 hover:text-gray-800">
              Contact Us
            </Link>
            <Link href="/categories" className="text-gray-700 hover:text-gray-800">
              Categories
            </Link>

            {isLoggedIn ? (
              <>
                <Link href="/wishlist" className="text-blue-500 hover:text-blue-700">
                  Wishlist
                </Link>
                <Link href="/orders" className="text-blue-500 hover:text-blue-700">
                  Orders
                </Link>
                <Link href="/cart" className="text-gray-700 hover:text-gray-800">
                  <FaShoppingCart size={24} className="ml-2" />
                </Link>
              </>
            ) : (
              <>
                <Link href="/login" className="text-blue-500 hover:text-blue-700">
                  Login
                </Link>
                <Link href="/register" className="text-blue-500 hover:text-blue-700">
                  Sign Up
                </Link>
              </>
            )}

            {isLoggedIn && (
              <button
                onClick={handleLogout}
                className="text-red-500 hover:text-red-700 font-semibold ml-4"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-image flex items-center justify-center text-center relative">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-70"></div>
        <div className="relative z-10 text-white max-w-2xl mx-auto">
          <h1 className="text-6xl font-bold mb-6">Discover Local Products</h1>
          <p className="text-xl mb-8">
            Connect with local artisans and find handcrafted treasures near you.
          </p>
          <div className="flex justify-center space-x-4">
            <Link href="/products">
              <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3 px-6 rounded-full shadow-md">
                Shop Now
              </button>
            </Link>
            <Link href="/seller-home">
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-full shadow-md">
                Become a Seller
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-100">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold">Discover Categories</h2>
          <p className="text-gray-600">Find products across various categories curated for you.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-7xl mx-auto px-4">
          {['Home Decor', 'Clothing', 'Jewelry', 'Art'].map((category) => (
            <div
              key={category}
              className="bg-white shadow-md rounded-lg p-6 flex items-center justify-center text-center"
            >
              <h3 className="text-lg font-semibold">{category}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-white border-t border-gray-200">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold">Featured Products</h2>
          <p className="text-gray-600">Explore handcrafted products from local artisans.</p>
        </div>

        {/* Include Products Component */}
        <Products />
      </section>

      {/* Footer */}
      <footer className="py-8 bg-gray-900 text-white text-center">
        <p>© {new Date().getFullYear()} TheLocalShop. All rights reserved.</p>
      </footer>
    </div>
  );
}

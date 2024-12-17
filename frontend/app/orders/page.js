// app/orders/page.js

'use client';

import React, { useEffect, useState } from 'react';
import api from '../utils/api';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await api.get('/orders');
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const cancelOrder = async (orderId) => {
    try {
      await api.post(`/orders/${orderId}/cancel`);
      alert('Order cancelled successfully.');
      fetchOrders();
    } catch (error) {
      console.error('Error cancelling order:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-4xl font-bold text-center mb-6">Your Orders</h1>
      {orders.length === 0 ? (
        <p className="text-lg text-gray-600 text-center">You have no orders.</p>
      ) : (
        <div className="space-y-6">
          {orders.map(order => (
            <div key={order._id} className="bg-white shadow-lg rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-2">Order ID: {order._id}</h2>
              <p className="text-gray-600 mb-2">Status: <span className="font-bold">{order.status}</span></p>
              <ul className="mb-4">
                {order.products.map(item => (
                  <li key={item.product._id} className="text-gray-800">
                    {item.product.name} x {item.quantity} - ${item.product.price * item.quantity}
                  </li>
                ))}
              </ul>
              <p className="font-bold text-lg text-yellow-500">Total: ${order.total}</p>
              <div className="flex space-x-4 mt-4">
                <button
                  onClick={() => cancelOrder(order._id)}
                  className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
                >
                  Cancel
                </button>
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                >
                  Track Shipment
                </button>
                <button
                  className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded"
                >
                  Return
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;

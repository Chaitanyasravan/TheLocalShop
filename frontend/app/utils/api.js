// frontend/utils/api.js

import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5001/api', // Backend API URL
});

// Automatically attach token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // General User Token
  const vendorToken = localStorage.getItem('vendorToken'); // Vendor Token

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else if (vendorToken) {
    config.headers.Authorization = `Bearer ${vendorToken}`;
  }
  return config;
});

export default api;

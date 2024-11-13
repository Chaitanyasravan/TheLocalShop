// frontend/utils/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // Uses the URL set in .env.local
});

export default api;

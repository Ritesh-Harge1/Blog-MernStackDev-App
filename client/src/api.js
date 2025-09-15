import axios from "axios";

const api = axios.create({
  baseURL: 'https://blog-mernstackdev-app-server.onrender.com';
});

// Attach token for protected routes
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;

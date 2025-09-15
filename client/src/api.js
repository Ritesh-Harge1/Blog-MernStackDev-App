import axios from "axios";
const API = 'https://blog-mernstackdev-app-server.onrender.com/api';

export const api = axios.create({ baseURL: API })


// Attach token for protected routes
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;

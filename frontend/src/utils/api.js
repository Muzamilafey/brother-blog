import axios from "axios";

// ✅ Use live API in production, localhost during local dev
// Production backend URL on Render
const API_URL = 'https://brother-blog.onrender.com/api';

const getToken = () => localStorage.getItem("token");

export const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});



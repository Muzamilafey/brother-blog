import axios from "axios";

// ✅ Use live API in production, localhost during local dev
const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://brother-blog.onrender.com/api"
    : "http://localhost:5000/api";

const getToken = () => localStorage.getItem("token");

export const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});



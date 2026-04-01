import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

// Public endpoints that don't need a token
const PUBLIC_ENDPOINTS = [
  "/users/register/",
  "/users/login/",
  "/users/token/refresh/",
  "/knowledge/faqs/",
];

API.interceptors.request.use((config) => {
  const isPublic = PUBLIC_ENDPOINTS.some(ep => config.url.includes(ep));

  if (!isPublic) {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// ✅ Auto logout if token is expired (401 response)
API.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default API;
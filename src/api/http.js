// src/api/http.js
import axios from "axios";

const http = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

http.interceptors.request.use(
  (config) => {
    const url = config.url || "";
    const currentPath = window.location.pathname;

    // 🔥 Admin + SuperAdmin alanları
    const isAdminArea =
      currentPath.startsWith("/admin") ||
      currentPath.startsWith("/superadmin") ||
      url.startsWith("/admin") ||
      url.startsWith("/superadmin"); // ekstra güvenlik

    let token;

    if (isAdminArea) {
      // Admin + SuperAdmin login'de kaydettiğimiz token
      token = localStorage.getItem("adminToken");
    } else {
      // normal kullanıcı
      token = localStorage.getItem("authToken");
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    config.headers.Accept = "application/json";

    return config;
  },
  (error) => Promise.reject(error)
);

export default http;

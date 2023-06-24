import axios from "axios";

function getTokenFromLocalStorage() {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
}

const api = axios.create({
  baseURL: "http://192.168.1.9:8080",
  timeout: 5000,
  withCredentials: true,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
    Authorization: "", // Remova o valor inicial em branco
  },
});

api.interceptors.request.use((config) => {
  const token = getTokenFromLocalStorage();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;

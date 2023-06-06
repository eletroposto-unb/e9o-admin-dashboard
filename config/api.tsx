import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // Defina a URL base da sua API
  timeout: 5000, // Tempo máximo de espera por uma resposta (opcional)
  withCredentials: true,
  headers: {
    "X-Requested-With": "XMLHttpRequest"
  },
});

export default api;

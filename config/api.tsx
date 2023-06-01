import axios from "axios";

const api = axios.create({
  baseURL: "https://api.eletrogama.online", // Defina a URL base da sua API
  timeout: 5000, // Tempo máximo de espera por uma resposta (opcional)
  withCredentials: true,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
  },
});

export default api;

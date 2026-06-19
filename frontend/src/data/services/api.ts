import axios from "axios";

export const api = axios.create({
  baseURL: "https://class-scheduling.up.railway.app",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,

  (error) => {
    if (error.response?.status === 401) {
      console.warn("[AUTH] Token expirado ou inválido");

      localStorage.removeItem("token");

      window.dispatchEvent(
        new CustomEvent("logout")
      );
    }

    return Promise.reject(error);
  }
);
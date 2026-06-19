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
    const status = error.response?.status;

    if (status === 401 || status === 403) {
      localStorage.removeItem("token");
      window.dispatchEvent(
        new CustomEvent("logout")
      );
    }

    return Promise.reject(error);
  }
);
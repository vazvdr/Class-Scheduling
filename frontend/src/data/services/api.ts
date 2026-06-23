import axios from "axios";

export const api = axios.create({
  baseURL: "https://class-scheduling.up.railway.app/",
  withCredentials: true,
});

let accessToken: string | null = null;

export function setAccessToken(
  token: string | null
) {
  accessToken = token;
}

api.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

let refreshing = false;
let queue: any[] = [];

function processQueue(error: any, token: string | null = null) {
  queue.forEach(promise => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve(token);
    }
  });
  queue = [];
}

api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (refreshing) {
        return new Promise((resolve, reject) => {
          queue.push({
            resolve,
            reject,
          });
        }).then(token => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest);
        });
      }
      originalRequest._retry = true;
      refreshing = true;
      try {
        const response = await api.post("/usuarios/refresh");
        const newToken = response.data.token;
        setAccessToken(newToken);
        processQueue(null, newToken);
        originalRequest.headers.Authorization =
          `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        setAccessToken(null);
        window.dispatchEvent(
          new CustomEvent("logout")
        );
        return Promise.reject(refreshError);
      } finally {
        refreshing = false;
      }
    }
    return Promise.reject(error);
  }
);
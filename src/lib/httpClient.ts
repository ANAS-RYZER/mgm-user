import axios from "axios";

const KEY = {
  accessToken: "accessToken",
  refreshToken: "refreshToken",
  token: "token",
  email: "email",
} as const;

const isBrowser = () => typeof window !== "undefined";

export const auth = {
  getAccessToken: () => (isBrowser() ? sessionStorage.getItem(KEY.accessToken) : null),
  getRefreshToken: () => (isBrowser() ? sessionStorage.getItem(KEY.refreshToken) : null),
  getToken: () => (isBrowser() ? sessionStorage.getItem(KEY.token) : null),
  getEmail: () => (isBrowser() ? sessionStorage.getItem(KEY.email) : null),

  setAuth: (data: { accessToken: string; refreshToken: string; email?: string }) => {
    if (!isBrowser()) return;
    sessionStorage.setItem(KEY.accessToken, data.accessToken);
    sessionStorage.setItem(KEY.refreshToken, data.refreshToken);
    if (data.email) sessionStorage.setItem(KEY.email, data.email);
  },

  setSignupSession: (data: { token: string; email: string }) => {
    if (!isBrowser()) return;
    sessionStorage.setItem(KEY.token, data.token);
    sessionStorage.setItem(KEY.email, data.email);
  },

  clearSignupSession: () => {
    if (!isBrowser()) return;
    sessionStorage.removeItem(KEY.token);
    sessionStorage.removeItem(KEY.email);
  },

  setAccessToken: (accessToken: string) => {
    if (!isBrowser()) return;
    sessionStorage.setItem(KEY.accessToken, accessToken);
  },

  clear: () => {
    if (!isBrowser()) return;
    Object.values(KEY).forEach((k) => sessionStorage.removeItem(k));
  },
};

export const apiClient = axios.create({
  baseURL: "http://localhost:5050",
  headers: { "Content-Type": "application/json" },
});

apiClient.interceptors.request.use((config) => {
  const token = auth.getAccessToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

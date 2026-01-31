import axios from "axios";
import { session } from "./session";

export const apiClient = axios.create({
  // baseURL: "https://mgm-backend.vercel.app",
      baseURL  : "http://localhost:5050" ,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const token = session.getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});



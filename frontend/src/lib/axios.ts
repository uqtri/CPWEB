import axios from "axios";

console.log(import.meta.env.VITE_BACKEND_URL, "BACKEND_URL");
export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const axiosFormDataInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  headers: {
    "Content-Type": "multipart/form-data",
  },
  withCredentials: true,
});

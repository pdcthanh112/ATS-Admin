import axios from "axios";
import { store } from "../redux/store";

const API = axios.create({
  baseURL: "https://ats-fu-be.azurewebsites.net/",
  headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.request.use(
  (config) => {
    if (config.headers) {
      if (!config.headers.Authorization) {
        const token = store.getState().auth.login.currentUser?.token;

        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default API;
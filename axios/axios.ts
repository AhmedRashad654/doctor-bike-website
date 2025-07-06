import axios from "axios";
import Cookies from "js-cookie";

export const request = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

request.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token_doctor_bike_website");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

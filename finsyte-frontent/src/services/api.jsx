// src/services/api.jsx
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/api/v1/users", // ✅ do not repeat this later
  withCredentials: true, // for cookies
});

export default axiosInstance;

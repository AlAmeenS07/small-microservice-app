import axios from "axios"

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000", // API Gateway
  withCredentials: true, // 🔥 important for cookies
  headers: {
    "Content-Type": "application/json",
  },
})

export default axiosInstance
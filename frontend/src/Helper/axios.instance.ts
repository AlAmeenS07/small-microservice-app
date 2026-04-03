import axios from "axios"

const axiosInstance = axios.create({
  baseURL: "/", // goes through Ingress → routes to api-gateway
  withCredentials: true, 
  headers: {
    "Content-Type": "application/json",
  },
})

export default axiosInstance
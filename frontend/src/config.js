import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://youtube-final-server.onrender.com/api",
  withCredentials: true,
});

// baseURL: "https://youtube-final-server.onrender.com/api" Final API
// baseURL: "https://youtube-server-api.vercel.app/api"
// baseURL: "https://youtube-server-f7jy.onrender.com/api"
// http://localhost:5000

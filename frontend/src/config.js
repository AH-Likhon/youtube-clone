import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://youtube-server-f7jy.onrender.com/api",
  withCredentials: true,
});

// baseURL: "https://youtube-server-api.vercel.app/api"
// baseURL: "https://youtube-server-f7jy.onrender.com/api"
// http://localhost:5000

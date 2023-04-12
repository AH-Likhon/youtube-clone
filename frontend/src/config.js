import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true
})

  // baseURL: "https://youtube-pr.herokuapp.com/api"
  // http://localhost:5000
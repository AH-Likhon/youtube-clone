import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://youtube-pr.herokuapp.com/api",
  withCredentials: true
})

  // baseURL: "https://youtube-pr.herokuapp.com/api"
  // http://localhost:5000
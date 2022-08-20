import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "https://youtube-pr.herokuapp.com/api"
})
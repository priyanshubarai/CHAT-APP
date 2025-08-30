import axios from "axios"

const axiosInstance = axios.create({
    baseURL: "https://localhost:7000/api",
    withCredentials: true,
})

export default axiosInstance
import axios from "axios";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
});

// Token JWT
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if(token){
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Handle Token Invalid/Expired
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if(error.response) {
            const status = error.response.status;

            if(status === 401 || status === 403) {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                window.location.href = "/";
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
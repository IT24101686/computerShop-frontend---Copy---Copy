import axios from "axios";

const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_API_URI,
    headers: {
        "Content-Type": "application/json",
    },
});

// Request interceptor - auto add token
axiosClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor - handle 401 (unauthorized) → auto logout
axiosClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.clear();
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

export default axiosClient;

import axios from 'axios';

// Create an Axios instance
const api = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL || '/api',
    timeout: 10000, // 10 seconds timeout
});

// Request interceptor to add the token to headers
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor for global error handling
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            // Handle specific status codes if needed
            if (error.response.status === 401) {
                // Optionally, you can trigger a logout or redirect to login
                // window.location.href = '/login';
                console.warn('Unauthorized access - perhaps redirect to login');
            }
        }
        return Promise.reject(error);
    }
);

export default api;

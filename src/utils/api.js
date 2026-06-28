import axios from 'axios';

console.log('VITE_API_BASE_URL from env:', import.meta.env.VITE_API_BASE_URL);

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000',

    headers: {
        'Content-Type': 'application/json',
        // PENTING: Header ini digunakan untuk melewati halaman peringatan ngrok
        // saat pertama kali diakses oleh aplikasi frontend
        'ngrok-skip-browser-warning': 'true'
    }
});

// Interceptor untuk menambahkan token JWT secara otomatis ke request header
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('userToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;

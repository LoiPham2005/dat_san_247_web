import axios, { AxiosError, AxiosInstance } from 'axios';
import { useAuthStore } from '@/lib/store/auth.store';
import { signOut } from 'next-auth/react';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';

const axiosInstance: AxiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        // Check if running on client side before accessing store
        if (typeof window !== 'undefined') {
            const token = useAuthStore.getState().token;
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        if (error.response?.status === 401) {
            if (typeof window !== 'undefined') {
                useAuthStore.getState().logout();
                signOut({ callbackUrl: '/login' });
            }
        }
        // Extract error message from our standard API response format if available
        const errorData = error.response?.data as any;
        if (errorData && errorData.message) {
            error.message = errorData.message;
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;

import axios, { AxiosError, AxiosInstance } from 'axios';
import { useAuthStore } from '@/lib/store/auth.store';
import { signOut } from 'next-auth/react';
import { logger } from '@/lib/utils/logger';

const rawBaseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';
// Đảm bảo URL luôn bắt đầu bằng http hoặc https
const BASE_URL = rawBaseUrl.startsWith('http') ? rawBaseUrl : `https://${rawBaseUrl}`;

if (typeof window !== 'undefined') {
    console.log('🌐 [Client Axios] URL:', BASE_URL);
}

const axiosInstance: AxiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Helper to sanitize sensitive data
const sanitizeData = (data: any) => {
    if (!data) return data;
    try {
        const safeData = JSON.parse(JSON.stringify(data)); // Deep clone simple object
        const sensitiveKeys = ['password', 'newPassword', 'oldPassword', 'token', 'accessToken', 'refreshToken'];

        // Simple recursive sanitization function
        const sanitize = (obj: any) => {
            for (const key in obj) {
                if (obj.hasOwnProperty(key)) {
                    if (sensitiveKeys.includes(key)) {
                        obj[key] = '***';
                    } else if (typeof obj[key] === 'object' && obj[key] !== null) {
                        sanitize(obj[key]);
                    }
                }
            }
        };
        sanitize(safeData);
        return safeData;
    } catch (e) {
        return data;
    }
};

// Request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        // Attach start time for duration calculation
        (config as any).metadata = { startTime: Date.now() };

        // Log Request
        const method = config.method?.toUpperCase() || 'GET';
        const url = config.url;
        const safeBody = sanitizeData(config.data);
        const safeParams = sanitizeData(config.params);

        logger.group(`🚀 [API Request] ${method} ${url}`, '#3b82f6', '\x1b[36m');
        if (config.params) logger.info('Params:', safeParams);
        if (config.data) logger.info('Body:', safeBody);

        logger.groupEnd();

        // Check if running on client side before accessing store
        if (typeof window !== 'undefined') {
            const token = useAuthStore.getState().token;
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => {
        logger.error('API Request Error', error);
        return Promise.reject(error);
    }
);

// Response interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        const startTime = (response.config as any).metadata?.startTime;
        const duration = startTime ? Date.now() - startTime : '?';
        const method = response.config.method?.toUpperCase();
        const url = response.config.url;

        logger.group(`✅ [API Response] ${method} ${url} (${duration}ms)`, '#22c55e', '\x1b[32m');
        logger.success(`Status: ${response.status}`);
        // Optional: Log data if needed, but keeping it minimal for cleaner console
        // logger.info('Data:', response.data); 
        logger.groupEnd();

        return response;
    },
    async (error: AxiosError) => {
        const startTime = (error.config as any)?.metadata?.startTime;
        const duration = startTime ? Date.now() - startTime : '?';
        const method = error.config?.method?.toUpperCase();
        const url = error.config?.url;

        logger.group(`❌ [API Error] ${method} ${url} (${duration}ms)`, '#ef4444', '\x1b[31m');
        logger.error(`Status: ${error.response?.status || 'Unknown'}`);
        logger.error(`Message: ${error.message}`);

        if (error.response?.data) {
            logger.error('Error Data:', error.response.data);
        }
        logger.groupEnd();

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

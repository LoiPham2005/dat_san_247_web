import axios from 'axios';
import { getSession, signOut } from 'next-auth/react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';

const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request: đính kèm accessToken
apiClient.interceptors.request.use(
    async (config) => {
        const session = await getSession();
        const token = (session as any)?.user?.accessToken;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response: khi nhận 401 → signOut và redirect về login
apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401) {
            // Sign out next-auth session và chuyển về trang login
            await signOut({ callbackUrl: '/login', redirect: true });
        }
        return Promise.reject(error);
    }
);

export default apiClient;

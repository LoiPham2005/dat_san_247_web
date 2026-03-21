import axios from 'axios';

import { getSession } from 'next-auth/react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';

const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

apiClient.interceptors.request.use(
    async (config) => {
        const session = await getSession();
        const token = (session as any)?.user?.accessToken;
        
        console.log('>>> [AXIOS DEBUG] Request URL:', config.url);
        console.log('>>> [AXIOS DEBUG] Token status:', token ? 'Found' : 'Not Found');

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default apiClient;

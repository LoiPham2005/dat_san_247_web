import axiosInstance from '../axios';
import { API_ENDPOINTS } from '../endpoints';
import { LoginCredentials, RegisterData, User } from '@/types/auth.types';

export const authService = {
    login: async (credentials: LoginCredentials) => {
        const response = await axiosInstance.post(API_ENDPOINTS.LOGIN, credentials);
        return response.data.data;
    },

    register: async (userData: RegisterData) => {
        const response = await axiosInstance.post(API_ENDPOINTS.REGISTER, userData);
        return response.data.data;
    },

    logout: async () => {
        const response = await axiosInstance.post(API_ENDPOINTS.LOGOUT);
        return response.data.data;
    },

    getCurrentUser: async (): Promise<User> => {
        const response = await axiosInstance.post(API_ENDPOINTS.ME);
        return response.data.data;
    },

    refreshToken: async () => {
        const response = await axiosInstance.post(API_ENDPOINTS.REFRESH_TOKEN);
        return response.data.data;
    },
};

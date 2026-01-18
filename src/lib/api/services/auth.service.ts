import axiosInstance from '../axios';
import { API_ENDPOINTS } from '../endpoints';
import { LoginCredentials, RegisterData, User } from '@/types/auth.types';

export const authService = {
    login: async (credentials: LoginCredentials) => {
        const { data } = await axiosInstance.post(API_ENDPOINTS.LOGIN, credentials);
        return data.data;
    },

    register: async (userData: RegisterData) => {
        const { data } = await axiosInstance.post(API_ENDPOINTS.REGISTER, userData);
        return data.data;
    },

    logout: async () => {
        const { data } = await axiosInstance.post(API_ENDPOINTS.LOGOUT);
        return data.data;
    },

    getCurrentUser: async (): Promise<User> => {
        const { data } = await axiosInstance.post(API_ENDPOINTS.ME);
        return data.data;
    },

    refreshToken: async () => {
        const { data } = await axiosInstance.post(API_ENDPOINTS.REFRESH_TOKEN);
        return data.data;
    },
};

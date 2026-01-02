import axiosInstance from '../axios';
import { API_ENDPOINTS } from '../endpoints';
import { UserProfile, UpdateProfileData } from '@/types/user.types';

export const userService = {
    getProfile: async (): Promise<UserProfile> => {
        const { data } = await axiosInstance.get(API_ENDPOINTS.ME);
        return data;
    },

    updateProfile: async (data: UpdateProfileData): Promise<UserProfile> => {
        // Assuming endpoint for update is /users/profile or similar, adjusting usually strictly to ME or specific ID
        // For now assuming a hypothetical /users/profile endpoint or PUT to ME
        const { data: response } = await axiosInstance.put(`${API_ENDPOINTS.USERS}/profile`, data);
        return response;
    },

    getById: async (id: string): Promise<UserProfile> => {
        const { data } = await axiosInstance.get(API_ENDPOINTS.USER_BY_ID(id));
        return data;
    }
};

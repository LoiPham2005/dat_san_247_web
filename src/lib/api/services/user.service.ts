import axiosInstance from '../axios';
import { API_ENDPOINTS } from '../endpoints';

export const userService = {
    getProfile: async (): Promise<any> => {
        const response = await axiosInstance.get(API_ENDPOINTS.PROFILE);
        return response.data;
    },

    updateProfile: async (data: any): Promise<any> => {
        const response = await axiosInstance.put(API_ENDPOINTS.PROFILE, data);
        return response.data;
    },

    changePassword: async (data: any): Promise<any> => {
        const response = await axiosInstance.patch(API_ENDPOINTS.CHANGE_PASSWORD, data);
        return response.data;
    },

    // Admin Methods
    getUsers: async (params?: any): Promise<any> => {
        const response = await axiosInstance.get(API_ENDPOINTS.ADMIN_USERS, { params });
        // Return the 'data' field which contains { items, meta }
        return response.data.data || response.data;
    },

    createUser: async (data: any): Promise<any> => {
        const response = await axiosInstance.post(API_ENDPOINTS.ADMIN_USERS, data);
        return response.data.data || response.data;
    },

    updateUser: async (id: string, data: any): Promise<any> => {
        const response = await axiosInstance.put(API_ENDPOINTS.ADMIN_USER_BY_ID(id), data);
        return response.data.data || response.data;
    },

    deleteUser: async (id: string): Promise<any> => {
        const response = await axiosInstance.delete(API_ENDPOINTS.ADMIN_USER_BY_ID(id));
        return response.data.data || response.data;
    },

    toggleStatus: async (id: string): Promise<any> => {
        const response = await axiosInstance.post(`${API_ENDPOINTS.ADMIN_USER_BY_ID(id)}/toggle-status`);
        return response.data.data || response.data;
    },

    restoreUser: async (id: string): Promise<any> => {
        const response = await axiosInstance.post(`${API_ENDPOINTS.ADMIN_USER_BY_ID(id)}/restore`);
        return response.data.data || response.data;
    },
};

export default userService;

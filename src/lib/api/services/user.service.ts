import axiosInstance from "../axios";
import { UserRole } from "@/types/auth.types";
import { API_ENDPOINTS } from "../endpoints";

export interface UserFilter {
    page?: number;
    limit?: number;
    role?: UserRole;
    search?: string;
    isActive?: boolean | string;
}

export const userService = {
    getUsers: async (filter: UserFilter = {}) => {
        const { data } = await axiosInstance.get(API_ENDPOINTS.ADMIN_USERS, { params: filter });
        return data.data;
    },

    createUser: async (data: any) => {
        const response = await axiosInstance.post(API_ENDPOINTS.ADMIN_USERS, data);
        return response.data.data;
    },

    getUserById: async (id: string) => {
        const { data: result } = await axiosInstance.get(API_ENDPOINTS.ADMIN_USER_BY_ID(id));
        return result.data;
    },

    updateUser: async (id: string, data: any) => {
        const { data: result } = await axiosInstance.put(API_ENDPOINTS.ADMIN_USER_BY_ID(id), data);
        return result.data;
    },

    toggleUserStatus: async (id: string) => {
        const { data } = await axiosInstance.post(`${API_ENDPOINTS.ADMIN_USER_BY_ID(id)}/toggle-status`);
        return data.data;
    },

    deleteUser: async (id: string) => {
        const { data } = await axiosInstance.delete(API_ENDPOINTS.ADMIN_USER_BY_ID(id));
        return data.data;
    },
};

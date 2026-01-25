import axiosInstance from '../axios';
import { API_ENDPOINTS } from '../endpoints';

export const dashboardService = {
    getOwnerOverview: async (): Promise<any> => {
        const { data } = await axiosInstance.get(API_ENDPOINTS.OWNER_DASHBOARD_OVERVIEW);
        return data.data;
    },

    getOwnerRevenueChart: async (): Promise<any> => {
        const { data } = await axiosInstance.get(API_ENDPOINTS.OWNER_DASHBOARD_REVENUE);
        return data.data;
    },

    getAdminOverview: async (): Promise<any> => {
        const { data } = await axiosInstance.get(API_ENDPOINTS.ADMIN_DASHBOARD_OVERVIEW);
        return data.data;
    },

    getAdminRevenueChart: async (): Promise<any> => {
        const { data } = await axiosInstance.get(API_ENDPOINTS.ADMIN_DASHBOARD_REVENUE);
        return data.data;
    },

    getAdminTopVenues: async (): Promise<any> => {
        const { data } = await axiosInstance.get(API_ENDPOINTS.ADMIN_DASHBOARD_TOP_VENUES);
        return data.data;
    },

    getAdminTopCustomers: async (): Promise<any> => {
        const { data } = await axiosInstance.get(API_ENDPOINTS.ADMIN_DASHBOARD_TOP_CUSTOMERS);
        return data.data;
    },

    getAdminSportDistribution: async (): Promise<any> => {
        const { data } = await axiosInstance.get(API_ENDPOINTS.ADMIN_DASHBOARD_SPORT_DISTRIBUTION);
        return data.data;
    }
};

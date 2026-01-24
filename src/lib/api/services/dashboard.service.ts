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
    }
};

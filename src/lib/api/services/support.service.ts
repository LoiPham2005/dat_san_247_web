import axiosInstance from '../axios';
import { API_ENDPOINTS } from '../endpoints';

export const supportService = {
    createTicket: async (data: any): Promise<any> => {
        const response = await axiosInstance.post(API_ENDPOINTS.SUPPORT_TICKETS, data);
        return response.data;
    },

    submitContact: async (data: any): Promise<any> => {
        const response = await axiosInstance.post(API_ENDPOINTS.SUPPORT_CONTACT, data);
        return response.data;
    },
};

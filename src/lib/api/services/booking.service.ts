import axiosInstance from '../axios';
import { API_ENDPOINTS } from '../endpoints';

export const bookingService = {
    create: async (data: any): Promise<any> => {
        const response = await axiosInstance.post(API_ENDPOINTS.BOOKINGS, data);
        return response.data;
    },

    getMyBookings: async (params?: any): Promise<any> => {
        const response = await axiosInstance.get(API_ENDPOINTS.MY_BOOKINGS, { params });
        return response.data;
    },

    getById: async (id: string): Promise<any> => {
        const response = await axiosInstance.get(API_ENDPOINTS.BOOKING_BY_ID(id));
        return response.data;
    },

    cancel: async (id: string, reason?: string): Promise<any> => {
        const response = await axiosInstance.post(API_ENDPOINTS.CANCEL_BOOKING(id), { reason });
        return response.data;
    },

    reschedule: async (id: string, data: any): Promise<any> => {
        const response = await axiosInstance.post(API_ENDPOINTS.RESCHEDULE_BOOKING(id), data);
        return response.data;
    },

    requestInvoice: async (id: string, data: any): Promise<any> => {
        const response = await axiosInstance.post(API_ENDPOINTS.REQUEST_INVOICE(id), data);
        return response.data;
    },

    // Owner Bookings
    getOwnerBookings: async (params?: any): Promise<any> => {
        const response = await axiosInstance.get(API_ENDPOINTS.OWNER_BOOKINGS, { params });
        return response.data;
    },

    ownerConfirm: async (id: string): Promise<any> => {
        const response = await axiosInstance.post(API_ENDPOINTS.OWNER_BOOKING_ACTION(id, 'confirm'));
        return response.data;
    },

    ownerCheckIn: async (id: string): Promise<any> => {
        const response = await axiosInstance.post(API_ENDPOINTS.OWNER_BOOKING_ACTION(id, 'check-in'));
        return response.data;
    },

    ownerComplete: async (id: string): Promise<any> => {
        const response = await axiosInstance.post(API_ENDPOINTS.OWNER_BOOKING_ACTION(id, 'complete'));
        return response.data;
    },

    ownerCancel: async (id: string, reason: string): Promise<any> => {
        const response = await axiosInstance.post(API_ENDPOINTS.OWNER_BOOKING_ACTION(id, 'cancel'), { reason });
        return response.data;
    },

    createWalkIn: async (data: any): Promise<any> => {
        const response = await axiosInstance.post(API_ENDPOINTS.OWNER_BOOKINGS, data);
        return response.data;
    }
};

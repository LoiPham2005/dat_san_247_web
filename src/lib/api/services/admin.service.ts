import axiosInstance from '../axios';
import { API_ENDPOINTS } from '../endpoints';

export const adminService = {
    // Tickets/Reports
    getTickets: async (params?: any): Promise<any> => {
        const { data } = await axiosInstance.get(API_ENDPOINTS.ADMIN_TICKETS, { params });
        return data.data;
    },

    getTicketById: async (id: string): Promise<any> => {
        const { data } = await axiosInstance.get(API_ENDPOINTS.ADMIN_TICKET_BY_ID(id));
        return data.data;
    },

    updateTicket: async (id: string, updateData: any): Promise<any> => {
        const { data } = await axiosInstance.put(API_ENDPOINTS.ADMIN_TICKET_BY_ID(id), updateData);
        return data.data;
    },

    // Activity Logs
    getActivityLogs: async (params?: any): Promise<any> => {
        const { data } = await axiosInstance.get(API_ENDPOINTS.ADMIN_ACTIVITY_LOGS, { params });
        return data.data;
    },

    // Bookings
    getAllBookings: async (params?: any): Promise<any> => {
        const { data } = await axiosInstance.get(API_ENDPOINTS.ADMIN_ALL_BOOKINGS, { params });
        return data; // Return full response for pagination handling if needed
    },

    getBookingById: async (id: string): Promise<any> => {
        const { data } = await axiosInstance.get(API_ENDPOINTS.ADMIN_BOOKING_BY_ID(id));
        return data.data;
    },

    cancelBooking: async (id: string, reason: string): Promise<any> => {
        const { data } = await axiosInstance.post(API_ENDPOINTS.ADMIN_CANCEL_BOOKING(id), { reason });
        return data;
    },

    refundBooking: async (id: string, amount: number): Promise<any> => {
        const { data } = await axiosInstance.post(API_ENDPOINTS.ADMIN_REFUND_BOOKING(id), { amount });
        return data;
    },
};

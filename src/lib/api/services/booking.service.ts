import axiosInstance from '../axios';
import { API_ENDPOINTS } from '../endpoints';
import { Booking, CreateBookingData } from '@/types/booking.types';

export const bookingService = {
    getAll: async (params?: any): Promise<Booking[]> => {
        const { data } = await axiosInstance.get(API_ENDPOINTS.BOOKINGS, { params });
        return data;
    },

    getMyBookings: async (): Promise<Booking[]> => {
        const { data } = await axiosInstance.get(API_ENDPOINTS.MY_BOOKINGS);
        return data;
    },

    getById: async (id: string): Promise<Booking> => {
        const { data } = await axiosInstance.get(API_ENDPOINTS.BOOKING_BY_ID(id));
        return data;
    },

    create: async (bookingData: CreateBookingData): Promise<Booking> => {
        const { data } = await axiosInstance.post(API_ENDPOINTS.BOOKINGS, bookingData);
        return data;
    },

    cancel: async (id: string): Promise<void> => {
        const { data } = await axiosInstance.post(API_ENDPOINTS.CANCEL_BOOKING(id));
        return data;
    },

    getOwnerBookings: async (params?: any): Promise<any> => {
        const { data } = await axiosInstance.get(API_ENDPOINTS.OWNER_BOOKINGS, { params });
        return data.data;
    },

    updateOwnerBookingStatus: async (id: string, action: string, reason?: string): Promise<any> => {
        const { data } = await axiosInstance.post(API_ENDPOINTS.OWNER_BOOKING_ACTION(id, action), { reason });
        return data.data;
    },
};

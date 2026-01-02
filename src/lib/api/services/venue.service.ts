import axiosInstance from '../axios';
import { API_ENDPOINTS } from '../endpoints';
import { Venue, TimeSlot } from '@/types/venue.types';

export const venueService = {
    getAll: async (params?: any): Promise<Venue[]> => {
        const { data } = await axiosInstance.get(API_ENDPOINTS.VENUES, { params });
        return data;
    },

    getById: async (id: string): Promise<Venue> => {
        const { data } = await axiosInstance.get(API_ENDPOINTS.VENUE_BY_ID(id));
        return data;
    },

    create: async (venueData: Partial<Venue>): Promise<Venue> => {
        const { data } = await axiosInstance.post(API_ENDPOINTS.VENUES, venueData);
        return data;
    },

    update: async (id: string, venueData: Partial<Venue>): Promise<Venue> => {
        const { data } = await axiosInstance.put(API_ENDPOINTS.VENUE_BY_ID(id), venueData);
        return data;
    },

    delete: async (id: string): Promise<void> => {
        await axiosInstance.delete(API_ENDPOINTS.VENUE_BY_ID(id));
    },

    getTimeSlots: async (id: string, date: string): Promise<TimeSlot[]> => {
        const { data } = await axiosInstance.get(API_ENDPOINTS.VENUE_TIMESLOTS(id), {
            params: { date },
        });
        return data;
    },
};

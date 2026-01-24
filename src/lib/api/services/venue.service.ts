import axiosInstance from '../axios';
import { API_ENDPOINTS } from '../endpoints';
import { Venue, TimeSlot } from '@/types/venue.types';

export const venueService = {
    getAll: async (params?: any): Promise<Venue[]> => {
        const { data } = await axiosInstance.get(API_ENDPOINTS.VENUES, { params });
        return data.data;
    },

    getAdminVenues: async (params?: any): Promise<any> => {
        const { data } = await axiosInstance.get(API_ENDPOINTS.ADMIN_VENUES, { params });
        return data.data;
    },

    getById: async (id: string): Promise<Venue> => {
        const { data } = await axiosInstance.get(API_ENDPOINTS.VENUE_BY_ID(id));
        return data.data;
    },

    getOwnerVenueById: async (id: string): Promise<Venue> => {
        const { data } = await axiosInstance.get(API_ENDPOINTS.OWNER_VENUE_BY_ID(id));
        return data.data;
    },

    create: async (venueData: Partial<Venue>): Promise<Venue> => {
        const { data } = await axiosInstance.post(API_ENDPOINTS.VENUES, venueData);
        return data.data;
    },

    update: async (id: string, venueData: Partial<Venue>): Promise<Venue> => {
        const { data } = await axiosInstance.put(API_ENDPOINTS.VENUE_BY_ID(id), venueData);
        return data.data;
    },

    delete: async (id: string): Promise<void> => {
        await axiosInstance.delete(API_ENDPOINTS.VENUE_BY_ID(id));
    },

    getTimeSlots: async (id: string, date: string): Promise<TimeSlot[]> => {
        const { data } = await axiosInstance.get(API_ENDPOINTS.VENUE_TIMESLOTS(id), {
            params: { date },
        });
        return data.data;
    },

    getVenueReviews: async (id: string, params?: any): Promise<any> => {
        const { data } = await axiosInstance.get(`${API_ENDPOINTS.VENUE_BY_ID(id)}/reviews`, { params });
        return data.data;
    },

    // Owner Venues
    getOwnerVenues: async (params?: any): Promise<any> => {
        const { data } = await axiosInstance.get(API_ENDPOINTS.OWNER_VENUES, { params });
        return data.data;
    },

    createOwnerVenue: async (venueData: any): Promise<Venue> => {
        const { data } = await axiosInstance.post(API_ENDPOINTS.OWNER_VENUES, venueData);
        return data.data;
    },

    // Owner Staff
    getOwnerStaff: async (params?: any): Promise<any[]> => {
        const { data } = await axiosInstance.get(API_ENDPOINTS.OWNER_STAFF, { params });
        return data.data;
    },

    addOwnerStaff: async (staffData: any): Promise<any> => {
        const { data } = await axiosInstance.post(API_ENDPOINTS.OWNER_STAFF, staffData);
        return data.data;
    },

    removeOwnerStaff: async (id: string): Promise<void> => {
        await axiosInstance.delete(`${API_ENDPOINTS.OWNER_STAFF}/${id}`);
    },

    // Staff Moderation
    getPendingVenues: async (): Promise<Venue[]> => {
        const { data } = await axiosInstance.get(API_ENDPOINTS.STAFF_PENDING_VENUES);
        return data.data;
    },

    approveVenue: async (id: string): Promise<void> => {
        await axiosInstance.post(API_ENDPOINTS.STAFF_APPROVE_VENUE(id));
    },

    rejectVenue: async (id: string, reason: string): Promise<void> => {
        await axiosInstance.post(API_ENDPOINTS.STAFF_REJECT_VENUE(id), { reason });
    },

    // Owner Courts
    getOwnerCourts: async (venueId: string): Promise<any[]> => {
        const { data } = await axiosInstance.get(API_ENDPOINTS.OWNER_COURTS_BY_VENUE(venueId));
        return data.data;
    },

    createOwnerCourt: async (courtData: any): Promise<any> => {
        const { data } = await axiosInstance.post(API_ENDPOINTS.OWNER_COURTS, courtData);
        return data.data;
    },

    updateOwnerCourt: async (id: string, courtData: any): Promise<any> => {
        const { data } = await axiosInstance.put(API_ENDPOINTS.OWNER_COURTS_BY_ID(id), courtData);
        return data.data;
    },

    deleteOwnerCourt: async (id: string): Promise<void> => {
        await axiosInstance.delete(API_ENDPOINTS.OWNER_COURTS_BY_ID(id));
    },

    updateCourtPricingRules: async (id: string, rules: any[]): Promise<void> => {
        await axiosInstance.put(API_ENDPOINTS.OWNER_COURT_PRICING_RULES(id), { rules });
    },
};

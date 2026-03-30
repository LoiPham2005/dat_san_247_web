import apiClient from '@/lib/api/axios';

export type VenueStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'SUSPENDED';
export type VerificationStatus = 'PENDING' | 'VERIFIED' | 'REJECTED' | 'EXPIRED';
export type DayOfWeek = 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY' | 'SUNDAY';

export interface OwnerVenue {
    id: string;
    name: string;
    description: string | null;
    address: string;
    city: string;
    district: string;
    phone: string | null;
    status: VenueStatus;
    auto_accept_bookings: boolean;
    min_booking_hours: number;
    max_booking_hours: number;
    fb_url: string | null;
    instagram_url: string | null;
    rejection_reason: string | null;
    latitude: number | null;
    longitude: number | null;
}

export interface VenueVerification {
    id: string;
    venue_id: string;
    business_license_url: string;
    owner_photo_url: string;
    id_card_front_url: string;
    id_card_back_url: string;
    status: VerificationStatus;
}

export interface VenueOperatingHour {
    id: string;
    venue_id: string;
    day_of_week: DayOfWeek;
    opening_time: string; // HH:mm format
    closing_time: string;
    is_closed: boolean;
}

export const ownerVenueApi = {
    getMyVenues: async (): Promise<OwnerVenue[]> => {
        const response = await apiClient.get('/owner/venues');
        return response.data.data;
    },

    getDashboardStats: async (): Promise<any> => {
        const response = await apiClient.get('/owner/venues/dashboard/stats');
        return response.data.data;
    },

    getVenueDetail: async (id: string): Promise<OwnerVenue> => {
        const response = await apiClient.get(`/owner/venues/${id}`);
        return response.data.data;
    },

    createVenue: async (data: Partial<OwnerVenue>): Promise<OwnerVenue> => {
        const response = await apiClient.post('/owner/venues', data);
        return response.data.data;
    },

    updateVenue: async (id: string, data: Partial<OwnerVenue>): Promise<OwnerVenue> => {
        const response = await apiClient.patch(`/owner/venues/${id}`, data);
        return response.data.data;
    },

    getVerification: async (venueId: string): Promise<VenueVerification | null> => {
        const response = await apiClient.get(`/owner/venues/${venueId}/verification`);
        return response.data.data;
    },

    submitVerification: async (venueId: string, data: Partial<VenueVerification>): Promise<VenueVerification> => {
        const response = await apiClient.post(`/owner/venues/${venueId}/verification`, data);
        return response.data.data;
    },

    getOperatingHours: async (venueId: string): Promise<VenueOperatingHour[]> => {
        const response = await apiClient.get(`/owner/venues/${venueId}/operating-hours`);
        return response.data.data;
    },

    updateOperatingHour: async (id: string, data: Partial<VenueOperatingHour>): Promise<VenueOperatingHour> => {
        const response = await apiClient.patch(`/owner/venues/operating-hours/${id}`, data);
        return response.data.data;
    },

    updateOperatingHours: async (venueId: string, hours: Partial<VenueOperatingHour>[]): Promise<VenueOperatingHour[]> => {
        const response = await apiClient.patch(`/owner/venues/${venueId}/operating-hours`, { hours });
        return response.data.data;
    },

    deleteVenue: async (id: string): Promise<void> => {
        await apiClient.delete(`/owner/venues/${id}`);
    }
};

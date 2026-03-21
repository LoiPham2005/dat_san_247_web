export type VenueStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'SUSPENDED';

export interface AdminVenue {
    id: string;
    name: string;
    city: string;
    district: string;
    owner_name: string;
    owner_email: string;
    status: VenueStatus;
    is_featured: boolean;
    featured_until: string | null;
    commission_rate: number;
    rating: number;
    total_reviews: number;
    created_at: string;
    admin_notes: string | null;
}

import apiClient from '@/lib/api/axios';

export const adminVenueApi = {
    getVenues: async (): Promise<AdminVenue[]> => {
        const response = await apiClient.get('/admin/venues');
        return response.data?.data || [];
    },
    updateStatus: async (id: string, status: VenueStatus): Promise<AdminVenue> => {
        const response = await apiClient.patch(`/admin/venues/${id}/status`, { status });
        return response.data?.data;
    },
    updateFeatured: async (id: string, is_featured: boolean): Promise<AdminVenue> => {
        const response = await apiClient.patch(`/admin/venues/${id}/featured`, { is_featured });
        return response.data?.data;
    },
    updateCommissionRate: async (id: string, rate: number): Promise<AdminVenue> => {
        const response = await apiClient.patch(`/admin/venues/${id}/commission`, { rate });
        return response.data?.data;
    },
    updateAdminNotes: async (id: string, notes: string): Promise<AdminVenue> => {
        const response = await apiClient.patch(`/admin/venues/${id}/notes`, { notes });
        return response.data?.data;
    }
};

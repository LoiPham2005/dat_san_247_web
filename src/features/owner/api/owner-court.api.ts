export type CourtSurfaceType = 'ARTIFICIAL_GRASS' | 'NATURAL_GRASS' | 'WOOD' | 'CONCRETE' | 'CLAY' | 'SYNTHETIC';

export interface OwnerCourt {
    id: string;
    venue_id: string;
    name: string;
    description: string | null;
    price_per_hour: number;
    surface_type: CourtSurfaceType | null;
    size: string | null;
    is_indoor: boolean;
    is_active: boolean;
    display_order: number;
}

export interface CourtPricingRule {
    id: string;
    court_id: string;
    name: string | null;
    day_of_week: 'MONDAY'|'TUESDAY'|'WEDNESDAY'|'THURSDAY'|'FRIDAY'|'SATURDAY'|'SUNDAY' | null;
    start_time: string; // HH:mm
    end_time: string;   // HH:mm
    price: number;
    start_date: string | null;
    end_date: string | null;
    priority: number;
}

export interface CourtMaintenance {
    id: string;
    court_id: string;
    start_at: string;
    end_at: string;
    reason: string;
    is_emergency: boolean;
}

export interface CourtAmenity {
    id: string;
    court_id: string;
    name: string;
    icon: string | null;
    is_free: boolean;
}

export interface CourtSportAssignment {
    id: string;
    court_id: string;
    sport_type: string;
}

import apiClient from '@/lib/api/axios';

export const ownerCourtApi = {
    getCourtsByVenue: async (venueId: string): Promise<OwnerCourt[]> => {
        const res = await apiClient.get(`/owner/venues/${venueId}/courts`);
        return res.data?.data || [];
    },

    createCourt: async (data: Partial<OwnerCourt>): Promise<OwnerCourt> => {
        const res = await apiClient.post(`/owner/venues/${data.venue_id}/courts`, data);
        return res.data?.data;
    },

    updateCourt: async (id: string, data: Partial<OwnerCourt>): Promise<OwnerCourt> => {
        const res = await apiClient.patch(`/owner/venues/${data.venue_id}/courts/${id}`, data);
        return res.data?.data;
    },

    deleteCourt: async (id: string, venueId: string): Promise<void> => {
        await apiClient.delete(`/owner/venues/${venueId}/courts/${id}`);
    },

    // PRICING RULES
    getPricingRules: async (courtId: string, venueId: string): Promise<CourtPricingRule[]> => {
        const res = await apiClient.get(`/owner/venues/${venueId}/courts/${courtId}/pricing-rules`);
        return res.data?.data || [];
    },

    createPricingRule: async (data: Partial<CourtPricingRule>, venueId: string): Promise<CourtPricingRule> => {
        const res = await apiClient.post(`/owner/venues/${venueId}/courts/${data.court_id}/pricing-rules`, data);
        return res.data?.data;
    },

    deletePricingRule: async (id: string, courtId: string, venueId: string): Promise<void> => {
        await apiClient.delete(`/owner/venues/${venueId}/courts/${courtId}/pricing-rules/${id}`);
    },

    // MAINTENANCE
    getMaintenances: async (courtId: string, venueId: string): Promise<CourtMaintenance[]> => {
        const res = await apiClient.get(`/owner/venues/${venueId}/courts/${courtId}/maintenances`);
        return res.data?.data || [];
    },

    createMaintenance: async (data: Partial<CourtMaintenance>, venueId: string): Promise<CourtMaintenance> => {
        const res = await apiClient.post(`/owner/venues/${venueId}/courts/${data.court_id}/maintenances`, data);
        return res.data?.data;
    },
    
    deleteMaintenance: async (id: string, courtId: string, venueId: string): Promise<void> => {
        await apiClient.delete(`/owner/venues/${venueId}/courts/${courtId}/maintenances/${id}`);
    },

    // AMENITIES
    getAmenities: async (courtId: string, venueId: string): Promise<CourtAmenity[]> => {
        const res = await apiClient.get(`/owner/venues/${venueId}/courts/${courtId}/amenities`);
        return res.data?.data || [];
    },

    createAmenity: async (data: Partial<CourtAmenity>, venueId: string): Promise<CourtAmenity> => {
        const res = await apiClient.post(`/owner/venues/${venueId}/courts/${data.court_id}/amenities`, data);
        return res.data?.data;
    },

    deleteAmenity: async (id: string, courtId: string, venueId: string): Promise<void> => {
        await apiClient.delete(`/owner/venues/${venueId}/courts/${courtId}/amenities/${id}`);
    },

    // SPORTS
    getSports: async (courtId: string, venueId: string): Promise<CourtSportAssignment[]> => {
        const res = await apiClient.get(`/owner/venues/${venueId}/courts/${courtId}/sports`);
        return res.data?.data || [];
    },

    createSport: async (data: Partial<CourtSportAssignment>, venueId: string): Promise<CourtSportAssignment> => {
        const res = await apiClient.post(`/owner/venues/${venueId}/courts/${data.court_id}/sports`, data);
        return res.data?.data;
    },

    deleteSport: async (id: string, courtId: string, venueId: string): Promise<void> => {
        await apiClient.delete(`/owner/venues/${venueId}/courts/${courtId}/sports/${id}`);
    }
};

import { create } from 'zustand';
import { Venue } from '@/types/venue.types';
import { venueService } from '@/lib/api/services/venue.service';

interface VenueStore {
    venues: Venue[];
    activeVenue: Venue | null;
    isLoading: boolean;
    error: string | null;

    fetchVenues: (params?: any) => Promise<void>;
    fetchVenueById: (id: string) => Promise<void>;
    setActiveVenue: (venue: Venue | null) => void;
}

export const useVenueStore = create<VenueStore>((set) => ({
    venues: [],
    activeVenue: null,
    isLoading: false,
    error: null,

    fetchVenues: async (params) => {
        set({ isLoading: true, error: null });
        try {
            const venues = await venueService.getAll(params);
            set({ venues, isLoading: false });
        } catch (error: any) {
            set({ error: error.message || 'Failed to fetch venues', isLoading: false });
        }
    },

    fetchVenueById: async (id) => {
        set({ isLoading: true, error: null });
        try {
            const venue = await venueService.getById(id);
            set({ activeVenue: venue, isLoading: false });
        } catch (error: any) {
            set({ error: error.message || 'Failed to fetch venue details', isLoading: false });
        }
    },

    setActiveVenue: (venue) => set({ activeVenue: venue }),
}));

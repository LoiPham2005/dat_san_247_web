import { create } from 'zustand';
import { Venue } from '@/types/venue.types';
import { venueService } from '@/lib/api/services/venue.service';

interface VenueStore {
    venues: Venue[];
    pagination: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
        hasNextPage: boolean;
        hasPreviousPage: boolean;
    } | null;
    currentFilters: any;
    activeVenue: Venue | null;
    isLoading: boolean;
    error: string | null;

    fetchVenues: (params?: any) => Promise<void>;
    fetchOwnerVenues: (params?: any) => Promise<void>;
    fetchVenueById: (id: string) => Promise<void>;
    addVenue: (data: any) => Promise<void>;
    setActiveVenue: (venue: Venue | null) => void;
    setFilters: (filters: any) => void;
}

export const useVenueStore = create<VenueStore>((set, get) => ({
    venues: [],
    pagination: null,
    currentFilters: {
        search: '',
        sportType: '',
        city: '',
    },
    activeVenue: null,
    isLoading: false,
    error: null,

    fetchVenues: async (params) => {
        set({ isLoading: true, error: null });
        try {
            // Clean empty params to prevent backend validation errors (e.g. empty string for Enum)
            const cleanParams = Object.entries({ ...get().currentFilters, ...params }).reduce((acc, [key, value]) => {
                if (value !== '' && value !== null && value !== undefined) {
                    acc[key] = value;
                }
                return acc;
            }, {} as any);

            const data = await venueService.getAll(cleanParams) as any;

            // Handle both paginated and flat array responses
            if (data && data.items) {
                set({
                    venues: data.items,
                    pagination: data.meta,
                    isLoading: false
                });
            } else {
                set({
                    venues: Array.isArray(data) ? data : [],
                    pagination: null,
                    isLoading: false
                });
            }
        } catch (error: any) {
            set({ error: error.message || 'Failed to fetch venues', isLoading: false });
        }
    },

    fetchOwnerVenues: async (params) => {
        set({ isLoading: true, error: null });
        try {
            const data = await venueService.getOwnerVenues(params);
            set({
                venues: data.items || [],
                pagination: data.meta || null,
                isLoading: false
            });
        } catch (error: any) {
            set({ error: error.message || 'Failed to fetch owner venues', isLoading: false });
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

    addVenue: async (data: any) => {
        set({ isLoading: true, error: null });
        try {
            const newVenue = await venueService.createOwnerVenue(data);
            set((state) => ({
                venues: [newVenue, ...state.venues],
                isLoading: false
            }));
        } catch (error: any) {
            set({ error: error.message || 'Failed to create venue', isLoading: false });
            throw error;
        }
    },

    setActiveVenue: (venue) => set({ activeVenue: venue }),
    setFilters: (filters) => set((state) => ({
        currentFilters: { ...state.currentFilters, ...filters }
    })),
}));

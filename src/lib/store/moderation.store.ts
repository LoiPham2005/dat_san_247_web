import { create } from 'zustand';
import { Venue } from '@/types/venue.types';
import { venueService } from '@/lib/api/services/venue.service';

interface ModerationStore {
    pendingVenues: Venue[];
    isLoading: boolean;
    error: string | null;

    fetchPendingVenues: () => Promise<void>;
    approveVenue: (id: string) => Promise<void>;
    rejectVenue: (id: string, reason: string) => Promise<void>;
}

export const useModerationStore = create<ModerationStore>((set, get) => ({
    pendingVenues: [],
    isLoading: false,
    error: null,

    fetchPendingVenues: async () => {
        set({ isLoading: true, error: null });
        try {
            const data = await venueService.getPendingVenues();
            const venues = Array.isArray(data) ? data : (data as any).items || [];
            set({ pendingVenues: venues, isLoading: false });
        } catch (error: any) {
            set({ error: error.message || 'Failed to fetch pending venues', isLoading: false });
        }
    },

    approveVenue: async (id) => {
        set({ isLoading: true, error: null });
        try {
            await venueService.approveVenue(id);
            set((state) => ({
                pendingVenues: state.pendingVenues.filter(v => v.id !== id),
                isLoading: false
            }));
        } catch (error: any) {
            set({ error: error.message || 'Failed to approve venue', isLoading: false });
            throw error;
        }
    },

    rejectVenue: async (id, reason) => {
        set({ isLoading: true, error: null });
        try {
            await venueService.rejectVenue(id, reason);
            set((state) => ({
                pendingVenues: state.pendingVenues.filter(v => v.id !== id),
                isLoading: false
            }));
        } catch (error: any) {
            set({ error: error.message || 'Failed to reject venue', isLoading: false });
            throw error;
        }
    },
}));

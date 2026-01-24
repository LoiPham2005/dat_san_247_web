import { create } from 'zustand';
import { bookingService } from '@/lib/api/services/booking.service';
import { venueService } from '@/lib/api/services/venue.service';
import { dashboardService } from '@/lib/api/services/dashboard.service';

interface OwnerVenueDetailsState {
    venueId: string | null;
    bookings: any[];
    reviews: any[];
    stats: any | null;
    isLoadingBookings: boolean;
    isLoadingReviews: boolean;
    isLoadingStats: boolean;

    // Actions
    setVenueId: (id: string) => void;
    fetchBookings: () => Promise<void>;
    fetchReviews: () => Promise<void>;
    fetchStats: () => Promise<void>;

    // Booking actions
    updateBookingStatus: (bookingId: string, action: string, reason?: string) => Promise<void>;
}

export const useOwnerVenueDetailsStore = create<OwnerVenueDetailsState>((set, get) => ({
    venueId: null,
    bookings: [],
    reviews: [],
    stats: null,
    isLoadingBookings: false,
    isLoadingReviews: false,
    isLoadingStats: false,

    setVenueId: (id: string) => set({ venueId: id }),

    fetchBookings: async () => {
        const { venueId } = get();
        if (!venueId) return;
        set({ isLoadingBookings: true });
        try {
            const data = await bookingService.getOwnerBookings({ venueId, limit: 100 });
            set({ bookings: data.items, isLoadingBookings: false });
        } catch (error) {
            set({ isLoadingBookings: false });
        }
    },

    fetchReviews: async () => {
        const { venueId } = get();
        if (!venueId) return;
        set({ isLoadingReviews: true });
        try {
            const data = await venueService.getVenueReviews(venueId);
            set({ reviews: data.items, isLoadingReviews: false });
        } catch (error) {
            set({ isLoadingReviews: false });
        }
    },

    fetchStats: async () => {
        set({ isLoadingStats: true });
        try {
            // Dashboard overview might contain stats for all venues of owner, 
            // but for now we use it as a placeholder.
            const data = await dashboardService.getOwnerOverview();
            set({ stats: data, isLoadingStats: false });
        } catch (error) {
            set({ isLoadingStats: false });
        }
    },

    updateBookingStatus: async (bookingId, action, reason) => {
        try {
            await bookingService.updateOwnerBookingStatus(bookingId, action, reason);
            get().fetchBookings();
        } catch (error) {
            console.error('Failed to update booking status', error);
            throw error;
        }
    }
}));

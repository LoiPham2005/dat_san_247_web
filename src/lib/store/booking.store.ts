import { create } from 'zustand';
import { bookingService } from '@/lib/api/services/booking.service';

interface BookingStore {
    bookings: any[];
    pagination: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
    isLoading: boolean;
    error: string | null;
    filters: any;

    fetchOwnerBookings: (params?: any) => Promise<void>;
    confirmBooking: (id: string) => Promise<void>;
    checkInBooking: (id: string) => Promise<void>;
    completeBooking: (id: string) => Promise<void>;
    cancelBooking: (id: string, reason: string) => Promise<void>;
    createWalkIn: (data: any) => Promise<void>;

    // Legacy support for useBooking hook
    setFilters: (filters: any) => void;
    resetFilters: () => void;
    setBookings: (bookings: any[]) => void;
    setLoading: (isLoading: boolean) => void;
    setError: (error: string | null) => void;
}

export const useBookingStore = create<BookingStore>((set, get) => ({
    bookings: [],
    pagination: {
        total: 0,
        page: 1,
        limit: 10,
        totalPages: 0,
    },
    isLoading: false,
    error: null,
    filters: {},

    setFilters: (newFilters) => set((state) => ({ filters: { ...state.filters, ...newFilters } })),
    resetFilters: () => set({ filters: {} }),
    setBookings: (bookings) => set({ bookings }),
    setLoading: (isLoading) => set({ isLoading }),
    setError: (error) => set({ error }),

    fetchOwnerBookings: async (params) => {
        set({ isLoading: true, error: null });
        try {
            const data = await bookingService.getOwnerBookings(params);
            set({
                bookings: data.data.items,
                pagination: data.data.meta,
                isLoading: false
            });
        } catch (error: any) {
            set({ error: error.message || 'Failed to fetch bookings', isLoading: false });
        }
    },

    confirmBooking: async (id) => {
        set({ isLoading: true });
        try {
            await bookingService.ownerConfirm(id);
            // Refresh current list or update item locally
            const { bookings } = get();
            set({
                bookings: bookings.map(b => b.id === id ? { ...b, status: 'CONFIRMED' } : b),
                isLoading: false
            });
        } catch (error: any) {
            set({ error: error.message || 'Failed to confirm booking', isLoading: false });
            throw error;
        }
    },

    checkInBooking: async (id) => {
        set({ isLoading: true });
        try {
            await bookingService.ownerCheckIn(id);
            const { bookings } = get();
            set({
                bookings: bookings.map(b => b.id === id ? { ...b, status: 'CHECKED_IN', checkedInAt: new Date() } : b),
                isLoading: false
            });
        } catch (error: any) {
            set({ error: error.message || 'Failed to check-in', isLoading: false });
            throw error;
        }
    },

    completeBooking: async (id) => {
        set({ isLoading: true });
        try {
            await bookingService.ownerComplete(id);
            const { bookings } = get();
            set({
                bookings: bookings.map(b => b.id === id ? { ...b, status: 'COMPLETED' } : b),
                isLoading: false
            });
        } catch (error: any) {
            set({ error: error.message || 'Failed to complete booking', isLoading: false });
            throw error;
        }
    },

    cancelBooking: async (id, reason) => {
        set({ isLoading: true });
        try {
            await bookingService.ownerCancel(id, reason);
            const { bookings } = get();
            set({
                bookings: bookings.map(b => b.id === id ? { ...b, status: 'CANCELLED', cancellationReason: reason, cancelledAt: new Date() } : b),
                isLoading: false
            });
        } catch (error: any) {
            set({ error: error.message || 'Failed to cancel booking', isLoading: false });
            throw error;
        }
    },

    createWalkIn: async (data) => {
        set({ isLoading: true });
        try {
            await bookingService.createWalkIn(data);
            // Refresh the list
            const currentParams = {}; // Could track params in state if needed
            await get().fetchOwnerBookings(currentParams);
            set({ isLoading: false });
        } catch (error: any) {
            set({ error: error.message || 'Failed to create walk-in', isLoading: false });
            throw error;
        }
    },
}));

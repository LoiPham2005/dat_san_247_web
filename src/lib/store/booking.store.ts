import { create } from 'zustand';
import { Booking } from '@/types/booking.types';
import { bookingService } from '@/lib/api/services/booking.service';

interface BookingStore {
    bookings: Booking[];
    isLoading: boolean;
    error: string | null;

    fetchMyBookings: () => Promise<void>;
    cancelBooking: (id: string) => Promise<void>;
}

export const useBookingStore = create<BookingStore>((set, get) => ({
    bookings: [],
    isLoading: false,
    error: null,

    fetchMyBookings: async () => {
        set({ isLoading: true, error: null });
        try {
            const bookings = await bookingService.getMyBookings();
            set({ bookings, isLoading: false });
        } catch (error: any) {
            set({ error: error.message || 'Failed to fetch bookings', isLoading: false });
        }
    },

    cancelBooking: async (id: string) => {
        set({ isLoading: true, error: null });
        try {
            await bookingService.cancel(id);
            // Optimistic update or refetch
            const currentBookings = get().bookings;
            set({
                bookings: currentBookings.map(b => b.id === id ? { ...b, status: 'CANCELLED' } as any : b),
                isLoading: false
            });
        } catch (error: any) {
            set({ error: error.message || 'Failed to cancel booking', isLoading: false });
        }
    },
}));

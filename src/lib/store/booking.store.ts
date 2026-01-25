import { create } from 'zustand';
import { Booking, BookingStatus } from '@/types/booking.types';

interface BookingFilters {
    search?: string;
    date?: string;
    status?: BookingStatus;
}

interface BookingStore {
    bookings: Booking[];
    isLoading: boolean;
    error: string | null;
    filters: BookingFilters;

    setBookings: (bookings: Booking[]) => void;
    setLoading: (isLoading: boolean) => void;
    setError: (error: string | null) => void;
    setFilters: (filters: Partial<BookingFilters>) => void;
    resetFilters: () => void;
    clearStore: () => void;
}

export const useBookingStore = create<BookingStore>((set) => ({
    bookings: [],
    isLoading: false,
    error: null,
    filters: {
        search: '',
        date: undefined,
        status: undefined,
    },

    setBookings: (bookings) => set({ bookings, isLoading: false, error: null }),
    setLoading: (isLoading) => set({ isLoading }),
    setError: (error) => set({ error, isLoading: false }),
    setFilters: (filters) => set((state) => ({
        filters: { ...state.filters, ...filters }
    })),
    resetFilters: () => set({
        filters: { search: '', date: undefined, status: undefined }
    }),
    clearStore: () => set({
        bookings: [],
        isLoading: false,
        error: null,
        filters: { search: '', date: undefined, status: undefined }
    }),
}));

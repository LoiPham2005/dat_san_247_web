import { useBookingStore } from '@/lib/store/booking.store';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { bookingService } from '@/lib/api/services/booking.service';
import { CreateBookingData } from '@/types/booking.types';

export const useBooking = (params?: any) => {
    const queryClient = useQueryClient();
    const { filters, setFilters, resetFilters, setBookings, setLoading, setError } = useBookingStore();

    const queryParams = { ...filters, ...params };

    const bookingsQuery = useQuery({
        queryKey: ['bookings', queryParams],
        queryFn: async () => {
            setLoading(true);
            try {
                const response = await bookingService.getMyBookings(queryParams);
                // Handle backend TransformInterceptor wrapping:
                // response is { success, statusCode, data: { items, meta } }
                const actualData = response.data || response;
                const bookingsData = actualData.items || (Array.isArray(actualData) ? actualData : []);

                setBookings(bookingsData);
                return bookingsData;
            } catch (err: any) {
                setError(err.message || 'Failed to fetch bookings');
                throw err;
            } finally {
                setLoading(false);
            }
        },
    });

    const createBookingMutation = useMutation({
        mutationFn: (data: CreateBookingData) => bookingService.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['bookings'] });
        },
    });

    const cancelBookingMutation = useMutation({
        mutationFn: (id: string) => bookingService.cancel(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['bookings'] });
        },
    });

    return {
        bookings: bookingsQuery.data || [],
        isLoading: bookingsQuery.isLoading,
        error: bookingsQuery.error,
        refetch: bookingsQuery.refetch,
        filters,
        setFilters,
        resetFilters,
        createBooking: createBookingMutation.mutate,
        isCreating: createBookingMutation.isPending,
        cancelBooking: cancelBookingMutation.mutate,
        isCancelling: cancelBookingMutation.isPending,
    };
};

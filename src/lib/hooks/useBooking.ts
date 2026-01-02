import { useBookingStore } from '@/lib/store/booking.store';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { bookingService } from '@/lib/api/services/booking.service';
import { CreateBookingData } from '@/types/booking.types';

export const useBooking = () => {
    const queryClient = useQueryClient();
    const { bookings, isLoading, error, fetchMyBookings, cancelBooking } = useBookingStore();

    const createBookingMutation = useMutation({
        mutationFn: (data: CreateBookingData) => bookingService.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['bookings'] });
            // Optionally refresh store
            fetchMyBookings();
        },
    });

    return {
        bookings,
        isLoading,
        error,
        fetchMyBookings,
        cancelBooking,
        createBooking: createBookingMutation.mutate,
        isCreating: createBookingMutation.isPending,
    };
};

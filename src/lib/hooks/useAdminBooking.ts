import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminService } from '@/lib/api/services/admin.service';
import { BookingStatus } from '@/types/booking.types';

export const useAdminBooking = (filters?: any) => {
    const queryClient = useQueryClient();

    const bookingsQuery = useQuery({
        queryKey: ['admin-bookings', filters],
        queryFn: async () => {
            const response = await adminService.getAllBookings(filters);
            // Handling the TransformInterceptor wrapper: response.data.items
            return response.data;
        },
    });

    const cancelBookingMutation = useMutation({
        mutationFn: ({ id, reason }: { id: string; reason: string }) =>
            adminService.cancelBooking(id, reason),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-bookings'] });
        },
    });

    const refundBookingMutation = useMutation({
        mutationFn: ({ id, amount }: { id: string; amount: number }) =>
            adminService.refundBooking(id, amount),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-bookings'] });
        },
    });

    return {
        bookings: bookingsQuery.data?.items || [],
        meta: bookingsQuery.data?.meta || {},
        isLoading: bookingsQuery.isLoading,
        error: bookingsQuery.error,
        refetch: bookingsQuery.refetch,
        cancelBooking: cancelBookingMutation.mutate,
        isCancelling: cancelBookingMutation.isPending,
        refundBooking: refundBookingMutation.mutate,
        isRefunding: refundBookingMutation.isPending,
    };
};

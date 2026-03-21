import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminBookingApi, BookingStatus, AdminBooking } from '../api/admin-booking.api';
import { toast } from 'sonner';

export const useAdminBookings = (params?: any) => {
    const queryClient = useQueryClient();

    const bookingsQuery = useQuery({
        queryKey: ['admin_bookings', params],
        queryFn: () => adminBookingApi.getBookings(params),
    });

    const updateStatusMutation = useMutation({
        mutationFn: ({ id, status }: { id: string, status: BookingStatus }) => 
            adminBookingApi.updateStatus(id, status),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin_bookings'] });
            toast.success("Cập nhật trạng thái đơn hàng thành công");
        },
        onError: () => {
            toast.error("Cập nhật trạng thái đơn hàng thất bại");
        }
    });

    return {
        bookings: bookingsQuery.data?.items || [],
        meta: bookingsQuery.data?.meta,
        isLoading: bookingsQuery.isLoading,
        updateStatus: updateStatusMutation.mutate,
        isUpdating: updateStatusMutation.isPending
    };
};

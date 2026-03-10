import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminBookingApi } from '../api/admin-booking.api';
import { toast } from 'sonner';

export const useAdminBookings = () => {
    const queryClient = useQueryClient();

    const bookingsQuery = useQuery({
        queryKey: ['admin_bookings'],
        queryFn: adminBookingApi.getBookings,
    });

    const cancelMutation = useMutation({
        mutationFn: ({ id, reason }: { id: string, reason: string }) => adminBookingApi.adminCancelBooking(id, reason),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['admin_bookings'] });
            toast.success(`Hủy thành công Booking ${data.id}. Đã hoàn tiền ${data.refund_amount}đ.`);
        },
        onError: () => toast.error("Có lỗi xảy ra khi gọi Hủy Booking")
    });

    return {
        bookings: bookingsQuery.data || [],
        isLoading: bookingsQuery.isLoading,
        adminCancelBooking: cancelMutation.mutate,
        isCancelling: cancelMutation.isPending,
    };
};

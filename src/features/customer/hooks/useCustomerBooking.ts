import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { customerBookingApi } from '../api/customer-booking.api';
import { toast } from 'sonner';

export const useCustomerBookings = () => {
    return useQuery({
        queryKey: ['my_bookings'],
        queryFn: () => customerBookingApi.getMyBookings(),
    });
};

export const useCustomerBookingDetail = (id: string) => {
    return useQuery({
        queryKey: ['my_booking', id],
        queryFn: () => customerBookingApi.getBookingDetail(id),
        enabled: !!id
    });
};

export const useCancelBooking = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, reason }: { id: string, reason: string }) => customerBookingApi.cancelBooking(id, reason),
        onSuccess: (_, { id }) => {
            queryClient.invalidateQueries({ queryKey: ['my_bookings'] });
            queryClient.invalidateQueries({ queryKey: ['my_booking', id] });
            toast.success('Hủy đặt sân thành công');
        },
        onError: () => toast.error('Hủy thất bại. Vui lòng thử lại')
    });
};

export const useCustomerWaitlists = () => {
    const queryClient = useQueryClient();

    const query = useQuery({
        queryKey: ['my_waitlists'],
        queryFn: () => customerBookingApi.getMyWaitlists(),
    });

    const cancelWaitlist = useMutation({
        mutationFn: (id: string) => customerBookingApi.cancelWaitlist(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['my_waitlists'] });
            toast.success('Đã rời khỏi danh sách chờ');
        }
    });

    return {
        waitlists: query.data || [],
        isLoading: query.isLoading,
        cancelWaitlist: cancelWaitlist.mutate
    };
};

export const useCustomerRecurringBookings = () => {
    return useQuery({
        queryKey: ['my_recurring_bookings'],
        queryFn: () => customerBookingApi.getMyRecurringBookings(),
    });
};

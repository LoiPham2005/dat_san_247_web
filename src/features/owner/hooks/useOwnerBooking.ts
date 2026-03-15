import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ownerBookingApi, BookingStatus } from '../api/owner-booking.api';
import { toast } from 'sonner';

export const useOwnerBookings = (venueId: string) => {
    const queryClient = useQueryClient();

    const bookingsQuery = useQuery({
        queryKey: ['owner_bookings', venueId],
        queryFn: () => ownerBookingApi.getBookings(venueId),
        enabled: !!venueId
    });

    const updateStatus = useMutation({
        mutationFn: ({ id, status }: { id: string, status: BookingStatus }) => ownerBookingApi.updateBookingStatus(id, status),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['owner_bookings', venueId] });
            toast.success("Cập nhật trạng thái Booking thành công");
        },
        onError: () => toast.error("Cập nhật trạng thái thất bại")
    });

    return {
        bookings: bookingsQuery.data || [],
        isLoading: bookingsQuery.isLoading,
        updateStatus: updateStatus.mutate,
        isUpdatingStatus: updateStatus.isPending
    };
};

export const useOwnerWaitlist = (venueId: string) => {
    const waitlistQuery = useQuery({
        queryKey: ['owner_waitlist', venueId],
        queryFn: () => ownerBookingApi.getWaitlist(venueId),
        enabled: !!venueId
    });

    return {
        waitlist: waitlistQuery.data || [],
        isLoading: waitlistQuery.isLoading
    };
};

export const useOwnerRecurringBookings = (venueId: string) => {
    const recurringQuery = useQuery({
        queryKey: ['owner_recurring_bookings', venueId],
        queryFn: () => ownerBookingApi.getRecurringBookings(venueId),
        enabled: !!venueId
    });

    return {
        recurring: recurringQuery.data || [],
        isLoading: recurringQuery.isLoading
    };
};

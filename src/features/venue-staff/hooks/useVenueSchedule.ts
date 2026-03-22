import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { venueStaffBookingApi, VenueStaffBooking } from '../api/venue-staff-booking.api';
import { BookingStatus } from '@/features/owner/api/owner-booking.api';
import { toast } from 'sonner';

export const useVenueSchedule = (venueId: string) => {
    const queryClient = useQueryClient();

    const { data: bookings = [], isLoading, error } = useQuery<VenueStaffBooking[]>({
        queryKey: ['venue-schedule', venueId],
        queryFn: () => venueStaffBookingApi.getSchedule(venueId),
        enabled: !!venueId,
        refetchInterval: 30000, // Tự động làm mới mỗi 30 giây
    });

    const updateStatusMutation = useMutation({
        mutationFn: ({ id, status }: { id: string, status: BookingStatus }) =>
            venueStaffBookingApi.updateStatus(id, status),
        onSuccess: (updatedBooking) => {
            queryClient.setQueryData(['venue-schedule', venueId], (old: VenueStaffBooking[] | undefined) => {
                if (!old) return [];
                return old.map(b => b.id === updatedBooking.id ? { ...b, status: updatedBooking.status } : b);
            });
            toast.success(`Cập nhật trạng thái thành công: ${updatedBooking.status}`);
        },
        onError: (err: any) => {
            toast.error(err.response?.data?.message || 'Có lỗi khi cập nhật trạng thái');
        }
    });

    return {
        bookings,
        isLoading,
        error,
        updateStatus: updateStatusMutation.mutate,
        isUpdating: updateStatusMutation.isPending,
    };
};

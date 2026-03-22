import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { venueStaffBookingApi, VenueStaffBooking, VenueStaffScheduleParams, VenueStaffScheduleResponse } from '../api/venue-staff-booking.api';
import { BookingStatus } from '@/features/owner/api/owner-booking.api';
import { toast } from 'sonner';

export const useVenueSchedule = (params: VenueStaffScheduleParams) => {
    const queryClient = useQueryClient();

    const { data, isLoading, error } = useQuery<VenueStaffScheduleResponse>({
        queryKey: ['venue-schedule', params],
        queryFn: () => venueStaffBookingApi.getSchedule(params),
        enabled: !!params.venue_id,
        refetchInterval: 60000,
    });

    const updateStatusMutation = useMutation({
        mutationFn: ({ id, status }: { id: string, status: BookingStatus }) =>
            venueStaffBookingApi.updateStatus(id, status),
        onSuccess: (updatedBooking) => {
            queryClient.invalidateQueries({ queryKey: ['venue-schedule'] });
            toast.success(`Cập nhật trạng thái thành công: ${updatedBooking.status}`);
        },
        onError: (err: any) => {
            toast.error(err.response?.data?.message || 'Có lỗi khi cập nhật trạng thái');
        }
    });

    return {
        bookings: data?.data || [],
        meta: data?.meta,
        isLoading,
        error,
        updateStatus: updateStatusMutation.mutate,
        isUpdating: updateStatusMutation.isPending,
    };
};

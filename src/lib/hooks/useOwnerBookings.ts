import { useQuery, useMutation, useQueryClient, keepPreviousData } from '@tanstack/react-query';
import { bookingService } from '@/lib/api/services/booking.service';
import { useBookingStore } from '@/lib/store/booking.store';
import { useToast } from '@/components/ui/use-toast';

export const useOwnerBookings = (params?: any) => {
    const queryClient = useQueryClient();
    const { toast } = useToast();
    const { setBookings, setFilters, filters } = useBookingStore();

    const queryParams = { ...filters, ...params };

    const bookingsQuery = useQuery({
        queryKey: ['owner-bookings', queryParams],
        queryFn: async () => {
            const response = await bookingService.getOwnerBookings(queryParams);
            const data = response.data?.items || [];
            setBookings(data);
            return response.data;
        },
        placeholderData: keepPreviousData,
    });

    const confirmMutation = useMutation({
        mutationFn: (id: string) => bookingService.ownerConfirm(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['owner-bookings'] });
            toast({ title: 'Booking confirmed' });
        },
        onError: (error: any) => {
            toast({ title: 'Action failed', description: error.message, variant: 'destructive' });
        }
    });

    const checkInMutation = useMutation({
        mutationFn: (id: string) => bookingService.ownerCheckIn(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['owner-bookings'] });
            toast({ title: 'Customer checked in' });
        },
        onError: (error: any) => {
            toast({ title: 'Action failed', description: error.message, variant: 'destructive' });
        }
    });

    const completeMutation = useMutation({
        mutationFn: (id: string) => bookingService.ownerComplete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['owner-bookings'] });
            toast({ title: 'Booking marked as completed' });
        },
        onError: (error: any) => {
            toast({ title: 'Action failed', description: error.message, variant: 'destructive' });
        }
    });

    const cancelMutation = useMutation({
        mutationFn: ({ id, reason }: { id: string; reason: string }) => bookingService.ownerCancel(id, reason),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['owner-bookings'] });
            toast({ title: 'Booking cancelled' });
        },
        onError: (error: any) => {
            toast({ title: 'Action failed', description: error.message, variant: 'destructive' });
        }
    });

    const createWalkInMutation = useMutation({
        mutationFn: (data: any) => bookingService.createWalkIn(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['owner-bookings'] });
            toast({ title: 'Walk-in booking created' });
        },
        onError: (error: any) => {
            toast({ title: 'Action failed', description: error.message, variant: 'destructive' });
        }
    });

    return {
        bookings: bookingsQuery.data?.items || [],
        pagination: bookingsQuery.data?.meta,
        isLoading: bookingsQuery.isLoading,
        isFetching: bookingsQuery.isFetching,
        error: bookingsQuery.error,
        refetch: bookingsQuery.refetch,

        confirmBooking: confirmMutation.mutate,
        isConfirming: confirmMutation.isPending,

        checkInBooking: checkInMutation.mutate,
        isCheckingIn: checkInMutation.isPending,

        completeBooking: completeMutation.mutate,
        isCompleting: completeMutation.isPending,

        cancelBooking: cancelMutation.mutate,
        isCancelling: cancelMutation.isPending,

        createWalkIn: createWalkInMutation.mutate,
        isCreating: createWalkInMutation.isPending,

        setFilters
    };
};

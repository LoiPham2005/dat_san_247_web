import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ownerVenueApi, OwnerVenue, VenueVerification, VenueOperatingHour } from '../api/owner-venue.api';
import { toast } from 'sonner';

export const useOwnerVenues = () => {
    const queryClient = useQueryClient();

    const venuesQuery = useQuery({ queryKey: ['owner_venues'], queryFn: ownerVenueApi.getMyVenues });

    const createVenue = useMutation({
        mutationFn: (data: Partial<OwnerVenue>) => ownerVenueApi.createVenue(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['owner_venues'] });
            toast.success("Đã tạo Cơ sở Thành công. Vui lòng nộp hồ sơ xét duyệt!");
        },
        onError: () => toast.error("Có lỗi xảy ra khi tạo Cơ sở")
    });

    return {
        venues: venuesQuery.data || [],
        isLoading: venuesQuery.isLoading,
        createVenue: createVenue.mutate,
        isCreating: createVenue.isPending
    };
};

export const useOwnerVenueDetail = (venueId: string | null) => {
    const queryClient = useQueryClient();

    const updateVenue = useMutation({
        mutationFn: (data: Partial<OwnerVenue>) => ownerVenueApi.updateVenue(venueId!, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['owner_venues'] });
            toast.success("Cập nhật thông tin Cơ sở thành công");
        },
        onError: () => toast.error("Cập nhật thông tin thất bại")
    });

    const verificationQuery = useQuery({ 
        queryKey: ['owner_venue_verification', venueId], 
        queryFn: () => ownerVenueApi.getVerification(venueId!),
        enabled: !!venueId
    });

    const submitVerification = useMutation({
        mutationFn: (data: Partial<VenueVerification>) => ownerVenueApi.submitVerification(venueId!, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['owner_venue_verification', venueId] });
            toast.success("Đã nộp hồ sơ xét duyệt. Admin sẽ phản hồi trong 24h.");
        },
        onError: () => toast.error("Nộp hồ sơ thất bại")
    });

    const hoursQuery = useQuery({ 
        queryKey: ['owner_venue_hours', venueId], 
        queryFn: () => ownerVenueApi.getOperatingHours(venueId!),
        enabled: !!venueId
    });

    const updateHour = useMutation({
        mutationFn: ({ id, data }: { id: string, data: Partial<VenueOperatingHour> }) => ownerVenueApi.updateOperatingHour(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['owner_venue_hours', venueId] });
            toast.success("Cập nhật Khung giờ thành công");
        },
        onError: () => toast.error("Cập nhật Khung giờ thất bại")
    });

    return {
        updateVenue: updateVenue.mutate,
        isUpdating: updateVenue.isPending,

        verification: verificationQuery.data,
        isLoadingVerification: verificationQuery.isLoading,
        submitVerification: submitVerification.mutate,
        isSubmittingVerification: submitVerification.isPending,

        operatingHours: hoursQuery.data || [],
        isLoadingHours: hoursQuery.isLoading,
        updateHour: updateHour.mutate,
        isUpdatingHour: updateHour.isPending
    };
};

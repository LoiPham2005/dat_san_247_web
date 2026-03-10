import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminVenueApi, VenueStatus } from '../api/admin-venue.api';
import { toast } from 'sonner';

export const useAdminVenues = () => {
    const queryClient = useQueryClient();

    const venuesQuery = useQuery({
        queryKey: ['admin_venues'],
        queryFn: adminVenueApi.getVenues,
    });

    const updateStatusMutation = useMutation({
        mutationFn: ({ id, status }: { id: string, status: VenueStatus }) => adminVenueApi.updateStatus(id, status),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin_venues'] });
            toast.success("Cập nhật trạng thái sân thành công");
        },
        onError: () => toast.error("Cập nhật trạng thái sân thất bại")
    });

    const updateFeaturedMutation = useMutation({
        mutationFn: ({ id, is_featured }: { id: string, is_featured: boolean }) => adminVenueApi.updateFeatured(id, is_featured),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['admin_venues'] });
            toast.success(data.is_featured ? "Đã đặt làm Sân Nổi Bật" : "Đã gỡ khỏi Sân Nổi Bật");
        },
        onError: () => toast.error("Có lỗi xảy ra khi cập nhật Sân Nổi Bật")
    });

    const updateCommissionMutation = useMutation({
        mutationFn: ({ id, rate }: { id: string, rate: number }) => adminVenueApi.updateCommissionRate(id, rate),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin_venues'] });
            toast.success("Cập nhật Chiết khấu Hoa hồng thành công");
        },
        onError: () => toast.error("Có lỗi xảy ra khi cập nhật Hoa hồng")
    });

    return {
        venues: venuesQuery.data || [],
        isLoading: venuesQuery.isLoading,
        updateStatus: updateStatusMutation.mutate,
        isUpdatingStatus: updateStatusMutation.isPending,
        updateFeatured: updateFeaturedMutation.mutate,
        isUpdatingFeatured: updateFeaturedMutation.isPending,
        updateCommission: updateCommissionMutation.mutate,
        isUpdatingCommission: updateCommissionMutation.isPending,
    };
};

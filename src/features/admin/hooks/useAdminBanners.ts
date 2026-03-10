import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminBannerApi } from '../api/admin-banner.api';
import { toast } from 'sonner';

export const useAdminBanners = () => {
    const queryClient = useQueryClient();

    const bannersQuery = useQuery({
        queryKey: ['admin_banners'],
        queryFn: adminBannerApi.getBanners,
    });

    const toggleMutation = useMutation({
        mutationFn: ({ id, is_active }: { id: string, is_active: boolean }) => adminBannerApi.toggleActive(id, is_active),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin_banners'] });
            toast.success("Đã cập nhật trạng thái Banner");
        },
        onError: () => toast.error("Cập nhật trạng thái thất bại")
    });

    const deleteMutation = useMutation({
        mutationFn: adminBannerApi.deleteBanner,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin_banners'] });
            toast.success("Xóa Banner thành công");
        },
        onError: () => toast.error("Có lỗi xảy ra khi Xóa Banner")
    });

    return {
        banners: bannersQuery.data || [],
        isLoading: bannersQuery.isLoading,
        toggleActive: toggleMutation.mutate,
        isToggling: toggleMutation.isPending,
        deleteBanner: deleteMutation.mutate,
        isDeleting: deleteMutation.isPending,
    };
};

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

    const createBanner = useMutation({
        mutationFn: adminBannerApi.createBanner,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin_banners'] });
            toast.success("Tạo Banner mới thành công");
        },
        onError: () => toast.error("Có lỗi xảy ra khi Tạo Banner")
    });

    const updateBanner = useMutation({
        mutationFn: ({ id, data }: { id: string, data: any }) => adminBannerApi.updateBanner(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin_banners'] });
            toast.success("Cập nhật Banner thành công");
        },
        onError: () => toast.error("Có lỗi xảy ra khi Cập nhật Banner")
    });

    return {
        banners: bannersQuery.data || [],
        isLoading: bannersQuery.isLoading,
        toggleActive: toggleMutation.mutate,
        isToggling: toggleMutation.isPending,
        deleteBanner: deleteMutation.mutate,
        isDeleting: deleteMutation.isPending,
        createBanner: createBanner.mutate,
        isCreating: createBanner.isPending,
        updateBanner: updateBanner.mutate,
        isUpdating: updateBanner.isPending,
    };
};

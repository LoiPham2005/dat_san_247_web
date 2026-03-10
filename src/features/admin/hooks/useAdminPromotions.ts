import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminPromotionApi } from '../api/admin-promotion.api';
import { toast } from 'sonner';

export const useAdminPromotions = () => {
    const queryClient = useQueryClient();

    const promotionsQuery = useQuery({
        queryKey: ['admin_promotions'],
        queryFn: adminPromotionApi.getPromotions,
    });

    const toggleMutation = useMutation({
        mutationFn: ({ id, is_active }: { id: string, is_active: boolean }) => adminPromotionApi.toggleActive(id, is_active),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin_promotions'] });
            toast.success("Đã cập nhật trạng thái Khuyến mãi");
        },
        onError: () => toast.error("Cập nhật trạng thái thất bại")
    });

    const deleteMutation = useMutation({
        mutationFn: adminPromotionApi.deletePromotion,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin_promotions'] });
            toast.success("Xóa Khuyến mãi thành công");
        },
        onError: () => toast.error("Có lỗi xảy ra khi Xóa Khuyến mãi")
    });

    return {
        promotions: promotionsQuery.data || [],
        isLoading: promotionsQuery.isLoading,
        toggleActive: toggleMutation.mutate,
        isToggling: toggleMutation.isPending,
        deletePromotion: deleteMutation.mutate,
        isDeleting: deleteMutation.isPending,
    };
};

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminPromotionApi, PromotionQueryParams, PromotionStatus, AdminPromotion } from '../api/admin-promotion.api';
import { toast } from 'sonner';

export const useAdminPromotions = (params: PromotionQueryParams) => {
    const queryClient = useQueryClient();

    const { data, isLoading, isError, error, refetch, isFetching } = useQuery({
        queryKey: ['admin-promotions', params],
        queryFn: () => adminPromotionApi.getPromotions(params),
        placeholderData: (previousData) => previousData,
    });

    const createMutation = useMutation({
        mutationFn: adminPromotionApi.createPromotion,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-promotions'] });
            toast.success('Đã tạo mã khuyến mãi mới');
        },
        onError: (err: any) => {
            toast.error(err.response?.data?.message || 'Không thể tạo mã khuyến mãi');
        }
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, data }: { id: string, data: Partial<AdminPromotion> }) => 
            adminPromotionApi.updatePromotion(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-promotions'] });
            toast.success('Đã cập nhật thông tin khuyến mãi');
        },
        onError: (err: any) => {
            toast.error(err.response?.data?.message || 'Không thể cập nhật khuyến mãi');
        }
    });

    const statusMutation = useMutation({
        mutationFn: ({ id, status }: { id: string, status: PromotionStatus }) => 
            adminPromotionApi.updateStatus(id, status),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-promotions'] });
            toast.success('Đã cập nhật trạng thái khuyến mãi');
        },
        onError: (err: any) => {
            toast.error(err.response?.data?.message || 'Không thể cập nhật trạng thái');
        }
    });

    const deleteMutation = useMutation({
        mutationFn: adminPromotionApi.deletePromotion,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-promotions'] });
            toast.success('Đã xóa khuyến mãi');
        },
        onError: (err: any) => {
            toast.error(err.response?.data?.message || 'Không thể xóa khuyến mãi');
        }
    });

    console.log('>>> [HOOK DEBUG] Data from useQuery:', data);

    // Robust promotions extraction
    let promotions: AdminPromotion[] = [];
    if (Array.isArray(data)) {
        promotions = data;
    } else if (data && Array.isArray((data as any).data)) {
        promotions = (data as any).data;
    }

    return {
        promotions,
        meta: (data as any)?.meta,
        isLoading,
        isError,
        error,
        createPromotion: createMutation.mutateAsync,
        updatePromotion: updateMutation.mutateAsync,
        updateStatus: statusMutation.mutateAsync,
        deletePromotion: deleteMutation.mutateAsync,
        isCreating: createMutation.isPending,
        isUpdating: updateMutation.isPending || statusMutation.isPending,
        isDeleting: deleteMutation.isPending,
        isFetching,
        refetch
    };
};

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { promotionsService } from '@/lib/api/services/promotion.service';
import { usePromotionStore } from '@/lib/store/promotion.store';
import { useToast } from '@/components/ui/use-toast';
import { PromotionStatus } from '@/types/promotion.types';

export const usePromotion = () => {
    const queryClient = useQueryClient();
    const { toast } = useToast();
    const updatePromotionStatusLocal = usePromotionStore((state) => state.updatePromotionStatus);

    const toggleStatusMutation = useMutation({
        mutationFn: ({ id, status }: { id: string; status: PromotionStatus }) =>
            promotionsService.update(id, { status }),
        onMutate: async ({ id, status }) => {
            await queryClient.cancelQueries({ queryKey: ['admin-promotions'] });

            const previousPromotions = queryClient.getQueryData(['admin-promotions']);

            // Optimistically update Query Cache
            queryClient.setQueryData(['admin-promotions'], (old: any) => {
                if (!old) return old;
                return {
                    ...old,
                    items: old.items.map((p: any) =>
                        p.id === id ? { ...p, status } : p
                    )
                };
            });

            // Sync with Zustand
            updatePromotionStatusLocal(id, status);

            return { previousPromotions };
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-promotions'] });
            toast({
                title: 'Thành công',
                description: 'Trạng thái voucher đã được cập nhật.',
            });
        },
        onError: (error: any, variables, context: any) => {
            if (context?.previousPromotions) {
                queryClient.setQueryData(['admin-promotions'], context.previousPromotions);
            }
            queryClient.invalidateQueries({ queryKey: ['admin-promotions'] });
            toast({
                title: 'Lỗi',
                description: error.response?.data?.message || 'Không thể cập nhật trạng thái.',
                variant: 'destructive',
            });
        },
    });

    const duplicateMutation = useMutation({
        mutationFn: (data: any) => {
            const { id, createdAt, updatedAt, ...duplicateData } = data;
            return promotionsService.create({
                ...duplicateData,
                code: `${duplicateData.code}_COPY`,
                name: `${duplicateData.name} (Bản sao)`,
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-promotions'] });
            toast({
                title: 'Thành công',
                description: 'Đã nhân bản voucher thành công.',
            });
        },
        onError: (error: any) => {
            toast({
                title: 'Lỗi',
                description: error.response?.data?.message || 'Không thể nhân bản voucher.',
                variant: 'destructive',
            });
        },
    });

    return {
        toggleStatus: toggleStatusMutation.mutate,
        isToggling: toggleStatusMutation.isPending,
        duplicate: duplicateMutation.mutate,
        isDuplicating: duplicateMutation.isPending,
    };
};

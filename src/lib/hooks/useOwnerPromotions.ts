import { useQuery, useMutation, useQueryClient, keepPreviousData } from '@tanstack/react-query';
import { promotionsService } from '@/lib/api/services/promotion.service';
import { useToast } from '@/components/ui/use-toast';

export const useOwnerPromotions = (params?: any) => {
    const queryClient = useQueryClient();
    const { toast } = useToast();

    const promotionsQuery = useQuery({
        queryKey: ['owner-promotions', params],
        queryFn: () => promotionsService.getOwnerPromotions(params),
        placeholderData: keepPreviousData,
    });

    const createMutation = useMutation({
        mutationFn: (data: any) => promotionsService.createByOwner(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['owner-promotions'] });
            toast({ title: 'Promotion created successfully' });
        },
        onError: (error: any) => {
            const message = error.response?.data?.message || error.message || 'Unknown error';
            toast({
                title: 'Failed to create promotion',
                description: Array.isArray(message) ? message[0] : message,
                variant: 'destructive'
            });
        }
    });

    const deleteMutation = useMutation({
        mutationFn: (id: string) => promotionsService.deleteByOwner(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['owner-promotions'] });
            toast({ title: 'Promotion deleted successfully' });
        },
        onError: (error: any) => {
            const message = error.response?.data?.message || error.message || 'Action failed';
            toast({
                title: 'Action failed',
                description: Array.isArray(message) ? message[0] : message,
                variant: 'destructive'
            });
        }
    });

    return {
        promotions: promotionsQuery.data?.items || [],
        pagination: promotionsQuery.data?.meta,
        isLoading: promotionsQuery.isLoading,
        isFetching: promotionsQuery.isFetching,
        error: promotionsQuery.error,
        refetch: promotionsQuery.refetch,

        createPromotion: createMutation.mutate,
        isCreating: createMutation.isPending,

        deletePromotion: deleteMutation.mutate,
        isDeleting: deleteMutation.isPending,
    };
};

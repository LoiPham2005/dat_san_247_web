import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ownerMarketingApi } from '../api/owner-marketing.api';
import { toast } from 'sonner';

export const useOwnerReviews = (venueId: string) => {
    const queryClient = useQueryClient();

    const reviewsQuery = useQuery({
        queryKey: ['owner_reviews', venueId],
        queryFn: () => ownerMarketingApi.getVenueReviews(venueId),
        enabled: !!venueId
    });

    const replyMutation = useMutation({
        mutationFn: ({ reviewId, response }: { reviewId: string, response: string }) => 
            ownerMarketingApi.replyReview(reviewId, response),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['owner_reviews', venueId] });
            toast.success("Đã phản hồi đánh giá.");
        },
        onError: () => toast.error("Phản hồi thất bại. Vui lòng thử lại sau.")
    });

    return {
        reviews: reviewsQuery.data || [],
        isLoading: reviewsQuery.isLoading,
        replyReview: replyMutation.mutate,
        isReplying: replyMutation.isPending
    };
};

export const useOwnerPromotions = (venueId: string) => {
    return useQuery({
        queryKey: ['owner_promotions', venueId],
        queryFn: () => ownerMarketingApi.getVenuePromotions(venueId),
        enabled: !!venueId
    });
};

export const useOwnerPromotionUsage = (promotionId: string | null) => {
    return useQuery({
        queryKey: ['owner_promotion_usage', promotionId],
        queryFn: () => promotionId ? ownerMarketingApi.getPromotionUsage(promotionId) : Promise.resolve([]),
        enabled: !!promotionId
    });
};

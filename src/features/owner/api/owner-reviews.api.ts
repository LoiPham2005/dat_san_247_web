import apiClient from '@/lib/api/axios';

export interface OwnerReview {
    id: string;
    created_at: string;
    rating: number;
    comment: string | null;
    response: string | null;
    responded_at: string | null;
    users: {
        id: string;
        full_name: string;
        avatar_url: string | null;
    };
    venues: {
        id: string;
        name: string;
    };
    courts: {
        id: string;
        name: string;
    } | null;
}

export const ownerReviewsApi = {
    getReviews: async (venueId?: string): Promise<OwnerReview[]> => {
        const response = await apiClient.get('/v1/owner/reviews', { params: { venue_id: venueId } });
        return response.data?.data || [];
    },

    replyReview: async (reviewId: string, reply: string): Promise<OwnerReview> => {
        const response = await apiClient.patch(`/v1/owner/reviews/${reviewId}/reply`, { reply_comment: reply });
        return response.data?.data;
    }
};

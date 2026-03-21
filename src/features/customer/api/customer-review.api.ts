import apiClient from '@/lib/api/axios';

export type ReviewRating = 1 | 2 | 3 | 4 | 5;

export interface CustomerReview {
    id: string;
    booking_id: string;
    venue_id: string;
    venue_name: string;
    court_id: string | null;
    court_name: string | null;
    rating: ReviewRating;
    rating_cleanliness: number | null;
    rating_facilities: number | null;
    rating_staff: number | null;
    comment: string | null;
    response: string | null;
    responded_at: string | null;
    created_at: string;
    media_attachments: { 
        id: string;
        files: {
            public_url: string;
            mime_type: string;
        }
    }[];
}

export const customerReviewApi = {
    getMyReviews: async (): Promise<CustomerReview[]> => {
        const response = await apiClient.get('/customer/reviews/my-reviews');
        return (response.data?.data || []).map((rv: any) => ({
            ...rv,
            venue_name: rv.venues?.name || 'Sân thể thao',
            court_name: rv.courts?.name || 'Sân chính'
        }));
    },
    createReview: async (data: any): Promise<CustomerReview> => {
        const response = await apiClient.post('/customer/reviews', data);
        return response.data?.data;
    },
    updateReview: async (id: string, data: any): Promise<CustomerReview> => {
        const response = await apiClient.patch(`/customer/reviews/${id}`, data);
        return response.data?.data;
    },
    deleteReview: async (id: string): Promise<boolean> => {
        await apiClient.delete(`/customer/reviews/${id}`);
        return true;
    }
};

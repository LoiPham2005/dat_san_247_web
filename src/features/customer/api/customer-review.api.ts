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
    media_attachments: { id: string, file_url: string }[];
}

const mockReviews: CustomerReview[] = [
    {
        id: 'RV-1',
        booking_id: 'BK-67890',
        venue_id: 'V-2',
        venue_name: 'Sân Cầu Lông Thống Nhất',
        court_id: 'C-3',
        court_name: 'Sân A',
        rating: 5,
        rating_cleanliness: 5,
        rating_facilities: 5,
        rating_staff: 5,
        comment: 'Sân rất đẹp, đèn sáng rõ, nhân viên nhiệt tình, sẽ quay lại!',
        response: 'Cảm ơn bạn đã ủng hộ sân. Tuần sau sân có event giảm giá, nhớ đặt nha!',
        responded_at: new Date(Date.now() - 86400000 * 2).toISOString(),
        created_at: new Date(Date.now() - 86400000 * 3).toISOString(),
        media_attachments: [
            { id: 'M-1', file_url: 'https://images.unsplash.com/photo-1628124978716-e41c42fccf2f?q=80&w=200&h=200&fit=crop' }
        ]
    },
    {
        id: 'RV-2',
        booking_id: 'BK-12345',
        venue_id: 'V-1',
        venue_name: 'Sân Bóng Vipe Cầu Giấy',
        court_id: 'C-1',
        court_name: 'Sân 1',
        rating: 3,
        rating_cleanliness: 3,
        rating_facilities: 4,
        rating_staff: 3,
        comment: 'Sân hơi trơn do trời mưa, bãi đỗ xe hơi chật vào giờ cao điểm, nhưng giá khá ổn.',
        response: null,
        responded_at: null,
        created_at: new Date(Date.now() - 86400000 * 10).toISOString(),
        media_attachments: []
    }
];

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const customerReviewApi = {
    getMyReviews: async (): Promise<CustomerReview[]> => {
        await delay(500);
        return mockReviews;
    },
    createReview: async (data: any): Promise<CustomerReview> => {
        await delay(800);
        const newReview: CustomerReview = {
            id: 'RV-' + Math.random().toString(36).substring(7),
            ...data,
            response: null,
            responded_at: null,
            created_at: new Date().toISOString(),
            media_attachments: []
        };
        mockReviews.unshift(newReview);
        return newReview;
    },
    deleteReview: async (id: string): Promise<boolean> => {
        await delay(500);
        return true;
    }
};

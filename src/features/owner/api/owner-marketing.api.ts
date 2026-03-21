export interface OwnerReview {
    id: string;
    booking_id: string;
    venue_id: string;
    court_id: string | null;
    court_name: string | null;
    user_id: string;
    user_name: string;
    user_avatar: string | null;
    rating: number;
    rating_cleanliness: number | null;
    rating_facilities: number | null;
    rating_staff: number | null;
    comment: string | null;
    response: string | null;
    responded_by: string | null;
    responded_at: string | null;
    created_at: string;
    is_visible: boolean;
    media: { url: string; type: string }[];
}

export type PromotionDiscountType = 'PERCENTAGE' | 'FIXED_AMOUNT';
export type PromotionStatus = 'ACTIVE' | 'INACTIVE' | 'EXPIRED';

export interface OwnerPromotion {
    id: string;
    code: string;
    name: string;
    description: string | null;
    discount_type: PromotionDiscountType;
    discount_value: number;
    max_discount_amount: number | null;
    min_booking_amount: number;
    usage_limit: number | null;
    usage_count: number;
    valid_from: string;
    valid_to: string;
    status: PromotionStatus;
    created_at: string;
    revenue_generated: number; // Thống kê tổng tiền thu được từ booking có áp mã này
    discount_total: number; // Thống kê tổng tiền đã giảm cho khách
}

export interface OwnerPromotionUsage {
    id: string;
    promotion_id: string;
    booking_id: string;
    user_id: string;
    user_name: string;
    discount_amount: number;
    created_at: string;
}

const mockReviews: OwnerReview[] = [
    {
        id: 'REV-1',
        booking_id: 'BK-1',
        venue_id: 'VN-1',
        court_id: 'C-1',
        court_name: 'Sân 1',
        user_id: 'U-1',
        user_name: 'Khách Hàng A',
        user_avatar: null,
        rating: 5,
        rating_cleanliness: 5,
        rating_facilities: 5,
        rating_staff: 5,
        comment: 'Sân bóng rất tốt, mới mở nên cỏ rất êm. Đèn sáng trưng đá bóng tối rất sướng mắt.',
        response: 'Cảm ơn bạn đã trải nghiệm dịch vụ tại sân! Hẹn gặp lại bạn!',
        responded_by: 'U-OWNER',
        responded_at: new Date(Date.now() - 86400000).toISOString(),
        created_at: new Date(Date.now() - 172800000).toISOString(),
        is_visible: true,
        media: []
    },
    {
        id: 'REV-2',
        booking_id: 'BK-2',
        venue_id: 'VN-1',
        court_id: 'C-2',
        court_name: 'Sân 2',
        user_id: 'U-2',
        user_name: 'Bạn Tân',
        user_avatar: null,
        rating: 3,
        rating_cleanliness: 3,
        rating_facilities: 4,
        rating_staff: 3,
        comment: 'Sạch sẽ nhưng giá hơi cao xíu b, với cho mình hỏi có cho thuê giày không?',
        response: null,
        responded_by: null,
        responded_at: null,
        created_at: new Date(Date.now() - 3600000).toISOString(),
        is_visible: true,
        media: []
    }
];

const mockPromotions: OwnerPromotion[] = [
    {
        id: 'PROMO-1',
        code: 'KHAITRUONG',
        name: 'Mừng Khai Trương Giảm 20%',
        description: 'Giảm 20% cho tất cả các lịch đặt trong tuần đầu khai trương',
        discount_type: 'PERCENTAGE',
        discount_value: 20,
        max_discount_amount: 100000,
        min_booking_amount: 200000,
        usage_limit: 100,
        usage_count: 45,
        valid_from: new Date(Date.now() - 86400000 * 10).toISOString(),
        valid_to: new Date(Date.now() + 86400000 * 5).toISOString(),
        status: 'ACTIVE',
        created_at: new Date(Date.now() - 86400000 * 11).toISOString(),
        revenue_generated: 15500000,
        discount_total: 1250000
    },
    {
        id: 'PROMO-2',
        code: 'VUIHOI',
        name: 'Sinh Nhật Giảm 50K',
        description: null,
        discount_type: 'FIXED_AMOUNT',
        discount_value: 50000,
        max_discount_amount: null,
        min_booking_amount: 300000,
        usage_limit: null,
        usage_count: 12,
        valid_from: new Date(Date.now() - 86400000 * 30).toISOString(),
        valid_to: new Date(Date.now() - 86400000 * 10).toISOString(),
        status: 'EXPIRED',
        created_at: new Date(Date.now() - 86400000 * 35).toISOString(),
        revenue_generated: 4500000,
        discount_total: 600000
    }
];

const mockPromotionUsage: OwnerPromotionUsage[] = [
    {
        id: 'USG-1',
        promotion_id: 'PROMO-1',
        booking_id: 'BK-100',
        user_id: 'U-5',
        user_name: 'Nguyễn Bình',
        discount_amount: 50000,
        created_at: new Date(Date.now() - 3600000 * 5).toISOString()
    },
    {
        id: 'USG-2',
        promotion_id: 'PROMO-1',
        booking_id: 'BK-101',
        user_id: 'U-6',
        user_name: 'Lê Vui',
        discount_amount: 60000,
        created_at: new Date(Date.now() - 86400000).toISOString()
    }
];

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

import apiClient from '@/lib/api/axios';

export const ownerMarketingApi = {
    getVenueReviews: async (venueId: string): Promise<OwnerReview[]> => {
        const response = await apiClient.get('/owner/reviews', { params: { venue_id: venueId } });
        // Map backend Review to OwnerReview
        return (response.data?.data || []).map((r: any) => ({
            id: r.id,
            booking_id: r.booking_id,
            venue_id: r.venue_id,
            court_id: r.court_id,
            court_name: r.courts?.name || 'Sân chung',
            user_id: r.user_id,
            user_name: r.users?.full_name || 'Khách hàng',
            user_avatar: r.users?.avatar_url,
            rating: r.rating,
            rating_cleanliness: r.rating_cleanliness,
            rating_facilities: r.rating_facilities,
            rating_staff: r.rating_staff,
            comment: r.comment,
            response: r.response,
            responded_by: r.responded_by,
            responded_at: r.responded_at,
            created_at: r.created_at,
            is_visible: r.is_visible,
            media: (r.media_attachments || []).map((m: any) => ({
                url: m.files?.public_url,
                type: m.files?.mime_type
            }))
        }));
    },

    replyReview: async (reviewId: string, reply: string): Promise<OwnerReview> => {
        const response = await apiClient.patch(`/owner/reviews/${reviewId}/reply`, { reply_comment: reply });
        return response.data?.data;
    },

    getVenuePromotions: async (venueId: string): Promise<OwnerPromotion[]> => {
        const response = await apiClient.get(`/owner/promotions/venue/${venueId}`);
        return response.data?.data || [];
    },

    getPromotionUsage: async (promotionId: string): Promise<OwnerPromotionUsage[]> => {
        const response = await apiClient.get(`/owner/promotions/${promotionId}/usage`);
        return response.data?.data || [];
    },

    createPromotion: async (data: any): Promise<OwnerPromotion> => {
        const response = await apiClient.post('/owner/promotions', data);
        return response.data?.data;
    },

    updatePromotion: async (id: string, data: any): Promise<OwnerPromotion> => {
        const response = await apiClient.patch(`/owner/promotions/${id}`, data);
        return response.data?.data;
    },

    togglePromotionStatus: async (id: string): Promise<OwnerPromotion> => {
        const response = await apiClient.patch(`/owner/promotions/${id}/toggle`);
        return response.data?.data;
    },

    deletePromotion: async (id: string): Promise<void> => {
        await apiClient.delete(`/owner/promotions/${id}`);
    }
};

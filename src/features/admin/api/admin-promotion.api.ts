import apiClient from '@/lib/api/axios';

export type PromotionDiscountType = 'PERCENTAGE' | 'FIXED_AMOUNT';
export type PromotionStatus = 'ACTIVE' | 'INACTIVE' | 'EXPIRED';

export interface AdminPromotion {
    id: string;
    created_at: string;
    updated_at: string;
    code: string;
    name: string;
    description: string | null;
    discount_type: PromotionDiscountType;
    discount_value: number;
    max_discount_amount: number | null;
    min_booking_amount: number;
    usage_limit: number | null;
    usage_count: number;
    max_usage_per_user: number;
    is_public: boolean;
    valid_from: string;
    valid_to: string;
    status: PromotionStatus;
    creator?: {
        id: string;
        full_name: string;
    };
}

export interface PromotionQueryParams {
    page?: number;
    limit?: number;
    search?: string;
    status?: PromotionStatus;
}

export interface PromotionResponse {
    data: AdminPromotion[];
    meta: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
}

export const adminPromotionApi = {
    getPromotions: async (params: PromotionQueryParams): Promise<PromotionResponse> => {
        const response = await apiClient.get('/admin/promotions', { params });
        console.log('>>> [API DEBUG] Raw response body:', response.data);
        return response.data?.data;
    },

    createPromotion: async (data: Partial<AdminPromotion>): Promise<AdminPromotion> => {
        const response = await apiClient.post('/admin/promotions', data);
        return response.data?.data;
    },

    updatePromotion: async (id: string, data: Partial<AdminPromotion>): Promise<AdminPromotion> => {
        const response = await apiClient.patch(`/admin/promotions/${id}`, data);
        return response.data?.data;
    },

    deletePromotion: async (id: string): Promise<void> => {
        await apiClient.delete(`/admin/promotions/${id}`);
    },

    updateStatus: async (id: string, status: string): Promise<AdminPromotion> => {
        const response = await apiClient.patch(`/admin/promotions/${id}/status`, { status });
        return response.data?.data;
    }
};

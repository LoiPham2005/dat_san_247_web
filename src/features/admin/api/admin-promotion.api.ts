export type DiscountType = 'PERCENTAGE' | 'FIXED_AMOUNT' | 'HOURS_FREE';

export interface AdminPromotion {
    id: string;
    code: string;
    description: string | null;
    discount_type: DiscountType;
    discount_value: number;
    max_discount_amount: number | null;
    min_booking_amount: number | null;
    start_date: string;
    end_date: string;
    usage_limit: number | null;
    used_count: number;
    is_active: boolean;
    is_system: boolean;
    created_at: string;
}

const mockPromotions: AdminPromotion[] = [
    {
        id: 'PRM-001',
        code: 'WELCOME2026',
        description: 'Giảm 10% tối đa 50k cho thành viên mới',
        discount_type: 'PERCENTAGE',
        discount_value: 10,
        max_discount_amount: 50000,
        min_booking_amount: 150000,
        start_date: '2026-01-01T00:00:00Z',
        end_date: '2026-12-31T23:59:59Z',
        usage_limit: 1000,
        used_count: 450,
        is_active: true,
        is_system: true,
        created_at: '2025-12-25T10:00:00Z'
    },
    {
        id: 'PRM-002',
        code: 'SUMMER_SALE',
        description: 'Giảm trực tiếp 100k cho booking từ 500k',
        discount_type: 'FIXED_AMOUNT',
        discount_value: 100000,
        max_discount_amount: null, // fixed
        min_booking_amount: 500000,
        start_date: '2026-05-01T00:00:00Z',
        end_date: '2026-08-31T23:59:59Z',
        usage_limit: 500,
        used_count: 0,
        is_active: true,
        is_system: true,
        created_at: '2026-04-15T09:00:00Z'
    },
    {
        id: 'PRM-003',
        code: 'VIP_TENNIS',
        description: 'Chỉ áp dụng Sân Tennis VIP - Giảm 20%',
        discount_type: 'PERCENTAGE',
        discount_value: 20,
        max_discount_amount: 200000,
        min_booking_amount: 0,
        start_date: '2026-03-01T00:00:00Z',
        end_date: '2026-03-31T23:59:59Z',
        usage_limit: 50,
        used_count: 50,
        is_active: false,
        is_system: false, // Do Platform tạo cho 1 sân cụ thể
        created_at: '2026-02-28T14:30:00Z'
    },
    {
        id: 'PRM-004',
        code: 'FREE_1HOUR',
        description: 'Tặng 1 giờ đá miễn phí (Dành riêng đền bù KH)',
        discount_type: 'HOURS_FREE',
        discount_value: 1,
        max_discount_amount: null,
        min_booking_amount: null,
        start_date: '2026-01-01T00:00:00Z',
        end_date: '2027-01-01T00:00:00Z',
        usage_limit: null, // Unlimited
        used_count: 12,
        is_active: true,
        is_system: true,
        created_at: '2026-01-05T08:00:00Z'
    }
];

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const adminPromotionApi = {
    getPromotions: async (): Promise<AdminPromotion[]> => {
        await delay(500);
        return [...mockPromotions].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    },
    toggleActive: async (id: string, is_active: boolean): Promise<AdminPromotion> => {
        await delay(400);
        const promo = mockPromotions.find(p => p.id === id);
        if (!promo) throw new Error("Promotion not found");
        promo.is_active = is_active;
        return { ...promo };
    },
    deletePromotion: async (id: string): Promise<string> => {
        await delay(600);
        const index = mockPromotions.findIndex(p => p.id === id);
        if (index === -1) throw new Error("Promotion not found");
        mockPromotions.splice(index, 1);
        return id;
    }
};

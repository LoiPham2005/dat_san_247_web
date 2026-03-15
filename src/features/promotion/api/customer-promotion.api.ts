export type VoucherStatus = 'UNUSED' | 'USED' | 'EXPIRED';
export type PromotionDiscountType = 'PERCENTAGE' | 'FIXED_AMOUNT';

export interface CustomerVoucher {
    id: string; // user_voucher id
    promotion_id: string;
    code: string;
    name: string;
    description: string | null;
    discount_type: PromotionDiscountType;
    discount_value: number;
    max_discount_amount: number | null;
    min_booking_amount: number;
    status: VoucherStatus;
    expires_at: string;
    valid_from: string;
    venue_restrictions: { id: string, name: string }[];
}

const mockVouchers: CustomerVoucher[] = [
    {
        id: 'UV-001',
        promotion_id: 'PR-100',
        code: 'WELCOME247',
        name: 'Giảm 50K Bạn Mới',
        description: 'Áp dụng cho đơn đặt sân đầu tiên trên hệ thống',
        discount_type: 'FIXED_AMOUNT',
        discount_value: 50000,
        max_discount_amount: null,
        min_booking_amount: 150000,
        status: 'UNUSED',
        expires_at: new Date(Date.now() + 86400000 * 30).toISOString(),
        valid_from: new Date(Date.now() - 86400000).toISOString(),
        venue_restrictions: []
    },
    {
        id: 'UV-002',
        promotion_id: 'PR-101',
        code: 'CUOITUANVUIVE',
        name: 'Giảm 10% Cuối Tuần',
        description: 'Áp dụng cho các sân thuộc hệ thống Vipe',
        discount_type: 'PERCENTAGE',
        discount_value: 10,
        max_discount_amount: 100000,
        min_booking_amount: 300000,
        status: 'UNUSED',
        expires_at: new Date(Date.now() + 86400000 * 5).toISOString(),
        valid_from: new Date().toISOString(),
        venue_restrictions: [{ id: 'V-1', name: 'Sân Bóng Vipe Cầu Giấy' }]
    },
    {
        id: 'UV-003',
        promotion_id: 'PR-102',
        code: 'CHAOHE2026',
        name: 'Giảm 20K Chào Hè',
        description: 'Áp dụng mọi sân.',
        discount_type: 'FIXED_AMOUNT',
        discount_value: 20000,
        max_discount_amount: null,
        min_booking_amount: 0,
        status: 'USED',
        expires_at: new Date(Date.now() + 86400000 * 10).toISOString(),
        valid_from: new Date(Date.now() - 86400000 * 10).toISOString(),
        venue_restrictions: []
    }
];

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const customerPromotionApi = {
    getMyVouchers: async (): Promise<CustomerVoucher[]> => {
        await delay(500);
        return mockVouchers;
    },
    saveVoucher: async (code: string): Promise<boolean> => {
        await delay(500);
        return true; // Mock success
    }
};

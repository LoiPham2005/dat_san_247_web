export type FaqCategory = 'BOOKING' | 'PAYMENT' | 'CANCELLATION' | 'ACCOUNT' | 'VENUE' | 'GENERAL';
export type PolicyType = 'TERMS_OF_SERVICE' | 'PRIVACY_POLICY' | 'REFUND_POLICY' | 'CANCELLATION_POLICY' | 'COOKIE_POLICY' | 'COMMUNITY_GUIDELINES';

export interface AdminPolicy {
    id: string;
    type: PolicyType;
    is_current: boolean;
    title: string;
    content: string;
    version: string;
    effective_date: string;
    requires_acceptance: boolean;
    created_at: string;
}

export interface AdminFaq {
    id: string;
    category: FaqCategory;
    question: string;
    answer: string;
    display_order: number;
    is_active: boolean;
    created_at: string;
}

const mockPolicies: AdminPolicy[] = [
    {
        id: 'POL-001',
        type: 'TERMS_OF_SERVICE',
        is_current: true,
        title: 'Điều Khoản Dịch Vụ - Đặt Sân 247',
        content: 'Nội dung điều khoản... (mock)',
        version: 'v2.1',
        effective_date: '2026-01-01T00:00:00Z',
        requires_acceptance: true,
        created_at: '2025-12-15T00:00:00Z'
    },
    {
        id: 'POL-002',
        type: 'PRIVACY_POLICY',
        is_current: true,
        title: 'Chính Sách Bảo Mật Quyển Riêng Tư',
        content: 'Chính sách bảo mật... (mock)',
        version: 'v1.0',
        effective_date: '2025-06-01T00:00:00Z',
        requires_acceptance: false,
        created_at: '2025-05-15T00:00:00Z'
    }
];

const mockFaqs: AdminFaq[] = [
    {
        id: 'FAQ-001',
        category: 'BOOKING',
        question: 'Làm thế nào để đặt sân định kỳ mỗi tuần?',
        answer: 'Bạn vào trang chi tiết sân, chọn mục Đặt Định Kỳ (Recurring Booking)...',
        display_order: 1,
        is_active: true,
        created_at: '2026-02-28T10:00:00Z'
    },
    {
        id: 'FAQ-002',
        category: 'PAYMENT',
        question: 'Tôi thanh toán qua Momo được không?',
        answer: 'Chúng tôi hỗ trợ 4 hình thức thanh toán chính: MoMo, VNPay, Tiền Mặt và Ví nội bộ...',
        display_order: 2,
        is_active: true,
        created_at: '2026-02-28T10:30:00Z'
    }
];

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const adminContentApi = {
    getPolicies: async (): Promise<AdminPolicy[]> => {
        await delay(300);
        return [...mockPolicies];
    },
    getFaqs: async (): Promise<AdminFaq[]> => {
        await delay(200);
        return [...mockFaqs];
    }
};

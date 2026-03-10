export type PayoutStatus = 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'REJECTED';
export type TransactionType = 'PAYMENT' | 'REFUND' | 'PAYOUT' | 'TOP_UP' | 'COMMISSION_FEE';
export type TransactionStatus = 'PENDING' | 'COMPLETED' | 'FAILED' | 'CANCELLED';

export interface AdminPayoutRequest {
    id: string;
    venue_name: string;
    owner_name: string;
    owner_email: string;
    bank_name: string;
    bank_account_number: string;
    bank_account_name: string;
    amount: number;
    status: PayoutStatus;
    requested_at: string;
    processed_at: string | null;
}

export interface AdminTransaction {
    id: string;
    reference_id: string;
    type: TransactionType;
    amount: number;
    description: string;
    status: TransactionStatus;
    created_at: string;
}

export interface AdminCommissionRecord {
    id: string;
    booking_id: string;
    venue_name: string;
    total_amount: number;
    commission_rate: number;
    commission_amount: number;
    status: 'PENDING' | 'COLLECTED' | 'REFUNDED';
    created_at: string;
}

// MOCKS
const mockPayouts: AdminPayoutRequest[] = [
    {
        id: 'PAY-260310-001',
        venue_name: 'Sân Bóng Đá Chảo Lửa',
        owner_name: 'Nguyễn Văn Chủ',
        owner_email: 'owner@gmail.com',
        bank_name: 'Vietcombank',
        bank_account_number: '0123456789',
        bank_account_name: 'NGUYEN VAN CHU',
        amount: 5000000,
        status: 'PENDING',
        requested_at: '2026-03-10T08:00:00Z',
        processed_at: null
    },
    {
        id: 'PAY-260309-002',
        venue_name: 'Cầu Lông Viettel',
        owner_name: 'Trần Kỹ Thuật',
        owner_email: 'admin@datsan247.vn',
        bank_name: 'MB Bank',
        bank_account_number: '987654321',
        bank_account_name: 'TRAN KY THUAT',
        amount: 2500000,
        status: 'COMPLETED',
        requested_at: '2026-03-09T10:00:00Z',
        processed_at: '2026-03-09T14:30:00Z'
    },
    {
        id: 'PAY-260308-005',
        venue_name: 'Sân Tennis Cỏ Mới',
        owner_name: 'Lê CSKH',
        owner_email: 'staff01@datsan247.vn',
        bank_name: 'Techcombank',
        bank_account_number: '19033333333',
        bank_account_name: 'LE CSKH',
        amount: 15000000,
        status: 'REJECTED',
        requested_at: '2026-03-08T15:00:00Z',
        processed_at: '2026-03-08T16:00:00Z'
    }
];

const mockTransactions: AdminTransaction[] = [
    { id: 'TXN-001', reference_id: 'BKG-260310-001', type: 'PAYMENT', amount: 450000, description: 'Thanh toán Booking Sân Bóng Đá Chảo Lửa', status: 'COMPLETED', created_at: '2026-03-10T08:30:00Z' },
    { id: 'TXN-002', reference_id: 'PAY-260309-002', type: 'PAYOUT', amount: -2500000, description: 'Rút tiền về MB Bank - Cầu Lông Viettel', status: 'COMPLETED', created_at: '2026-03-09T14:30:00Z' },
    { id: 'TXN-003', reference_id: 'BKG-260309-005', type: 'REFUND', amount: -600000, description: 'Hoàn tiền Booking Sân Tennis Cỏ Mới (Hủy)', status: 'COMPLETED', created_at: '2026-03-08T14:20:00Z' },
    { id: 'TXN-004', reference_id: 'TOP-1234', type: 'TOP_UP', amount: 1000000, description: 'User nạp tiền vào Ví', status: 'COMPLETED', created_at: '2026-03-09T09:00:00Z' },
];

const mockCommissions: AdminCommissionRecord[] = [
    { id: 'CM-001', booking_id: 'BKG-260310-001', venue_name: 'Sân Bóng Đá Chảo Lửa', total_amount: 450000, commission_rate: 10, commission_amount: 45000, status: 'COLLECTED', created_at: '2026-03-10T08:30:00Z' },
    { id: 'CM-002', booking_id: 'BKG-260308-012', venue_name: 'Sân Bóng Đá Chảo Lửa', total_amount: 800000, commission_rate: 10, commission_amount: 80000, status: 'COLLECTED', created_at: '2026-03-05T10:00:00Z' },
];

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const adminFinanceApi = {
    getPayouts: async (): Promise<AdminPayoutRequest[]> => {
        await delay(500);
        return [...mockPayouts].sort((a, b) => new Date(b.requested_at).getTime() - new Date(a.requested_at).getTime());
    },
    updatePayoutStatus: async (id: string, status: PayoutStatus): Promise<AdminPayoutRequest> => {
        await delay(600);
        const payout = mockPayouts.find(p => p.id === id);
        if (!payout) throw new Error("Payout not found");
        payout.status = status;
        payout.processed_at = new Date().toISOString();
        return { ...payout };
    },
    getTransactions: async (): Promise<AdminTransaction[]> => {
        await delay(400);
        return [...mockTransactions].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    },
    getCommissions: async (): Promise<AdminCommissionRecord[]> => {
        await delay(400);
        return [...mockCommissions].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    }
};

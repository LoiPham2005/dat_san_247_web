import apiClient from '@/lib/api/axios';

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
    status: 'PENDING' | 'COLLECTED' | 'REFUNDED' | 'APPROVED' | 'PAID' | 'CANCELLED';
    created_at: string;
}

export const adminFinanceApi = {
    getPayouts: async (): Promise<AdminPayoutRequest[]> => {
        const response = await apiClient.get('/admin/payments/payouts');
        return response.data?.data || [];
    },
    updatePayoutStatus: async (id: string, status: PayoutStatus): Promise<AdminPayoutRequest> => {
        const response = await apiClient.patch(`/admin/payments/payouts/${id}`, { status });
        return response.data?.data;
    },
    getTransactions: async (): Promise<AdminTransaction[]> => {
        const response = await apiClient.get('/admin/payments/transactions');
        return response.data?.data || [];
    },
    getCommissions: async (): Promise<AdminCommissionRecord[]> => {
        const response = await apiClient.get('/admin/payments/commissions');
        return response.data?.data || [];
    }
};

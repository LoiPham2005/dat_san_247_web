export interface CustomerWallet {
    id: string;
    balance: number;
    locked_balance: number;
}

export type TransactionType = 'DEPOSIT' | 'WITHDRAW' | 'PAYMENT' | 'REFUND' | 'COMMISSION' | 'ADJUSTMENT';
export type TransactionStatus = 'PENDING' | 'SUCCESS' | 'FAILED' | 'CANCELLED';

export interface CustomerTransaction {
    id: string;
    type: TransactionType;
    amount: number;
    balance_after: number;
    status: TransactionStatus;
    description: string;
    created_at: string;
    booking_id?: string;
}

export type InvoiceStatus = 'DRAFT' | 'ISSUED' | 'PAID' | 'CANCELLED';

export interface CustomerInvoice {
    id: string;
    invoice_number: string;
    amount: number;
    tax_amount: number;
    status: InvoiceStatus;
    issued_at: string;
    booking_id: string;
    venue_name: string;
    pdf_url: string | null;
}

const mockWallet: CustomerWallet = {
    id: 'W-123',
    balance: 1550000,
    locked_balance: 0
};

const mockTransactions: CustomerTransaction[] = [
    {
        id: 'TXN-001',
        type: 'PAYMENT',
        amount: -450000,
        balance_after: 1550000,
        status: 'SUCCESS',
        description: 'Thanh toán đặt sân BK12345 (Sân Bóng Vipe Cầu Giấy)',
        created_at: new Date().toISOString(),
        booking_id: 'BK-12345'
    },
    {
        id: 'TXN-002',
        type: 'DEPOSIT',
        amount: 2000000,
        balance_after: 2000000,
        status: 'SUCCESS',
        description: 'Nạp tiền vào ví qua VNPAY',
        created_at: new Date(Date.now() - 86400000).toISOString() // 1 day ago
    },
    {
        id: 'TXN-003',
        type: 'REFUND',
        amount: 300000,
        balance_after: 300000,
        status: 'SUCCESS',
        description: 'Hoàn cọc hủy sân BK99999',
        created_at: new Date(Date.now() - 86400000 * 5).toISOString(),
        booking_id: 'BK-99999'
    }
];

const mockInvoices: CustomerInvoice[] = [
    {
        id: 'INV-1001',
        invoice_number: 'HD-2026-0310-1001',
        amount: 450000,
        tax_amount: 36000,
        status: 'PAID',
        issued_at: new Date().toISOString(),
        booking_id: 'BK-12345',
        venue_name: 'Sân Bóng Vipe Cầu Giấy',
        pdf_url: '#'
    },
    {
        id: 'INV-1002',
        invoice_number: 'HD-2026-0305-1002',
        amount: 300000,
        tax_amount: 24000,
        status: 'PAID',
        issued_at: new Date(Date.now() - 86400000 * 5).toISOString(),
        booking_id: 'BK-67890',
        venue_name: 'Sân Cầu Lông Thống Nhất',
        pdf_url: '#'
    }
];

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const customerPaymentApi = {
    getWallet: async (): Promise<CustomerWallet> => {
        await delay(500);
        return mockWallet;
    },
    getTransactions: async (): Promise<CustomerTransaction[]> => {
        await delay(600);
        return mockTransactions;
    },
    getInvoices: async (): Promise<CustomerInvoice[]> => {
        await delay(600);
        return mockInvoices;
    },
    deposit: async (amount: number, method: 'VNPAY' | 'MOMO' | 'ZALOPAY'): Promise<{ payment_url: string }> => {
        await delay(800);
        return { payment_url: `https://sandbox.vnpayment.vn/paymentv2/vpcpay.html?vnp_Amount=${amount * 100}&vnp_Command=pay&vnp_CreateDate=20240315103000` };
    }
};

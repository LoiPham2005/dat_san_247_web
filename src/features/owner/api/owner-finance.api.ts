export type PayoutStatus = 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'REJECTED' | 'CANCELLED';

export interface OwnerCommissionRecord {
    id: string;
    booking_id: string;
    venue_id: string;
    owner_id: string;
    booking_amount: number;
    commission_rate: number;
    commission_amount: number;
    owner_receives: number;
    status: 'PENDING' | 'APPROVED' | 'PAID' | 'CANCELLED';
    created_at: string;
}

export interface OwnerPayoutBankAccount {
    id: string;
    wallet_id: string;
    bank_name: string;
    bank_code: string;
    account_number: string;
    account_name: string;
    is_default: boolean;
    created_at: string;
}

export interface OwnerPayoutRequest {
    id: string;
    user_id: string;
    amount: number;
    status: PayoutStatus;
    bank_account_id: string;
    admin_note: string | null;
    rejection_reason: string | null;
    proof_image_url: string | null;
    processed_at: string | null;
    created_at: string;
}

export interface OwnerWallet {
    id: string;
    user_id: string;
    balance: number;
    locked_balance: number;
    is_active: boolean;
}

export interface OwnerFinancialStats {
    totalRevenue: number;
    totalCommission: number;
    netIncome: number;
    pendingPayout: number;
    availableBalance: number;
}

const mockWallet: OwnerWallet = {
    id: 'W-1',
    user_id: 'U-OWNER',
    balance: 5500000,
    locked_balance: 1000000,
    is_active: true
};

const mockBankAccounts: OwnerPayoutBankAccount[] = [
    {
        id: 'BA-1',
        wallet_id: 'W-1',
        bank_name: 'Vietcombank',
        bank_code: 'VCB',
        account_number: '0123456789',
        account_name: 'NGUYEN VAN CHU SAN',
        is_default: true,
        created_at: new Date().toISOString()
    }
];

const mockPayouts: OwnerPayoutRequest[] = [
    {
        id: 'PR-1',
        user_id: 'U-OWNER',
        amount: 2000000,
        status: 'COMPLETED',
        bank_account_id: 'BA-1',
        admin_note: 'Đã CK Hỗ trợ xử lý nhanh',
        rejection_reason: null,
        proof_image_url: 'https://example.com/proof.jpg',
        processed_at: new Date(Date.now() - 86400000).toISOString(),
        created_at: new Date(Date.now() - 86400000 * 2).toISOString()
    },
    {
        id: 'PR-2',
        user_id: 'U-OWNER',
        amount: 1000000,
        status: 'PENDING',
        bank_account_id: 'BA-1',
        admin_note: null,
        rejection_reason: null,
        proof_image_url: null,
        processed_at: null,
        created_at: new Date(Date.now() - 3600000).toISOString()
    }
];

const mockCommissions: OwnerCommissionRecord[] = [
    {
        id: 'COM-1',
        booking_id: 'BK-1',
        venue_id: 'VN-1',
        owner_id: 'U-OWNER',
        booking_amount: 1000000,
        commission_rate: 10,
        commission_amount: 100000,
        owner_receives: 900000,
        status: 'PAID',
        created_at: new Date(Date.now() - 86400000 * 5).toISOString()
    },
    {
        id: 'COM-2',
        booking_id: 'BK-2',
        venue_id: 'VN-1',
        owner_id: 'U-OWNER',
        booking_amount: 500000,
        commission_rate: 10,
        commission_amount: 50000,
        owner_receives: 450000,
        status: 'APPROVED',
        created_at: new Date(Date.now() - 86400000 * 2).toISOString()
    }
];

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const ownerFinanceApi = {
    getWallet: async (): Promise<OwnerWallet> => {
        await delay(300);
        return mockWallet;
    },

    getBankAccounts: async (): Promise<OwnerPayoutBankAccount[]> => {
        await delay(300);
        return mockBankAccounts;
    },

    addBankAccount: async (data: Omit<OwnerPayoutBankAccount, 'id' | 'wallet_id' | 'created_at'>): Promise<OwnerPayoutBankAccount> => {
        await delay(500);
        const newAccount = {
            ...data,
            id: `BA-${Date.now()}`,
            wallet_id: mockWallet.id,
            created_at: new Date().toISOString()
        };
        if (newAccount.is_default) {
            mockBankAccounts.forEach(ba => ba.is_default = false);
        }
        mockBankAccounts.push(newAccount);
        return newAccount;
    },

    deleteBankAccount: async (id: string): Promise<void> => {
        await delay(400);
        const idx = mockBankAccounts.findIndex(ba => ba.id === id);
        if (idx > -1) mockBankAccounts.splice(idx, 1);
    },

    getPayoutRequests: async (): Promise<OwnerPayoutRequest[]> => {
        await delay(400);
        return mockPayouts;
    },

    createPayoutRequest: async (amount: number, bank_account_id: string): Promise<OwnerPayoutRequest> => {
        await delay(600);
        if (amount > mockWallet.balance) throw new Error("Số dư không đủ");
        
        mockWallet.balance -= amount;
        mockWallet.locked_balance += amount;

        const request: OwnerPayoutRequest = {
            id: `PR-${Date.now()}`,
            user_id: mockWallet.user_id,
            amount,
            bank_account_id,
            status: 'PENDING',
            admin_note: null,
            rejection_reason: null,
            proof_image_url: null,
            processed_at: null,
            created_at: new Date().toISOString()
        };
        mockPayouts.unshift(request);
        return request;
    },

    getVenueCommissions: async (venueId: string): Promise<OwnerCommissionRecord[]> => {
        await delay(400);
        return mockCommissions.filter(c => c.venue_id === venueId);
    },

    getFinancialStats: async (venueId: string): Promise<OwnerFinancialStats> => {
        await delay(300);
        const venueComms = mockCommissions.filter(c => c.venue_id === venueId);
        const totalRevenue = venueComms.reduce((sum, c) => sum + c.booking_amount, 0);
        const totalCommission = venueComms.reduce((sum, c) => sum + c.commission_amount, 0);
        const netIncome = venueComms.reduce((sum, c) => sum + c.owner_receives, 0);

        return {
            totalRevenue,
            totalCommission,
            netIncome,
            pendingPayout: mockWallet.locked_balance,
            availableBalance: mockWallet.balance
        };
    }
};

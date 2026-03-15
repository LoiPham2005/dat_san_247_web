import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ownerFinanceApi, OwnerPayoutBankAccount, OwnerPayoutRequest } from '../api/owner-finance.api';
import { toast } from 'sonner';

export const useOwnerWallet = () => {
    return useQuery({
        queryKey: ['owner_wallet'],
        queryFn: ownerFinanceApi.getWallet
    });
};

export const useOwnerBankAccounts = () => {
    const queryClient = useQueryClient();

    const accountsQuery = useQuery({
        queryKey: ['owner_bank_accounts'],
        queryFn: ownerFinanceApi.getBankAccounts
    });

    const addAccount = useMutation({
        mutationFn: (data: Omit<OwnerPayoutBankAccount, 'id' | 'wallet_id' | 'created_at'>) => ownerFinanceApi.addBankAccount(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['owner_bank_accounts'] });
            toast.success("Thêm tài khoản ngân hàng thành công");
        },
        onError: () => toast.error("Thêm tài khoản thất bại")
    });

    const deleteAccount = useMutation({
        mutationFn: (id: string) => ownerFinanceApi.deleteBankAccount(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['owner_bank_accounts'] });
            toast.success("Đã xóa tài khoản ngân hàng");
        },
        onError: () => toast.error("Xóa tài khoản thất bại")
    });

    return {
        accounts: accountsQuery.data || [],
        isLoading: accountsQuery.isLoading,
        addAccount: addAccount.mutate,
        isAdding: addAccount.isPending,
        deleteAccount: deleteAccount.mutate,
        isDeleting: deleteAccount.isPending
    };
};

export const useOwnerPayouts = () => {
    const queryClient = useQueryClient();

    const payoutsQuery = useQuery({
        queryKey: ['owner_payout_requests'],
        queryFn: ownerFinanceApi.getPayoutRequests
    });

    const requestPayout = useMutation({
        mutationFn: ({ amount, bank_account_id }: { amount: number, bank_account_id: string }) => ownerFinanceApi.createPayoutRequest(amount, bank_account_id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['owner_payout_requests'] });
            queryClient.invalidateQueries({ queryKey: ['owner_wallet'] });
            toast.success("Đã gửi yêu cầu rút tiền. Vui lòng chờ kế toán xử lý.");
        },
        onError: (err: any) => toast.error(err.message || "Gửi yêu cầu thất bại")
    });

    return {
        payouts: payoutsQuery.data || [],
        isLoading: payoutsQuery.isLoading,
        requestPayout: requestPayout.mutate,
        isRequesting: requestPayout.isPending
    };
};

export const useOwnerFinancialStats = (venueId: string) => {
    const statsQuery = useQuery({
        queryKey: ['owner_financial_stats', venueId],
        queryFn: () => ownerFinanceApi.getFinancialStats(venueId),
        enabled: !!venueId
    });

    const commissionsQuery = useQuery({
        queryKey: ['owner_commissions', venueId],
        queryFn: () => ownerFinanceApi.getVenueCommissions(venueId),
        enabled: !!venueId
    });

    return {
        stats: statsQuery.data,
        isLoadingStats: statsQuery.isLoading,
        commissions: commissionsQuery.data || [],
        isLoadingCommissions: commissionsQuery.isLoading
    };
};

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminFinanceApi, PayoutStatus } from '../api/admin-finance.api';
import { toast } from 'sonner';

export const useAdminFinance = () => {
    const queryClient = useQueryClient();

    const payoutsQuery = useQuery({
        queryKey: ['admin_payouts'],
        queryFn: adminFinanceApi.getPayouts,
    });

    const updatePayoutStatusMutation = useMutation({
        mutationFn: ({ id, status }: { id: string, status: PayoutStatus }) => adminFinanceApi.updatePayoutStatus(id, status),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['admin_payouts'] });
            toast.success(`Cập nhật thành công Yêu cầu rút tiền ${data.id} thành ${data.status}`);
        },
        onError: () => toast.error("Có lỗi xảy ra khi cập nhật Yêu cầu rút tiền")
    });

    const transactionsQuery = useQuery({
        queryKey: ['admin_transactions'],
        queryFn: adminFinanceApi.getTransactions,
    });

    const commissionsQuery = useQuery({
        queryKey: ['admin_commissions'],
        queryFn: adminFinanceApi.getCommissions,
    });

    return {
        payouts: payoutsQuery.data || [],
        isLoadingPayouts: payoutsQuery.isLoading,
        updatePayoutStatus: updatePayoutStatusMutation.mutate,
        isUpdatingPayout: updatePayoutStatusMutation.isPending,

        transactions: transactionsQuery.data || [],
        isLoadingTransactions: transactionsQuery.isLoading,

        commissions: commissionsQuery.data || [],
        isLoadingCommissions: commissionsQuery.isLoading,
    };
};

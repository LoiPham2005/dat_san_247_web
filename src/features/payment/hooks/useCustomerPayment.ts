import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { customerPaymentApi } from '../api/customer-payment.api';
import { toast } from 'sonner';

export const useCustomerWallet = () => {
    return useQuery({
        queryKey: ['my_wallet'],
        queryFn: () => customerPaymentApi.getWallet(),
    });
};

export const useCustomerTransactions = () => {
    return useQuery({
        queryKey: ['my_transactions'],
        queryFn: () => customerPaymentApi.getTransactions(),
    });
};

export const useCustomerInvoices = () => {
    return useQuery({
        queryKey: ['my_invoices'],
        queryFn: () => customerPaymentApi.getInvoices(),
    });
};

export const useDeposit = () => {
    return useMutation({
        mutationFn: ({ amount, method }: { amount: number, method: 'VNPAY' | 'MOMO' | 'ZALOPAY' }) => customerPaymentApi.deposit(amount, method),
        onSuccess: (data) => {
            // Redirect to Sandbox payment URL
            toast.info('Đang chuyển hướng đến cổng thanh toán...');
            window.location.href = data.payment_url;
        },
        onError: () => toast.error('Lỗi khởi tạo thanh toán')
    });
};

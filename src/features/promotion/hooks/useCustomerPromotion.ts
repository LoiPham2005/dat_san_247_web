import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { customerPromotionApi } from '../api/customer-promotion.api';
import { toast } from 'sonner';

export const useCustomerVouchers = () => {
    return useQuery({
        queryKey: ['my_vouchers'],
        queryFn: () => customerPromotionApi.getMyVouchers(),
    });
};

export const useSaveVoucher = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (code: string) => customerPromotionApi.saveVoucher(code),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['my_vouchers'] });
            toast.success('Đã lưu mã khuyến mãi thành công!');
        },
        onError: () => toast.error('Mã không hợp lệ hoặc đã hết hạn.')
    });
};

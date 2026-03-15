import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { customerReviewApi } from '../api/customer-review.api';
import { toast } from 'sonner';

export const useCustomerReviews = () => {
    return useQuery({
        queryKey: ['my_reviews'],
        queryFn: () => customerReviewApi.getMyReviews(),
    });
};

export const useCreateReview = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: any) => customerReviewApi.createReview(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['my_reviews'] });
            toast.success('Đã gửi đánh giá thành công! Cảm ơn bạn.');
        },
        onError: () => toast.error('Gửi đánh giá thất bại')
    });
};

export const useDeleteReview = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => customerReviewApi.deleteReview(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['my_reviews'] });
            toast.success('Đã xóa đánh giá của bạn.');
        },
        onError: () => toast.error('Xóa đánh giá thất bại')
    });
};

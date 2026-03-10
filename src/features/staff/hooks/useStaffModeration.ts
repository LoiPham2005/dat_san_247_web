import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { staffModerationApi } from '../api/staff-moderation.api';
import { toast } from 'sonner';

export const useStaffModeration = () => {
    const queryClient = useQueryClient();

    const reportsQuery = useQuery({ queryKey: ['staff_reports'], queryFn: staffModerationApi.getPendingReports });
    const reviewsQuery = useQuery({ queryKey: ['staff_reviews'], queryFn: staffModerationApi.getReviewsForModeration });

    const escalateReport = useMutation({
        mutationFn: (reportId: string) => staffModerationApi.escalateReportToAdmin(reportId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['staff_reports'] });
            toast.success("Báo cáo đã được chuyển lên cấp Admin xem xét");
        },
        onError: () => toast.error("Có lỗi xảy ra khi chuyển lên Admin")
    });

    const hideReview = useMutation({
        mutationFn: ({ id, isVisible }: { id: string, isVisible: boolean }) => staffModerationApi.toggleReviewVisibility(id, isVisible),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ['staff_reviews'] });
            toast.success(variables.isVisible ? "Đã hiển thị lại Đánh giá" : "Đã GỠ TRẠNG THÁI HIỂN THỊ Đánh giá");
        },
        onError: () => toast.error("Có lỗi xảy ra khi xét duyệt đánh giá")
    });

    return {
        reports: reportsQuery.data || [],
        isLoadingReports: reportsQuery.isLoading,
        escalateReport: escalateReport.mutate,
        isEscalating: escalateReport.isPending,

        reviews: reviewsQuery.data || [],
        isLoadingReviews: reviewsQuery.isLoading,
        hideReview: hideReview.mutate,
        isHidingReview: hideReview.isPending,
    };
};

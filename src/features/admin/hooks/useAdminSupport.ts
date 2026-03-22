import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminSupportApi, SupportTicketStatus, ReportStatus, ReportAction } from '../api/admin-support.api';
import { toast } from 'sonner';

export const useAdminSupport = () => {
    const queryClient = useQueryClient();

    const ticketsQuery = useQuery({ queryKey: ['admin_tickets'], queryFn: adminSupportApi.getTickets });
    const reportsQuery = useQuery({ queryKey: ['admin_reports'], queryFn: adminSupportApi.getReports });
    const reviewsQuery = useQuery({ queryKey: ['admin_reviews'], queryFn: adminSupportApi.getReviews });

    const updateTicket = useMutation({
        mutationFn: ({ id, status, assigned_to_name }: { id: string, status?: SupportTicketStatus, assigned_to_name?: string }) => 
            adminSupportApi.updateTicket(id, status, assigned_to_name),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin_tickets'] });
            toast.success("Cập nhật Support Ticket thành công");
        },
        onError: () => toast.error("Có lỗi xảy ra khi cập nhật Ticket")
    });

    const updateReport = useMutation({
        mutationFn: ({ id, status, action }: { id: string, status: ReportStatus, action: ReportAction | null }) => 
            adminSupportApi.updateReport(id, status, action),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin_reports'] });
            toast.success("Cập nhật Báo cáo Vi phạm thành công");
        },
        onError: () => toast.error("Có lỗi xảy ra khi cập nhật Báo cáo")
    });

    const updateReview = useMutation({
        mutationFn: ({ id, response, is_visible }: { id: string, response?: string, is_visible?: boolean }) => 
            adminSupportApi.updateReview(id, { response, is_visible }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin_reviews'] });
            toast.success("Cập nhật Đánh giá thành công");
        },
        onError: () => toast.error("Thao tác thất bại")
    });

    const deleteReview = useMutation({
        mutationFn: (id: string) => adminSupportApi.deleteReview(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin_reviews'] });
            toast.success("Đã xóa đánh giá vĩnh viễn");
        },
        onError: () => toast.error("Xóa thất bại")
    });

    return {
        tickets: ticketsQuery.data || [],
        isLoadingTickets: ticketsQuery.isLoading,
        updateTicket: updateTicket.mutate,
        isUpdatingTicket: updateTicket.isPending,

        reports: reportsQuery.data || [],
        isLoadingReports: reportsQuery.isLoading,
        updateReport: updateReport.mutate,
        isUpdatingReport: updateReport.isPending,

        reviews: reviewsQuery.data || [],
        isLoadingReviews: reviewsQuery.isLoading,
        updateReview: updateReview.mutate,
        isUpdatingReview: updateReview.isPending,
        deleteReview: deleteReview.mutate,
        isDeletingReview: deleteReview.isPending,
    };
};

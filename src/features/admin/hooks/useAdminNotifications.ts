import { useQuery, useMutation, useQueryClient, keepPreviousData } from '@tanstack/react-query';
import { adminNotificationApi, AdminQueryNotificationsParams } from '../api/admin-notification.api';
import { toast } from 'sonner';

export const useAdminNotifications = (params: AdminQueryNotificationsParams = { page: 1, limit: 10 }) => {
    const queryClient = useQueryClient();

    const notiQuery = useQuery({ 
        queryKey: ['admin_system_noti', params], 
        queryFn: () => adminNotificationApi.getNotifications(params),
        placeholderData: keepPreviousData, // Giữ dữ liệu cũ khi đang fetch mới (Search/Filter không bị loading trắng)
    });

    const sendNoti = useMutation({
        mutationFn: (data: any) => adminNotificationApi.sendNotification(data),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['admin_system_noti'] });
            toast.success(`Đã gửi thông báo thành công tới ${data.count} người dùng.`);
        },
        onError: () => toast.error("Có lỗi xảy ra khi phát thông báo")
    });

    const deleteNoti = useMutation({
        mutationFn: (id: string) => adminNotificationApi.deleteNotification(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin_system_noti'] });
            toast.success("Đã xóa thông báo thành công");
        },
        onError: () => toast.error("Có lỗi xảy ra khi xóa thông báo")
    });

    return {
        notifications: notiQuery.data?.items || [],
        meta: notiQuery.data?.meta,
        isLoading: notiQuery.isLoading,
        isFetching: notiQuery.isFetching,
        sendNoti: sendNoti.mutate,
        isSending: sendNoti.isPending,
        deleteNoti: deleteNoti.mutate,
        isDeleting: deleteNoti.isPending
    };
};

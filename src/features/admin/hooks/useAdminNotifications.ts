import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminNotificationApi, AdminSystemNotification } from '../api/admin-notification.api';
import { toast } from 'sonner';

export const useAdminNotifications = () => {
    const queryClient = useQueryClient();

    const notiQuery = useQuery({ queryKey: ['admin_system_noti'], queryFn: adminNotificationApi.getNotifications });

    const sendNoti = useMutation({
        mutationFn: (data: Partial<AdminSystemNotification>) => adminNotificationApi.sendNotification(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin_system_noti'] });
            toast.success("Push Thông báo tới người dùng thành công");
        },
        onError: () => toast.error("Có lỗi xảy ra khi phát thông báo")
    });

    return {
        notifications: notiQuery.data || [],
        isLoading: notiQuery.isLoading,
        sendNoti: sendNoti.mutate,
        isSending: sendNoti.isPending,
    };
};

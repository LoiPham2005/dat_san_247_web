import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { customerNotificationApi, NotificationSettings } from '../api/customer-notification.api';
import { toast } from 'sonner';

export const useCustomerNotifications = () => {
    return useQuery({
        queryKey: ['my_notifications'],
        queryFn: () => customerNotificationApi.getNotifications(),
    });
};

export const useNotificationSettings = () => {
    return useQuery({
        queryKey: ['my_notification_settings'],
        queryFn: () => customerNotificationApi.getSettings(),
    });
};

export const useMarkAsRead = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => customerNotificationApi.markAsRead(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['my_notifications'] });
        }
    });
};

export const useMarkAllAsRead = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => customerNotificationApi.markAllAsRead(),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['my_notifications'] });
            toast.success('Đã đánh dấu đọc tất cả thông báo');
        }
    });
};

export const useUpdateSettings = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (settings: NotificationSettings) => customerNotificationApi.updateSettings(settings),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['my_notification_settings'] });
            toast.success('Đã lưu cấu hình thông báo');
        },
        onError: () => toast.error('Lỗi khi lưu cấu hình')
    });
};

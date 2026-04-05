import apiClient from '@/lib/api/axios';

export type NotificationType = 'SYSTEM' | 'BOOKING' | 'PAYMENT' | 'PROMOTION' | 'REVIEW' | 'BOOKING_CONFIRMED' | 'BOOKING_CANCELLED' | 'PAYMENT_SUCCESS';
export type NotificationChannel = 'IN_APP' | 'EMAIL' | 'PUSH';
export type NotificationReferenceType = 'BOOKING' | 'PAYMENT' | 'REVIEW';

export interface CustomerNotification {
    id: string;
    type: NotificationType;
    channel: NotificationChannel;
    title: string;
    message: string;
    reference_id: string | null;
    reference_type: NotificationReferenceType | null;
    is_read: boolean;
    created_at: string;
}

export interface NotificationSettings {
    notif_booking: boolean;
    notif_payment: boolean;
    notif_promotion: boolean;
    notif_system: boolean;
}

export const customerNotificationApi = {
    getNotifications: async (params?: { limit?: number; offset?: number }): Promise<CustomerNotification[]> => {
        const response = await apiClient.get('/notifications', { params });
        return response.data?.data || [];
    },
    markAsRead: async (id: string): Promise<boolean> => {
        await apiClient.post(`/notifications/${id}/read`);
        return true;
    },
    markAllAsRead: async (): Promise<boolean> => {
        await apiClient.post('/notifications/read-all');
        return true;
    },
    getSettings: async (): Promise<NotificationSettings> => {
        // Nếu backend chưa có endpoint này, em để mặc định cho bác nhé
        try {
            const response = await apiClient.get('/notifications/settings');
            return response.data?.data;
        } catch (error) {
            return {
                notif_booking: true,
                notif_payment: true,
                notif_promotion: true,
                notif_system: true,
            };
        }
    },
    updateSettings: async (settings: NotificationSettings): Promise<NotificationSettings> => {
        const response = await apiClient.patch('/notifications/settings', settings);
        return response.data?.data;
    }
};

import apiClient from '@/lib/api/axios';

export interface AdminSystemNotification {
    id: string;
    title: string;
    message: string;
    type: string;
    is_read: boolean;
    created_at: string;
    user_id: string;
    users?: {
        full_name: string;
        email: string;
        avatar_url?: string;
    };
}

export interface AdminQueryNotificationsParams {
    page?: number;
    limit?: number;
    userId?: string;
    type?: string;
    isRead?: boolean;
    search?: string;
}

export const adminNotificationApi = {
    getNotifications: async (params?: AdminQueryNotificationsParams): Promise<{ items: AdminSystemNotification[], meta: any }> => {
        const response = await apiClient.get('/admin/notifications', { params });
        return response.data.data; // Bóc tách trường data theo base response của bác
    },

    sendNotification: async (data: {
        target: 'ALL' | 'ROLES' | 'USERS';
        userIds?: string[];
        roles?: string[];
        title: string;
        message: string;
        type?: string;
    }): Promise<{ count: number }> => {
        const response = await apiClient.post('/admin/notifications/send', data);
        return response.data.data;
    },

    deleteNotification: async (id: string): Promise<void> => {
        await apiClient.delete(`/admin/notifications/${id}`);
    }
};

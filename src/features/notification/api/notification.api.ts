import apiClient from '@/lib/api/axios';

export const notificationApi = {
  getNotifications: (params?: { limit?: number; offset?: number }) =>
    apiClient.get('/notifications', { params }),

  getUnreadCount: () => apiClient.get('/notifications/unread-count'),

  markAsRead: (id: string) => apiClient.post(`/notifications/${id}/read`),

  markAllAsRead: () => apiClient.post('/notifications/read-all'),

  // --- Admin Methods ---
  getAdminNotifications: (params: any) =>
    apiClient.get('/admin/notifications', { params }),

  sendNotification: (data: {
    target: 'ALL' | 'ROLES' | 'USERS';
    userIds?: string[];
    roles?: string[];
    title: string;
    message: string;
    type?: string;
  }) => apiClient.post('/admin/notifications/send', data),

  deleteNotification: (id: string) =>
    apiClient.delete(`/admin/notifications/${id}`),
};

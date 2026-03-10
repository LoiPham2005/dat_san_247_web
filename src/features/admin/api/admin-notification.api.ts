export type NotificationChannel = 'IN_APP' | 'EMAIL' | 'SMS' | 'PUSH';

export interface AdminSystemNotification {
    id: string;
    title: string;
    message: string;
    channel: NotificationChannel[];
    target_audience: 'ALL' | 'CUSTOMERS' | 'OWNERS' | 'STAFF';
    sent_at: string;
    sent_by: string;
    status: 'SENT' | 'FAILED' | 'SCHEDULED';
}

const mockNotifications: AdminSystemNotification[] = [
    {
        id: 'NOTI-01',
        title: 'Bảo trì hệ thống 00:00 ngày 20/03',
        message: 'Kính gửi quý chủ sân, hệ thống sẽ bảo trì nâng cấp từ 00:00 đến 02:00 sáng ngày 20/03...',
        channel: ['IN_APP', 'PUSH', 'EMAIL'],
        target_audience: 'OWNERS',
        sent_at: '2026-03-10T08:00:00Z',
        sent_by: 'Super Admin',
        status: 'SENT'
    },
    {
        id: 'NOTI-02',
        title: 'Cảnh giác giả mạo nhân viên Đặt Sân 247',
        message: 'Hiện có một số đối tượng giả danh tổng đài hỗ trợ yêu cầu nạp tiền...',
        channel: ['IN_APP', 'PUSH'],
        target_audience: 'ALL',
        sent_at: '2026-03-05T09:30:00Z',
        sent_by: 'System Auto',
        status: 'SENT'
    }
];

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const adminNotificationApi = {
    getNotifications: async (): Promise<AdminSystemNotification[]> => {
        await delay(300);
        return [...mockNotifications].sort((a, b) => new Date(b.sent_at).getTime() - new Date(a.sent_at).getTime());
    },
    sendNotification: async (data: Partial<AdminSystemNotification>): Promise<AdminSystemNotification> => {
        await delay(600);
        const newNoti: AdminSystemNotification = {
            id: `NOTI-${Math.floor(Math.random() * 1000)}`,
            title: data.title || '',
            message: data.message || '',
            channel: data.channel || ['IN_APP'],
            target_audience: data.target_audience || 'ALL',
            sent_at: new Date().toISOString(),
            sent_by: 'Super Admin (You)',
            status: 'SENT'
        };
        mockNotifications.push(newNoti);
        return newNoti;
    }
};

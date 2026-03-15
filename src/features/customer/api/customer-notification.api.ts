export type NotificationType = 'SYSTEM' | 'BOOKING' | 'PAYMENT' | 'PROMOTION' | 'REVIEW';
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

let mockNotifications: CustomerNotification[] = [
    {
        id: 'NOTIF-1',
        type: 'PAYMENT',
        channel: 'IN_APP',
        title: 'Nạp tiền thành công',
        message: 'Bạn đã nạp thành công 2,000,000đ vào ví DatSan247. Số dư hiện tại là 2,550,000đ.',
        reference_id: 'TXN-002',
        reference_type: 'PAYMENT',
        is_read: false,
        created_at: new Date(Date.now() - 3600000).toISOString()
    },
    {
        id: 'NOTIF-2',
        type: 'BOOKING',
        channel: 'IN_APP',
        title: 'Nhắc nhở lịch đá bóng',
        message: 'Bạn có lịch đá bóng tại Sân Bóng Vipe Cầu Giấy lúc 19:00 hôm nay. Vui lòng đến sớm 15 phút để check-in nhé!',
        reference_id: 'BK-12345',
        reference_type: 'BOOKING',
        is_read: false,
        created_at: new Date(Date.now() - 7200000).toISOString()
    },
    {
        id: 'NOTIF-3',
        type: 'PROMOTION',
        channel: 'IN_APP',
        title: 'Tặng bạn mã giảm giá 50K',
        message: 'DatSan247 tặng bạn mã CHAOHE2026 giảm ngay 50K cho lần đặt sân tiếp theo. Nhanh tay kẻo lỡ!',
        reference_id: 'PR-102',
        reference_type: null,
        is_read: true,
        created_at: new Date(Date.now() - 86400000 * 2).toISOString()
    }
];

let mockSettings: NotificationSettings = {
    notif_booking: true,
    notif_payment: true,
    notif_promotion: true,
    notif_system: true,
};

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const customerNotificationApi = {
    getNotifications: async (): Promise<CustomerNotification[]> => {
        await delay(400);
        return mockNotifications;
    },
    markAsRead: async (id: string): Promise<boolean> => {
        await delay(200);
        mockNotifications = mockNotifications.map(n => n.id === id ? { ...n, is_read: true } : n);
        return true;
    },
    markAllAsRead: async (): Promise<boolean> => {
        await delay(300);
        mockNotifications = mockNotifications.map(n => ({ ...n, is_read: true }));
        return true;
    },
    getSettings: async (): Promise<NotificationSettings> => {
        await delay(300);
        return mockSettings;
    },
    updateSettings: async (settings: NotificationSettings): Promise<NotificationSettings> => {
        await delay(500);
        mockSettings = { ...settings };
        return mockSettings;
    }
};
